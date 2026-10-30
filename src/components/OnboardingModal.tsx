import { useState } from 'react'
import { Sparkles, Mic, Globe2, ArrowRight, Check } from 'lucide-react'
import { LANGUAGES } from '@/lib/fixtures'

interface OnboardingModalProps {
  isOpen: boolean
  onClose: (selectedLang: string) => void
}

export function OnboardingModal({ isOpen, onClose }: { isOpen: boolean; onClose: (lang: string) => void }) {
  const [step, setStep] = useState(1)
  const [selectedLang, setSelectedLang] = useState('bm')

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-[#0F1713] border border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-emerald-950/60 overflow-hidden text-center animate-in fade-in zoom-in-95 duration-200">
        {/* Subtle decorative background gradient */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Step indicators */}
        <div className="flex justify-center items-center gap-2 mb-6">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                s === step
                  ? 'w-8 bg-gradient-to-r from-emerald-400 to-amber-400'
                  : s < step
                  ? 'w-4 bg-emerald-500/50'
                  : 'w-4 bg-slate-800'
              }`}
            />
          ))}
        </div>

        {/* Step 1: Bienvenue sur CHAT MALI */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-emerald-500/20 to-amber-500/10 border border-emerald-500/40 flex items-center justify-center text-4xl shadow-inner animate-float">
              🇲🇱
            </div>
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Compagnon IA Malien
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Bienvenue sur CHAT MALI
              </h2>
              <p className="text-amber-300/90 text-sm italic font-medium mt-2">
                « Ton ami IA, dans ta langue. »
              </p>
              <p className="text-slate-400 text-xs sm:text-sm mt-3 leading-relaxed">
                Plus qu’un simple chatbot : un compagnon bienveillant, intelligent et culturellement connecté, conçu pour échanger naturellement avec toi.
              </p>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-emerald-950 transition active:scale-98"
            >
              Continuer <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 2: Parle naturellement */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-amber-500/20 to-rose-500/10 border border-amber-500/40 flex items-center justify-center shadow-inner animate-pulse-glow">
              <Mic className="w-10 h-10 text-amber-400" />
            </div>
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30 mb-2">
                Voix & Écoute Active
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Parle naturellement
              </h2>
              <p className="text-amber-300/90 text-sm font-medium mt-2">
                « Écris ou parle avec CHAT MALI. »
              </p>
              <p className="text-slate-400 text-xs sm:text-sm mt-3 leading-relaxed">
                Appuie sur le micro ou active le mode conversation continue pour dialoguer de vive voix avec des voix authentiques comme Awa, Moussa ou Bakary.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="w-1/3 py-3.5 px-4 rounded-2xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 font-medium text-sm transition"
              >
                Retour
              </button>
              <button
                onClick={() => setStep(3)}
                className="w-2/3 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-emerald-950 transition active:scale-98"
              >
                Continuer <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Choisis ta langue */}
        {step === 3 && (
          <div className="space-y-5">
            <div className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-br from-emerald-500/20 to-blue-500/10 border border-emerald-500/40 flex items-center justify-center shadow-inner">
              <Globe2 className="w-8 h-8 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-white">
                Choisis ta langue principale
              </h2>
              <p className="text-slate-400 text-xs mt-1">
                Le Bambara est l'identité culturelle native, mais tu pourras changer à tout moment.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-left max-h-48 overflow-y-auto pr-1">
              {LANGUAGES.slice(0, 6).map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setSelectedLang(lang.code)}
                  className={`p-2.5 rounded-xl border flex items-center justify-between text-xs transition ${
                    selectedLang === lang.code
                      ? 'border-emerald-500 bg-emerald-500/20 text-white'
                      : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{lang.flag}</span>
                    <span className="font-semibold">{lang.name}</span>
                  </div>
                  {selectedLang === lang.code && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                </button>
              ))}
            </div>

            <button
              onClick={() => onClose(selectedLang)}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-amber-500 to-rose-600 hover:opacity-95 text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-950 transition active:scale-98 mt-2"
            >
              Commencer sur CHAT MALI →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
