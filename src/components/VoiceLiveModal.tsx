import { useEffect, useRef, useState } from 'react'
import { Mic, MicOff, Volume2, Sparkles, PhoneOff, RefreshCw } from 'lucide-react'
import type { Voice } from '@/lib/fixtures'

interface VoiceLiveModalProps {
  isOpen: boolean
  onClose: () => void
  currentVoice: Voice
  isBambaraMode: boolean
  languageCode: string
  onNewMessage: (userText: string, aiText: string) => void
}

export function VoiceLiveModal({
  isOpen,
  onClose,
  currentVoice,
  isBambaraMode,
  languageCode,
  onNewMessage,
}: VoiceLiveModalProps) {
  const [conversationState, setConversationState] = useState<'listening' | 'thinking' | 'speaking'>('listening')
  const [transcript, setTranscript] = useState('')
  const [lastAiReply, setLastAiReply] = useState('')
  const [isMicMuted, setIsMicMuted] = useState(false)
  const recognitionRef = useRef<any>(null)
  const isListeningRef = useRef(false)

  // Start speech recognition or simulated live flow
  useEffect(() => {
    if (!isOpen) {
      if (typeof window !== 'undefined') {
        window.speechSynthesis?.cancel()
        if (recognitionRef.current) {
          recognitionRef.current.stop()
        }
      }
      return
    }

    // Set initial welcome utterance
    const welcomeBm = `Aw ni ce ! N ye ${currentVoice.name} ye. N bɛ i lamɛn kɛnɛma, fɔ n ye.`
    const welcomeFr = `Bonjour ! Je suis ${currentVoice.name}. Je t’écoute avec grand plaisir, dis-moi tout.`
    const initialGreeting = isBambaraMode || languageCode === 'bm' ? welcomeBm : welcomeFr

    setLastAiReply(initialGreeting)
    speakResponse(initialGreeting, () => {
      startListening()
    })

    return () => {
      if (typeof window !== 'undefined') {
        window.speechSynthesis?.cancel()
        if (recognitionRef.current) {
          recognitionRef.current.stop()
        }
      }
    }
  }, [isOpen])

  const startListening = () => {
    if (typeof window === 'undefined') return
    setConversationState('listening')
    setTranscript('')

    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (SpeechRec && !isMicMuted) {
      try {
        const recognition = new SpeechRec()
        recognition.continuous = false
        recognition.interimResults = true
        recognition.lang = isBambaraMode || languageCode === 'bm' ? 'fr-FR' : languageCode === 'en' ? 'en-US' : 'fr-FR'

        recognition.onstart = () => {
          isListeningRef.current = true
        }

        recognition.onresult = (event: any) => {
          const currentTranscript = Array.from(event.results)
            .map((res: any) => res[0].transcript)
            .join('')
          setTranscript(currentTranscript)
        }

        recognition.onend = () => {
          isListeningRef.current = false
          if (transcript.trim().length > 0) {
            handleUserUtterance(transcript)
          } else {
            // Keep listening or simulate prompt
            setConversationState('listening')
          }
        }

        recognition.onerror = () => {
          isListeningRef.current = false
        }

        recognitionRef.current = recognition
        recognition.start()
      } catch (err) {
        console.warn('SpeechRecognition error or permission issue:', err)
      }
    }
  }

  const handleUserUtterance = (userInput: string) => {
    setConversationState('thinking')

    setTimeout(() => {
      let aiText = ''
      const lower = userInput.toLowerCase()

      if (isBambaraMode || lower.includes('ce') || lower.includes('bambara') || lower.includes('kɛnɛ')) {
        aiText = `N ye a faamu koɲuman ! « ${userInput} ». N bɛ yan i fɛ, an ka t’a fɛ ! Ala ka hɛɛrɛ don an ka kuma na.`
      } else if (lower.includes('bonjour') || lower.includes('salut')) {
        aiText = `Bonjour avec le cœur ! Tu as toute mon attention. Comment puis-je t’aider pour ta journée ?`
      } else if (lower.includes(' fatigué') || lower.includes('fatigue')) {
        aiText = `Aww, repose-toi un peu 😌. Tu veux qu’on parle tranquillement ou tu préfères que je t’aide à organiser ta journée ?`
      } else if (lower.includes('merci') || lower.includes('i ni ce')) {
        aiText = `C’est un réel plaisir, an bɛ ɲɔgɔn fɛ ! N’hésite pas si tu as une autre idée ou question.`
      } else {
        aiText = `C’est très clair ! J’ai bien noté ton point. Poursuivons sur ce sujet, que souhaites-tu approfondir ?`
      }

      setLastAiReply(aiText)
      onNewMessage(userInput, aiText)

      speakResponse(aiText, () => {
        // Continue voice loop naturally
        setTimeout(() => {
          startListening()
        }, 600)
      })
    }, 1200)
  }

  const speakResponse = (text: string, onDone?: () => void) => {
    if (typeof window === 'undefined') return

    setConversationState('speaking')
    window.speechSynthesis?.cancel()

    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.pitch = currentVoice.pitch
      utterance.rate = currentVoice.rate

      const voices = window.speechSynthesis.getVoices()
      const frenchVoice = voices.find((v) => v.lang.startsWith('fr'))
      if (frenchVoice) {
        utterance.voice = frenchVoice
      }

      utterance.onend = () => {
        if (onDone) onDone()
      }
      utterance.onerror = () => {
        if (onDone) onDone()
      }

      window.speechSynthesis.speak(utterance)
    } else {
      setTimeout(() => {
        if (onDone) onDone()
      }, 3000)
    }
  }

  // Quick fallback talk simulation button
  const triggerSimulationPrompt = (prompt: string) => {
    setTranscript(prompt)
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
    handleUserUtterance(prompt)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-between p-6 sm:p-10 bg-gradient-to-b from-[#061710] via-[#08120d] to-[#040806] text-white backdrop-blur-xl animate-in fade-in duration-300">
      {/* Top Bar */}
      <div className="w-full max-w-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs uppercase tracking-widest font-bold text-emerald-400">
            Conversation Live CHAT MALI
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800/80 text-amber-300 border border-amber-400/30">
            🎙️ Voix : {currentVoice.name} ({currentVoice.style})
          </span>
          {isBambaraMode && (
            <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
              🇲🇱 Bambara
            </span>
          )}
        </div>
      </div>

      {/* Central Visual: Glowing Reactive Soundwave & Companion Avatar */}
      <div className="flex flex-col items-center justify-center my-auto w-full max-w-lg text-center space-y-8">
        {/* Animated Glow Ring */}
        <div className="relative">
          <div
            className={`w-36 h-36 sm:w-44 sm:h-44 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
              conversationState === 'speaking'
                ? 'border-emerald-400 shadow-[0_0_60px_rgba(16,185,129,0.5)] scale-105'
                : conversationState === 'thinking'
                ? 'border-amber-400 shadow-[0_0_50px_rgba(245,158,11,0.4)] animate-pulse'
                : 'border-emerald-500/50 shadow-[0_0_40px_rgba(16,185,129,0.25)]'
            } bg-gradient-to-tr from-[#052617] via-[#093521] to-[#0d4a2d]`}
          >
            {/* Inner Avatar Graphic */}
            <div className="text-center">
              <span className="text-4xl sm:text-5xl block animate-float">🤖</span>
              <span className="text-xs font-bold text-emerald-300 mt-1 block">
                {currentVoice.name}
              </span>
            </div>
          </div>

          {/* Soundwave Bars Overlay */}
          {conversationState === 'speaking' && (
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-black/80 border border-emerald-500/40 shadow-lg">
              <span className="text-xs mr-1 text-emerald-400">🔊</span>
              <span className="w-1.5 bg-emerald-400 rounded-full animate-soundwave [animation-delay:-0.4s]" />
              <span className="w-1.5 bg-amber-400 rounded-full animate-soundwave [animation-delay:-0.2s]" />
              <span className="w-1.5 bg-rose-400 rounded-full animate-soundwave" />
              <span className="w-1.5 bg-emerald-400 rounded-full animate-soundwave [animation-delay:-0.3s]" />
              <span className="w-1.5 bg-amber-400 rounded-full animate-soundwave [animation-delay:-0.1s]" />
            </div>
          )}
        </div>

        {/* Dynamic Status Text */}
        <div className="space-y-2 px-4">
          {conversationState === 'listening' && (
            <div className="space-y-1">
              <p className="text-emerald-400 font-bold text-lg sm:text-xl flex items-center justify-center gap-2">
                <Mic className="w-5 h-5 animate-pulse text-emerald-400" />
                Je t’écoute… Parle naturellement
              </p>
              <p className="text-xs text-slate-400">
                Tu peux parler en Bambara ou en Français sans interruption
              </p>
            </div>
          )}

          {conversationState === 'thinking' && (
            <div className="space-y-1">
              <p className="text-amber-300 font-bold text-lg flex items-center justify-center gap-2">
                <RefreshCw className="w-5 h-5 animate-spin text-amber-400" />
                CHAT MALI réfléchit…
              </p>
              <p className="text-xs text-slate-400">Formulation d’une réponse naturelle</p>
            </div>
          )}

          {conversationState === 'speaking' && (
            <div className="space-y-1">
              <p className="text-emerald-300 font-bold text-lg flex items-center justify-center gap-2">
                <Volume2 className="w-5 h-5 text-emerald-400 animate-bounce" />
                CHAT MALI parle…
              </p>
              <p className="text-xs text-slate-400">Écoute ton compagnon répondre</p>
            </div>
          )}

          {/* Current Transcript / AI Response Bubble */}
          <div className="mt-4 p-4 rounded-2xl bg-black/50 border border-emerald-500/20 max-w-md mx-auto text-sm text-slate-200">
            {conversationState === 'listening' && transcript ? (
              <p className="italic text-emerald-300">« {transcript} »</p>
            ) : lastAiReply ? (
              <p className="leading-relaxed">« {lastAiReply} »</p>
            ) : (
              <p className="text-slate-500 text-xs">Dis quelque chose pour démarrer l’échange...</p>
            )}
          </div>

          {/* Fast Voice Testing Pills */}
          <div className="pt-2 flex flex-wrap justify-center gap-2">
            <span className="text-[11px] text-slate-500 w-full">Suggestions rapides :</span>
            <button
              onClick={() => triggerSimulationPrompt('I ni ce, i ka kɛnɛ ?')}
              className="px-3 py-1 text-xs rounded-full bg-slate-900 border border-slate-700 hover:border-emerald-500 text-slate-300 transition"
            >
              « I ni ce, i ka kɛnɛ ? »
            </button>
            <button
              onClick={() => triggerSimulationPrompt('Je suis fatigué aujourd’hui.')}
              className="px-3 py-1 text-xs rounded-full bg-slate-900 border border-slate-700 hover:border-amber-500 text-slate-300 transition"
            >
              « Je suis fatigué aujourd’hui »
            </button>
            <button
              onClick={() => triggerSimulationPrompt('Raconte-moi une histoire du Mandé.')}
              className="px-3 py-1 text-xs rounded-full bg-slate-900 border border-slate-700 hover:border-rose-500 text-slate-300 transition"
            >
              « Raconte une histoire du Mandé »
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="w-full max-w-sm flex items-center justify-center gap-4">
        {/* Mic Mute Toggle */}
        <button
          onClick={() => setIsMicMuted(!isMicMuted)}
          className={`p-3.5 rounded-2xl border transition ${
            isMicMuted
              ? 'bg-rose-950/60 border-rose-500 text-rose-300'
              : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
          }`}
          title={isMicMuted ? 'Activer le micro' : 'Couper le micro'}
        >
          {isMicMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>

        {/* End Call Button */}
        <button
          onClick={() => {
            window.speechSynthesis?.cancel()
            if (recognitionRef.current) {
              recognitionRef.current.stop()
            }
            onClose()
          }}
          className="flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-rose-600 to-red-700 hover:from-rose-500 hover:to-red-600 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl shadow-rose-950/80 transition active:scale-98"
        >
          <PhoneOff className="w-5 h-5" />
          Terminer la conversation
        </button>
      </div>
    </div>
  )
}
