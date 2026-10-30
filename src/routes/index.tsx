import { useState, useRef, useEffect } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
  Send,
  Mic,
  MicOff,
  Volume2,
  Sparkles,
  Paperclip,
  Image as ImageIcon,
  FileText,
  Copy,
  Share2,
  RotateCcw,
  Scissors,
  HelpCircle,
  Check,
  ChevronDown,
  BookOpen,
  Briefcase,
  Lightbulb,
  Heart,
  Square,
  ArrowLeftRight,
  User,
  Bot,
  Flame,
} from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { VoiceLiveModal } from '@/components/VoiceLiveModal'
import { VoicePickerModal } from '@/components/VoicePickerModal'
import { TranslatorModal } from '@/components/TranslatorModal'
import { HistoryDrawer } from '@/components/HistoryDrawer'
import { SettingsModal } from '@/components/SettingsModal'
import { OnboardingModal } from '@/components/OnboardingModal'
import {
  VOICES,
  LANGUAGES,
  CHAT_MODES,
  INITIAL_MESSAGES,
  type Voice,
  type InitialChatMessage,
  type ConversationItem,
} from '@/lib/fixtures'

export const Route = createFileRoute('/')({
  component: ChatMaliHome,
})

function ChatMaliHome() {
  // Global App States
  const [currentVoice, setCurrentVoice] = useState<Voice>(VOICES[0]) // Awa by default
  const [languageCode, setLanguageCode] = useState<string>('bm') // Bambara primary
  const [isBambaraMode, setIsBambaraMode] = useState<boolean>(true)
  const [activeModeId, setActiveModeId] = useState<string>('ami')
  const [userName, setUserName] = useState<string>('Ahmed')
  const [assistantName, setAssistantName] = useState<string>('Awa')
  const [aiMemoryEnabled, setAiMemoryEnabled] = useState<boolean>(true)
  const [voiceSpeed, setVoiceSpeed] = useState<number>(1.0)

  // Messages & Input States
  const [messages, setMessages] = useState<InitialChatMessage[]>(INITIAL_MESSAGES)
  const [inputText, setInputText] = useState<string>('')
  const [isThinking, setIsThinking] = useState<boolean>(false)
  const [isRecording, setIsRecording] = useState<boolean>(false)
  const [activeSpeechMessageId, setActiveSpeechMessageId] = useState<string | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [attachedFile, setAttachedFile] = useState<{ name: string; type: 'image' | 'doc' } | null>(null)

  // Modals & Drawers States
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(false)
  const [isLiveVoiceOpen, setIsLiveVoiceOpen] = useState<boolean>(false)
  const [isVoicePickerOpen, setIsVoicePickerOpen] = useState<boolean>(false)
  const [isTranslatorOpen, setIsTranslatorOpen] = useState<boolean>(false)
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false)
  const [activeConvId, setActiveConvId] = useState<string>('conv-1')

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const speechRecognitionRef = useRef<any>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll chat to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isThinking])

  // Speech Recognition setup for standard chat bar
  const toggleRecording = () => {
    if (typeof window === 'undefined') return

    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SpeechRec) {
      // Fallback: simulate audio input
      setIsRecording(true)
      setTimeout(() => {
        setInputText(isBambaraMode ? 'I ni ce, n bɛ fɛ k’an ka kuma' : 'Bonjour, je voudrais discuter')
        setIsRecording(false)
      }, 1800)
      return
    }

    if (isRecording) {
      if (speechRecognitionRef.current) {
        speechRecognitionRef.current.stop()
      }
      setIsRecording(false)
    } else {
      try {
        const recognition = new SpeechRec()
        recognition.continuous = false
        recognition.interimResults = true
        recognition.lang = isBambaraMode || languageCode === 'bm' ? 'fr-FR' : 'fr-FR'

        recognition.onstart = () => {
          setIsRecording(true)
        }

        recognition.onresult = (event: any) => {
          const transcript = Array.from(event.results)
            .map((res: any) => res[0].transcript)
            .join('')
          setInputText(transcript)
        }

        recognition.onend = () => {
          setIsRecording(false)
        }

        recognition.onerror = () => {
          setIsRecording(false)
        }

        speechRecognitionRef.current = recognition
        recognition.start()
      } catch (err) {
        setIsRecording(false)
      }
    }
  }

  // Handle send message
  const handleSendMessage = (customText?: string) => {
    const textToSend = (customText || inputText).trim()
    if (!textToSend && !attachedFile) return

    const now = new Date()
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`

    const userMsg: InitialChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: attachedFile ? `[Fichier joint: ${attachedFile.name}]\n${textToSend}` : textToSend,
      timestamp: timeStr,
      isBambara: isBambaraMode,
    }

    setMessages((prev) => [...prev, userMsg])
    setInputText('')
    setAttachedFile(null)
    setIsThinking(true)

    // Simulate smart context-aware companion response
    setTimeout(() => {
      const lower = textToSend.toLowerCase()
      let aiResponse = ''
      let bambaraTrans: string | undefined
      let frenchTrans: string | undefined
      let simplified: string | undefined
      let shorter: string | undefined

      if (isBambaraMode || lower.includes('bambara') || lower.includes('ce') || lower.includes('kɛnɛ')) {
        aiResponse = `N ye a mɛn koɲuman, ${userName} ! Bi ye don ɲuman ye. N bɛ yan ka kuma kɛ i fɛ hakilitigiya ni ɲɛtaa la. Mun wɛrɛ lo bɛ i hakili la ?`
        frenchTrans = `Je t’ai bien compris, ${userName} ! Aujourd’hui est un jour béni. Je suis là pour échanger avec sagesse et progrès. Qu’as-tu d’autre en tête ?`
        simplified = `Bien compris ${userName} ! Je suis là pour toi. De quoi veux-tu qu'on parle ?`
        shorter = `N bɛ yan ${userName} ! Mun wɛrɛ lo b’i fɛ ?`
      } else if (lower.includes('nom') || lower.includes('prénom') || lower.includes('m’appelle')) {
        aiResponse = `Tu m’as dit que tu t’appelles **${userName}** 😊 ! Je n'oublie jamais mes amis sur CHAT MALI.`
        simplified = `Tu t'appelles bien ${userName} !`
        shorter = `Tu t’appelles ${userName} 😊`
      } else if (lower.includes('fatigué') || lower.includes('dur') || lower.includes('triste')) {
        aiResponse = `Aww, repose-toi un peu 😌. Prends un bon verre d’eau ou un thé kinkeliba. Tu veux qu’on parle tranquillement ou tu préfères que je t’aide à planifier ta journée en douceur ?`
        simplified = `Repose-toi un peu ! Je suis là pour t'écouter ou t'aider calmement.`
        shorter = `Repose-toi un peu 😌. Comment puis-je t’apaiser ?`
      } else if (lower.includes('bureau') || lower.includes('travail') || activeModeId === 'travail') {
        aiResponse = `Pour ton travail, ${userName}, la clarté et la rigueur sont essentielles. Je te propose de structurer tes idées en 3 points clés avec une formule de politesse adaptée à nos réalités professionnelles.`
        simplified = `Voici comment structurer ta demande de travail de manière professionnelle et efficace.`
        shorter = `Je te prépare une version courte et percutante pour ton travail.`
      } else if (attachedFile) {
        aiResponse = `J’ai bien analysé ton document **« ${userMsg.content} »** ! C’est un contenu très riche. Je peux t’en faire un résumé synthétique, le traduire en Bambara ou t’aider à en extraire les points d'action.`
        simplified = `Document bien reçu et analysé ! Que veux-tu en faire ?`
        shorter = `Document reçu ! Résumé ou traduction ?`
      } else {
        aiResponse = `Je suis ravi d’en parler avec toi, ${userName}. Que ce soit pour tes projets, tes études ou la vie de tous les jours au Mali et ailleurs, nous avançons ensemble pas à pas !`
        simplified = `Très bien noté ! Continuons notre échange.`
        shorter = `Je t'écoute pour la suite, ${userName} !`
      }

      const aiMsg: InitialChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: aiResponse,
        timestamp: timeStr,
        bambaraTranslation: bambaraTrans,
        frenchTranslation: frenchTrans,
        simplified,
        shorter,
        isBambara: isBambaraMode,
      }

      setMessages((prev) => [...prev, aiMsg])
      setIsThinking(false)
    }, 1100)
  }

  // Play Speech Aloud for a message
  const handleReadAloud = (msg: InitialChatMessage) => {
    if (typeof window === 'undefined') return

    if (activeSpeechMessageId === msg.id) {
      window.speechSynthesis?.cancel()
      setActiveSpeechMessageId(null)
      return
    }

    window.speechSynthesis?.cancel()
    setActiveSpeechMessageId(msg.id)

    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(msg.content)
      utterance.pitch = currentVoice.pitch
      utterance.rate = currentVoice.rate * voiceSpeed

      const voices = window.speechSynthesis.getVoices()
      const frenchVoice = voices.find((v) => v.lang.startsWith('fr'))
      if (frenchVoice) {
        utterance.voice = frenchVoice
      }

      utterance.onend = () => setActiveSpeechMessageId(null)
      utterance.onerror = () => setActiveSpeechMessageId(null)

      window.speechSynthesis.speak(utterance)
    } else {
      setTimeout(() => setActiveSpeechMessageId(null), 2500)
    }
  }

  // Quick Action Tool: Translate message
  const handleTranslateMessage = (msgId: string) => {
    setMessages((prev) =>
      prev.map((m) => {
        if (m.id === msgId) {
          if (m.isBambara) {
            return {
              ...m,
              content:
                m.frenchTranslation ||
                `[Traduction Française] : « ${m.content} » (Je te salue avec respect et je suis à ton écoute).`,
              isBambara: false,
            }
          } else {
            return {
              ...m,
              content:
                m.bambaraTranslation ||
                `[Bamanankan] : I ni ce ${userName} ! Ala ka tilé hɛɛrɛ caya, n bɛ i dɛmɛ koɲuman.`,
              isBambara: true,
            }
          }
        }
        return m
      })
    )
  }

  // Quick Action Tool: Simplify message
  const handleSimplifyMessage = (msgId: string) => {
    setMessages((prev) =>
      prev.map((m) => {
        if (m.id === msgId && m.simplified) {
          return { ...m, content: m.simplified }
        }
        return m
      })
    )
  }

  // Quick Action Tool: Shorter response
  const handleShorterMessage = (msgId: string) => {
    setMessages((prev) =>
      prev.map((m) => {
        if (m.id === msgId && m.shorter) {
          return { ...m, content: m.shorter }
        }
        return m
      })
    )
  }

  // Copy message
  const handleCopyMessage = (msg: InitialChatMessage) => {
    navigator.clipboard?.writeText(msg.content)
    setCopiedId(msg.id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  // Regenerate last AI response
  const handleRegenerate = () => {
    if (messages.length === 0) return
    setIsThinking(true)
    setTimeout(() => {
      const refreshedContent = isBambaraMode
        ? `N y’a lajɛ kura la ! ${userName}, an ka t’a fɛ dɔɔnin-dɔɔnin. I ka kɛnɛ kosɛbɛ bi !`
        : `Voici une perspective encore plus personnalisée, ${userName} : avançons avec méthode et simplicité !`

      setMessages((prev) => {
        const copy = [...prev]
        const lastIdx = copy.map((m) => m.role).lastIndexOf('assistant')
        if (lastIdx !== -1) {
          copy[lastIdx] = {
            ...copy[lastIdx],
            content: refreshedContent,
          }
        }
        return copy
      })
      setIsThinking(false)
    }, 900)
  }

  // File upload simulation
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const isImg = file.type.startsWith('image/')
    setAttachedFile({
      name: file.name,
      type: isImg ? 'image' : 'doc',
    })
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#080E0B] text-slate-100 selection:bg-emerald-500/30">
      {/* Top Navigation */}
      <Navbar
        currentVoice={currentVoice}
        isBambaraMode={isBambaraMode}
        onToggleBambaraMode={() => setIsBambaraMode(!isBambaraMode)}
        onOpenVoicePicker={() => setIsVoicePickerOpen(true)}
        onOpenLiveVoice={() => setIsLiveVoiceOpen(true)}
        onOpenTranslator={() => setIsTranslatorOpen(true)}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        currentLanguageCode={languageCode}
        onOpenOnboarding={() => setIsOnboardingOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 flex flex-col max-w-4xl w-full mx-auto px-3 sm:px-6 pt-3 pb-24">
        {/* Hero Companion Section (Requirement 4) */}
        <section className="mb-4 p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-[#0c2017] via-[#0a1712] to-[#07110d] border border-emerald-500/25 shadow-xl relative overflow-hidden">
          {/* Subtle Mali flag backdrop bar */}
          <div className="absolute top-0 left-0 right-0 h-1 flex">
            <div className="w-1/3 bg-[#008751]" />
            <div className="w-1/3 bg-[#FCD116]" />
            <div className="w-1/3 bg-[#CE1126]" />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Greeting & Companion Presentation */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-extrabold text-white">
                  {isBambaraMode ? 'I ni ce 👋' : 'Bonjour 👋'} {userName}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Compagnon en ligne
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 font-medium">
                {isBambaraMode ? 'Mun lo b’i fɛ bi ?' : 'Que veux-tu faire aujourd’hui ?'}
              </p>

              {/* Cultural Quote Card */}
              <div className="mt-2.5 p-3 rounded-2xl bg-black/40 border border-emerald-500/20 flex items-start gap-2.5 max-w-xl">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center text-sm font-bold flex-shrink-0">
                  🤖
                </div>
                <div>
                  <p className="text-xs text-amber-200 font-semibold">
                    {assistantName} : « Awa, n bɛ yan. I ka fɛ an ka kuma min na ? »
                  </p>
                  <p className="text-[11px] text-slate-400 italic mt-0.5">
                    (Traduction : « Je suis là. Dans quelle langue veux-tu qu’on parle ? »)
                  </p>
                </div>
              </div>
            </div>

            {/* Large Quick Voice Launcher Button (Requirement 6) */}
            <div className="flex flex-col items-stretch sm:items-end justify-center gap-2">
              <button
                onClick={() => setIsLiveVoiceOpen(true)}
                className="py-3 px-5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-950/60 transition active:scale-95 group"
              >
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition">
                  <Mic className="w-3.5 h-3.5 text-white" />
                </div>
                <span>🎙️ Parler à CHAT MALI</span>
              </button>
              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
                <span>Voix active : <strong className="text-amber-300">{currentVoice.name}</strong></span>
                <span>•</span>
                <button
                  onClick={() => setIsVoicePickerOpen(true)}
                  className="text-emerald-400 hover:underline"
                >
                  Changer
                </button>
              </div>
            </div>
          </div>

          {/* Quick Action Pills (Requirement 4) */}
          <div className="mt-4 pt-3 border-t border-emerald-500/15 flex flex-wrap gap-2 text-xs">
            <button
              onClick={() => setIsLiveVoiceOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/40 text-slate-200 flex items-center gap-1.5 transition"
            >
              <span>🗣️</span> Parler
            </button>
            <button
              onClick={() => document.getElementById('chat-input')?.focus()}
              className="px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/40 text-slate-200 flex items-center gap-1.5 transition"
            >
              <span>⌨️</span> Écrire
            </button>
            <button
              onClick={() => setIsTranslatorOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/40 text-slate-200 flex items-center gap-1.5 transition"
            >
              <span>🌍</span> Langues
            </button>
            <button
              onClick={() => setIsVoicePickerOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/40 text-slate-200 flex items-center gap-1.5 transition"
            >
              <span>🎙️</span> Choisir une voix
            </button>
            <button
              onClick={() => {
                setActiveModeId('etudes')
                handleSendMessage('Aide-moi à réviser mes cours pour réussir mes examens.')
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/40 text-slate-200 flex items-center gap-1.5 transition"
            >
              <span>📚</span> Étudier
            </button>
            <button
              onClick={() => {
                setActiveModeId('travail')
                handleSendMessage('Je veux rédiger un CV ou une lettre professionnelle percutante.')
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/40 text-slate-200 flex items-center gap-1.5 transition"
            >
              <span>💼</span> Travail
            </button>
            <button
              onClick={() => {
                setActiveModeId('business')
                handleSendMessage('Donne-moi 3 idées de projets commerciaux porteurs au Mali.')
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/40 text-slate-200 flex items-center gap-1.5 transition"
            >
              <span>💡</span> Idées
            </button>
            <button
              onClick={() => {
                setActiveModeId('ami')
                handleSendMessage('Parlons amicalement de la journée. Comment vas-tu ?')
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/40 text-slate-200 flex items-center gap-1.5 transition"
            >
              <span>❤️</span> Discussion
            </button>
          </div>
        </section>

        {/* Chat Modes Selector Bar (Requirement 12) */}
        <div className="mb-3 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          <span className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider mr-1">
            Mode :
          </span>
          {CHAT_MODES.map((mode) => (
            <button
              key={mode.id}
              onClick={() => {
                setActiveModeId(mode.id)
                // Add starter contextual toast or message
              }}
              className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition flex items-center gap-1.5 border ${
                activeModeId === mode.id
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/60 font-bold shadow-sm'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800/80 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <span>{mode.icon}</span>
              <span>{mode.name}</span>
              {mode.nameBm && (
                <span className="text-[10px] opacity-70">({mode.nameBm})</span>
              )}
            </button>
          ))}
        </div>

        {/* Conversation Stream (Requirement 5) */}
        <div className="flex-1 space-y-4 overflow-y-auto py-2">
          {messages.map((message) => {
            const isUser = message.role === 'user'
            const isSpeakingThis = activeSpeechMessageId === message.id

            return (
              <div
                key={message.id}
                className={`flex gap-3 group animate-in fade-in duration-200 ${
                  isUser ? 'justify-end' : 'justify-start'
                }`}
              >
                {/* Assistant Avatar */}
                {!isUser && (
                  <div
                    className="w-9 h-9 rounded-2xl flex items-center justify-center font-bold text-xs text-white flex-shrink-0 shadow-md relative overflow-hidden"
                    style={{
                      backgroundColor: '#0c2419',
                      border: `1.5px solid ${currentVoice.accentColor}`,
                    }}
                  >
                    <span>{currentVoice.avatar}</span>
                    {isSpeakingThis && (
                      <span className="absolute inset-0 bg-emerald-500/30 flex items-center justify-center animate-pulse">
                        <Volume2 className="w-4 h-4 text-emerald-300" />
                      </span>
                    )}
                  </div>
                )}

                {/* Message Bubble Container */}
                <div
                  className={`max-w-[85%] sm:max-w-[78%] flex flex-col ${
                    isUser ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`p-4 rounded-3xl text-sm leading-relaxed whitespace-pre-wrap transition-all shadow-sm ${
                      isUser
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-br-sm'
                        : 'bg-[#101914] border border-emerald-500/20 text-slate-100 rounded-bl-sm shadow-md shadow-emerald-950/30'
                    }`}
                  >
                    {message.content}

                    {/* Bambara badge if language is recognized */}
                    {message.isBambara && (
                      <div className="mt-2 pt-1 border-t border-white/10 flex items-center gap-1.5 text-[10px] text-amber-300/90 font-medium">
                        <span>🇲🇱</span>
                        <span>Bamanankan</span>
                      </div>
                    )}
                  </div>

                  {/* Message Action Toolbar (Requirement 5) */}
                  {!isUser && (
                    <div className="mt-1.5 flex flex-wrap items-center gap-1 text-[11px] text-slate-400 opacity-90 group-hover:opacity-100 transition">
                      {/* Lire à voix haute */}
                      <button
                        onClick={() => handleReadAloud(message)}
                        className={`px-2 py-1 rounded-lg border transition flex items-center gap-1 ${
                          isSpeakingThis
                            ? 'bg-amber-400/20 text-amber-300 border-amber-400/40'
                            : 'bg-slate-900/60 border-slate-800 hover:text-emerald-300 hover:border-emerald-500/40'
                        }`}
                        title="Lire à voix haute avec la voix sélectionnée"
                      >
                        <Volume2 className={`w-3 h-3 ${isSpeakingThis ? 'animate-bounce' : ''}`} />
                        <span>{isSpeakingThis ? 'En lecture...' : 'Lire'}</span>
                      </button>

                      {/* Traduire */}
                      <button
                        onClick={() => handleTranslateMessage(message.id)}
                        className="px-2 py-1 rounded-lg bg-slate-900/60 border border-slate-800 hover:text-emerald-300 hover:border-emerald-500/40 transition flex items-center gap-1"
                        title="Traduire Bambara ↔ Français"
                      >
                        <ArrowLeftRight className="w-3 h-3 text-cyan-400" />
                        <span>Traduire</span>
                      </button>

                      {/* Réponse plus courte */}
                      <button
                        onClick={() => handleShorterMessage(message.id)}
                        className="px-2 py-1 rounded-lg bg-slate-900/60 border border-slate-800 hover:text-emerald-300 hover:border-emerald-500/40 transition flex items-center gap-1"
                        title="Rendre la réponse plus courte et concise"
                      >
                        <Scissors className="w-3 h-3 text-amber-400" />
                        <span>Plus court</span>
                      </button>

                      {/* Expliquer simplement */}
                      <button
                        onClick={() => handleSimplifyMessage(message.id)}
                        className="px-2 py-1 rounded-lg bg-slate-900/60 border border-slate-800 hover:text-emerald-300 hover:border-emerald-500/40 transition flex items-center gap-1"
                        title="Expliquer en termes très simples"
                      >
                        <HelpCircle className="w-3 h-3 text-rose-400" />
                        <span>Expliquer simplement</span>
                      </button>

                      {/* Copier */}
                      <button
                        onClick={() => handleCopyMessage(message)}
                        className="p-1 rounded-lg bg-slate-900/60 border border-slate-800 hover:text-white transition"
                        title="Copier la réponse"
                      >
                        {copiedId === message.id ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>

                      {/* Régénérer */}
                      <button
                        onClick={handleRegenerate}
                        className="p-1 rounded-lg bg-slate-900/60 border border-slate-800 hover:text-white transition"
                        title="Régénérer une réponse"
                      >
                        <RotateCcw className="w-3 h-3" />
                      </button>

                      <span className="text-[10px] text-slate-500 ml-1">{message.timestamp}</span>
                    </div>
                  )}

                  {isUser && (
                    <span className="text-[10px] text-slate-500 mt-1 mr-2">{message.timestamp}</span>
                  )}
                </div>

                {/* User Avatar */}
                {isUser && (
                  <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-amber-500/30 to-rose-500/20 border border-amber-500/40 flex items-center justify-center font-bold text-xs text-amber-300 flex-shrink-0 shadow-md">
                    {userName ? userName[0].toUpperCase() : 'U'}
                  </div>
                )}
              </div>
            )
          })}

          {/* Thinking animation state */}
          {isThinking && (
            <div className="flex gap-3 items-center text-xs text-emerald-400/90 animate-pulse">
              <div className="w-9 h-9 rounded-2xl bg-[#0c2419] border border-emerald-500/40 flex items-center justify-center font-bold text-xs text-white">
                🤖
              </div>
              <div className="p-3.5 rounded-2xl bg-[#101914] border border-emerald-500/20 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-medium">CHAT MALI réfléchit…</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Floating Bottom Input Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-[#080E0B]/95 backdrop-blur-md border-t border-emerald-500/20 p-3 sm:pb-4">
        <div className="max-w-4xl mx-auto w-full">
          {/* File Attachment Chip */}
          {attachedFile && (
            <div className="mb-2 inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-xs text-emerald-300">
              {attachedFile.type === 'image' ? (
                <ImageIcon className="w-3.5 h-3.5" />
              ) : (
                <FileText className="w-3.5 h-3.5" />
              )}
              <span className="font-medium truncate max-w-xs">{attachedFile.name}</span>
              <button
                onClick={() => setAttachedFile(null)}
                className="text-slate-400 hover:text-white font-bold ml-1"
              >
                ×
              </button>
            </div>
          )}

          {/* Input Form with Big Voice Button */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSendMessage()
            }}
            className="flex items-center gap-2"
          >
            {/* Attachment Button */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,.pdf,.doc,.docx,.txt"
              className="hidden"
              onChange={handleFileUpload}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-3 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-slate-200 transition"
              title="Envoyer une photo ou un document (PDF, CV, Image)"
            >
              <Paperclip className="w-4 h-4" />
            </button>

            {/* Text Input */}
            <div className="relative flex-1">
              <input
                id="chat-input"
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={
                  isBambaraMode
                    ? 'Sɛbɛnni kɛ Bamanankan na walima tubabukan na...'
                    : 'Écris ou parle à CHAT MALI...'
                }
                className="w-full px-4 py-3.5 bg-slate-900/90 border border-slate-800 rounded-2xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/60 shadow-inner"
              />
            </div>

            {/* Microphone Button (Speech-to-Text) */}
            <button
              type="button"
              onClick={toggleRecording}
              className={`p-3.5 rounded-2xl border transition shadow-lg ${
                isRecording
                  ? 'bg-rose-600 border-rose-400 text-white animate-pulse'
                  : 'bg-emerald-950/80 hover:bg-emerald-900 border-emerald-600/50 text-emerald-300'
              }`}
              title={isRecording ? 'Arrêter l’enregistrement' : 'Parler au micro'}
            >
              <Mic className="w-4 h-4" />
            </button>

            {/* Send Button */}
            <button
              type="submit"
              disabled={!inputText.trim() && !attachedFile}
              className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-40 disabled:hover:from-emerald-600 disabled:hover:to-teal-600 text-white font-bold transition shadow-lg shadow-emerald-950/50 active:scale-95"
              title="Envoyer le message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Modals and Drawers */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={(lang) => {
          setLanguageCode(lang)
          setIsBambaraMode(lang === 'bm')
          setIsOnboardingOpen(false)
        }}
      />

      <VoiceLiveModal
        isOpen={isLiveVoiceOpen}
        onClose={() => setIsLiveVoiceOpen(false)}
        currentVoice={currentVoice}
        isBambaraMode={isBambaraMode}
        languageCode={languageCode}
        onNewMessage={(uText, aiText) => {
          const now = new Date()
          const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
          setMessages((prev) => [
            ...prev,
            { id: `u-${Date.now()}`, role: 'user', content: uText, timestamp: timeStr },
            { id: `ai-${Date.now()}`, role: 'assistant', content: aiText, timestamp: timeStr },
          ])
        }}
      />

      <VoicePickerModal
        isOpen={isVoicePickerOpen}
        onClose={() => setIsVoicePickerOpen(false)}
        currentVoiceId={currentVoice.id}
        onSelectVoice={(v) => {
          setCurrentVoice(v)
          setAssistantName(v.name)
        }}
        languageCode={languageCode}
      />

      <TranslatorModal
        isOpen={isTranslatorOpen}
        onClose={() => setIsTranslatorOpen(false)}
        onSendToChat={(text) => handleSendMessage(text)}
      />

      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        activeConvId={activeConvId}
        onSelectConversation={(conv) => {
          setActiveConvId(conv.id)
          // Preload conversation
        }}
        onNewConversation={() => {
          setMessages([
            {
              id: `m-init-${Date.now()}`,
              role: 'assistant',
              content: isBambaraMode
                ? `I ni ce kura ${userName} ! Kuma kura bɛ daminɛ. Mun lo bɛ i fɛ an k’a lajɛ ?`
                : `Nouvelle discussion commencée ! Je suis à ton écoute, ${userName}. Que souhaites-tu aborder ?`,
              timestamp: 'À l’instant',
              isBambara: isBambaraMode,
            },
          ])
        }}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        currentVoice={currentVoice}
        onSelectVoice={(v) => setCurrentVoice(v)}
        languageCode={languageCode}
        onSelectLanguage={(code) => {
          setLanguageCode(code)
          setIsBambaraMode(code === 'bm')
        }}
        userName={userName}
        onUpdateUserName={(name) => setUserName(name)}
        assistantName={assistantName}
        onUpdateAssistantName={(name) => setAssistantName(name)}
        aiMemoryEnabled={aiMemoryEnabled}
        onToggleAiMemory={(enabled) => setAiMemoryEnabled(enabled)}
        voiceSpeed={voiceSpeed}
        onChangeVoiceSpeed={(speed) => setVoiceSpeed(speed)}
      />
    </div>
  )
}
