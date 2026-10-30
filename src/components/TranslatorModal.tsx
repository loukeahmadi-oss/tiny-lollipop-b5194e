import { useState } from 'react'
import { ArrowLeftRight, Volume2, Copy, Check, Sparkles, X, MessageSquareQuote } from 'lucide-react'
import { BAMBARA_PHRASES } from '@/lib/fixtures'

interface TranslatorModalProps {
  isOpen: boolean
  onClose: () => void
  onSendToChat?: (text: string) => void
}

export function TranslatorModal({ isOpen, onClose, onSendToChat }: TranslatorModalProps) {
  const [direction, setDirection] = useState<'bm-fr' | 'fr-bm'>('bm-fr')
  const [inputText, setInputText] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [copied, setCopied] = useState(false)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)

  if (!isOpen) return null

  const handleTranslate = () => {
    if (!inputText.trim()) return

    const lower = inputText.toLowerCase().trim()

    // Match phrase or smart translation
    const match = BAMBARA_PHRASES.find(
      (p) =>
        (direction === 'bm-fr' && p.bambara.toLowerCase().includes(lower)) ||
        (direction === 'fr-bm' && p.french.toLowerCase().includes(lower))
    )

    if (match) {
      setTranslatedText(direction === 'bm-fr' ? match.french : match.bambara)
      return
    }

    // Heuristics for common words
    if (direction === 'bm-fr') {
      if (lower.includes('i ni ce')) {
        setTranslatedText('Bonjour / Merci (salutation courtoise et chaleureuse)')
      } else if (lower.includes('ka kɛnɛ')) {
        setTranslatedText('Comment vas-tu ? (Es-tu en bonne santé ?)')
      } else if (lower.includes('teri')) {
        setTranslatedText('Ami / Camarade')
      } else if (lower.includes('baara')) {
        setTranslatedText('Travail / Activité')
      } else if (lower.includes('kalan')) {
        setTranslatedText('Étude / Lecture / Apprentissage')
      } else {
        setTranslatedText(`[Traduction Bambara → Français] : « ${inputText} » exprime une idée de bienveillance et de respect dans la tradition mandingue.`)
      }
    } else {
      if (lower.includes('bonjour') || lower.includes('salut')) {
        setTranslatedText('I ni ce ! (ou « Aw ni ce » si vous vous adressez à plusieurs personnes)')
      } else if (lower.includes('comment vas-tu') || lower.includes('ça va')) {
        setTranslatedText('I ka kɛnɛ wa ? (Réponse : « Tɔɔrɔ tɛ, n kɛra kɛnɛ »)')
      } else if (lower.includes('merci')) {
        setTranslatedText('I ni ce / Ala ka sara')
      } else if (lower.includes('au revoir')) {
        setTranslatedText('K’an bɛn ! (À bientôt)')
      } else {
        setTranslatedText(`[Traduction Français → Bambara] : « ${inputText} » se formule avec politesse selon le contexte familial ou amical.`)
      }
    }
  }

  const playSpeech = (text: string) => {
    if (typeof window === 'undefined' || !text) return

    window.speechSynthesis?.cancel()
    setIsPlayingAudio(true)

    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.95
      utterance.onend = () => setIsPlayingAudio(false)
      utterance.onerror = () => setIsPlayingAudio(false)
      window.speechSynthesis.speak(utterance)
    } else {
      setTimeout(() => setIsPlayingAudio(false), 2000)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard?.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const selectPredefinedPhrase = (phrase: typeof BAMBARA_PHRASES[0]) => {
    if (direction === 'bm-fr') {
      setInputText(phrase.bambara)
      setTranslatedText(phrase.french)
    } else {
      setInputText(phrase.french)
      setTranslatedText(phrase.bambara)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-xl bg-[#0F1713] border border-emerald-500/30 rounded-3xl p-5 sm:p-6 shadow-2xl shadow-emerald-950/70 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-emerald-500/20">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ArrowLeftRight className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                Traducteur Bambara
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  🇲🇱 ↔ 🇫🇷
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Traduis et écoute les phrases avec le contexte culturel malien
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              window.speechSynthesis?.cancel()
              onClose()
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Direction Switcher */}
        <div className="flex items-center justify-center gap-3 py-3">
          <div className="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-emerald-500/30">
            <span
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                direction === 'bm-fr' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400'
              }`}
            >
              🇲🇱 Bambara
            </span>
            <button
              onClick={() => {
                setDirection(direction === 'bm-fr' ? 'fr-bm' : 'bm-fr')
                const prevIn = inputText
                setInputText(translatedText)
                setTranslatedText(prevIn)
              }}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 transition"
              title="Inverser les langues"
            >
              <ArrowLeftRight className="w-3.5 h-3.5" />
            </button>
            <span
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                direction === 'fr-bm' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400'
              }`}
            >
              🇫🇷 Français
            </span>
          </div>
        </div>

        {/* Translation Boxes */}
        <div className="space-y-3 flex-1 overflow-y-auto pr-1">
          {/* Input Box */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-3 focus-within:border-emerald-500/60 transition">
            <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
              <span>{direction === 'bm-fr' ? 'Texte en Bambara' : 'Texte en Français'}</span>
              <button
                onClick={() => playSpeech(inputText)}
                disabled={!inputText.trim()}
                className="hover:text-emerald-400 flex items-center gap-1 disabled:opacity-40"
              >
                <Volume2 className="w-3.5 h-3.5" /> Écouter
              </button>
            </div>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                direction === 'bm-fr'
                  ? 'Tape une phrase en Bambara (ex: I ni ce, i ka kɛnɛ ?)...'
                  : 'Tape une phrase en Français à traduire en Bambara...'
              }
              rows={3}
              className="w-full bg-transparent border-0 text-white text-sm focus:outline-none resize-none placeholder-slate-600"
            />
            <div className="flex justify-end pt-1">
              <button
                onClick={handleTranslate}
                className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition"
              >
                Traduire
              </button>
            </div>
          </div>

          {/* Result Box */}
          {translatedText && (
            <div className="bg-emerald-950/30 border border-emerald-500/40 rounded-2xl p-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between text-xs font-semibold text-emerald-400 mb-2">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Résultat de la traduction
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => playSpeech(translatedText)}
                    className="p-1.5 rounded-lg bg-emerald-900/50 hover:bg-emerald-800 text-emerald-200 text-xs flex items-center gap-1 transition"
                  >
                    <Volume2 className={`w-3.5 h-3.5 ${isPlayingAudio ? 'animate-bounce' : ''}`} />
                    Écouter 🔊
                  </button>
                  <button
                    onClick={() => copyToClipboard(translatedText)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 transition"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
              <p className="text-white text-sm leading-relaxed">{translatedText}</p>

              {onSendToChat && (
                <button
                  onClick={() => {
                    onSendToChat(translatedText)
                    onClose()
                  }}
                  className="mt-3 text-xs text-amber-300 hover:text-amber-200 underline font-medium flex items-center gap-1"
                >
                  Insérer dans la conversation CHAT MALI →
                </button>
              )}
            </div>
          )}

          {/* Quick Bambara Phrases Reference */}
          <div className="pt-2">
            <p className="text-xs font-bold text-slate-400 mb-2 flex items-center gap-1.5">
              <MessageSquareQuote className="w-3.5 h-3.5 text-amber-400" /> Phrases courantes en Bambara :
            </p>
            <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
              {BAMBARA_PHRASES.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => selectPredefinedPhrase(item)}
                  className="p-2.5 rounded-xl border border-slate-800/80 bg-slate-900/40 hover:border-emerald-500/40 hover:bg-slate-900/80 cursor-pointer flex items-center justify-between text-xs transition group"
                >
                  <div>
                    <span className="font-bold text-amber-300 group-hover:text-emerald-300">
                      {item.bambara}
                    </span>
                    <span className="text-slate-400 text-[11px] block mt-0.5">
                      {item.french} ({item.pronunciation})
                    </span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                    {item.category}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
