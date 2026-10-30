import { useState } from 'react'
import { Volume2, Check, X, Sparkles, Filter } from 'lucide-react'
import { VOICES, type Voice } from '@/lib/fixtures'

interface VoicePickerModalProps {
  isOpen: boolean
  onClose: () => void
  currentVoiceId: string
  onSelectVoice: (voice: Voice) => void
  languageCode: string
}

export function VoicePickerModal({
  isOpen,
  onClose,
  currentVoiceId,
  onSelectVoice,
  languageCode,
}: VoicePickerModalProps) {
  const [activeGender, setActiveGender] = useState<'all' | 'female' | 'male'>('all')
  const [playingVoiceId, setPlayingVoiceId] = useState<string | null>(null)

  if (!isOpen) return null

  const filteredVoices = VOICES.filter((v) => {
    if (activeGender === 'all') return true
    return v.gender === activeGender
  })

  const playVoiceSample = (voice: Voice) => {
    if (typeof window === 'undefined') return

    // Stop ongoing speech
    window.speechSynthesis?.cancel()

    setPlayingVoiceId(voice.id)
    const textToSpeak = languageCode === 'bm' ? voice.sampleTextBm : voice.sampleTextFr

    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(textToSpeak)
      utterance.pitch = voice.pitch
      utterance.rate = voice.rate

      // Try finding suitable voice
      const voices = window.speechSynthesis.getVoices()
      const frenchVoice = voices.find((v) => v.lang.startsWith('fr'))
      if (frenchVoice) {
        utterance.voice = frenchVoice
      }

      utterance.onend = () => {
        setPlayingVoiceId(null)
      }
      utterance.onerror = () => {
        setPlayingVoiceId(null)
      }

      window.speechSynthesis.speak(utterance)
    } else {
      setTimeout(() => {
        setPlayingVoiceId(null)
      }, 2500)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-[#0F1713] border border-emerald-500/30 rounded-3xl p-5 sm:p-6 shadow-2xl shadow-emerald-950/70 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-emerald-500/20">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Volume2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                Choisir une voix
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  10 Voix Mali
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Sélectionne le timbre et la personnalité de ton compagnon
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

        {/* Gender Filter Tabs */}
        <div className="flex items-center gap-2 py-3">
          <span className="text-xs text-slate-400 flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5" /> Filtrer :
          </span>
          <button
            onClick={() => setActiveGender('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              activeGender === 'all'
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200'
            }`}
          >
            Toutes ({VOICES.length})
          </button>
          <button
            onClick={() => setActiveGender('female')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              activeGender === 'female'
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200'
            }`}
          >
            Féminines (5)
          </button>
          <button
            onClick={() => setActiveGender('male')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              activeGender === 'male'
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200'
            }`}
          >
            Masculines (5)
          </button>
        </div>

        {/* Voice List */}
        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 py-1">
          {filteredVoices.map((voice) => {
            const isSelected = currentVoiceId === voice.id
            const isPlaying = playingVoiceId === voice.id

            return (
              <div
                key={voice.id}
                className={`p-3.5 rounded-2xl border transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isSelected
                    ? 'border-emerald-500/80 bg-emerald-950/40 shadow-md shadow-emerald-950/30'
                    : 'border-slate-800/80 bg-slate-900/40 hover:border-emerald-500/30 hover:bg-slate-900/80'
                }`}
              >
                {/* Voice info */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-white text-base shadow-sm relative overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${voice.accentColor}40, #0B1310)`,
                      borderColor: voice.accentColor,
                      borderWidth: 1,
                    }}
                  >
                    {voice.avatar}
                    {isPlaying && (
                      <span className="absolute inset-0 bg-emerald-500/30 flex items-center justify-center animate-pulse">
                        <Volume2 className="w-5 h-5 text-emerald-300" />
                      </span>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm sm:text-base">
                        {voice.name}
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded-md font-medium bg-slate-800 text-slate-300 border border-slate-700/60">
                        {voice.style}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {voice.gender === 'female' ? 'Femme' : 'Homme'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{voice.description}</p>
                    <p className="text-[11px] text-amber-300/80 italic mt-0.5 line-clamp-1">
                      « {languageCode === 'bm' ? voice.sampleTextBm : voice.sampleTextFr} »
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => playVoiceSample(voice)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition ${
                      isPlaying
                        ? 'border-amber-400 text-amber-300 bg-amber-400/20'
                        : 'border-slate-700 text-slate-300 hover:border-slate-600 hover:bg-slate-800'
                    }`}
                  >
                    <Volume2 className={`w-3.5 h-3.5 ${isPlaying ? 'animate-bounce' : ''}`} />
                    {isPlaying ? 'Lecture...' : 'Écouter'}
                  </button>

                  <button
                    onClick={() => {
                      onSelectVoice(voice)
                      onClose()
                    }}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                      isSelected
                        ? 'bg-emerald-500 text-black font-bold'
                        : 'bg-emerald-950/80 hover:bg-emerald-800 text-emerald-300 border border-emerald-600/40'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="w-3.5 h-3.5" /> Active
                      </>
                    ) : (
                      'Choisir'
                    )}
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer tip */}
        <div className="pt-3 border-t border-emerald-500/20 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          Les voix s’adaptent au Bambara, au Français et au rythme de vos conversations.
        </div>
      </div>
    </div>
  )
}
