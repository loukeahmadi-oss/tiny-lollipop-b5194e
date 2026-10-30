import { useState } from 'react'
import {
  User,
  Brain,
  Sliders,
  Shield,
  Volume2,
  Globe2,
  X,
  Check,
  Sparkles,
  Wifi,
  Moon,
} from 'lucide-react'
import { LANGUAGES, VOICES, type Voice } from '@/lib/fixtures'

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
  currentVoice: Voice
  onSelectVoice: (v: Voice) => void
  languageCode: string
  onSelectLanguage: (code: string) => void
  userName: string
  onUpdateUserName: (name: string) => void
  assistantName: string
  onUpdateAssistantName: (name: string) => void
  aiMemoryEnabled: boolean
  onToggleAiMemory: (enabled: boolean) => void
  voiceSpeed: number
  onChangeVoiceSpeed: (speed: number) => void
}

export function SettingsModal({
  isOpen,
  onClose,
  currentVoice,
  onSelectVoice,
  languageCode,
  onSelectLanguage,
  userName,
  onUpdateUserName,
  assistantName,
  onUpdateAssistantName,
  aiMemoryEnabled,
  onToggleAiMemory,
  voiceSpeed,
  onChangeVoiceSpeed,
}: SettingsModalProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'voice' | 'memory' | 'about'>('profile')

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-xl bg-[#0F1713] border border-emerald-500/30 rounded-3xl p-5 sm:p-6 shadow-2xl shadow-emerald-950/70 overflow-hidden flex flex-col max-h-[90vh] text-white">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-emerald-500/20">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Paramètres & Profil</h2>
              <p className="text-xs text-slate-400">Personnalise ton compagnon CHAT MALI</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 py-3 border-b border-slate-800/80 overflow-x-auto text-xs font-semibold">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'profile'
                ? 'bg-emerald-600 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className="w-3.5 h-3.5" /> Mon Profil
          </button>
          <button
            onClick={() => setActiveTab('voice')}
            className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'voice'
                ? 'bg-emerald-600 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Volume2 className="w-3.5 h-3.5" /> Voix & Parole
          </button>
          <button
            onClick={() => setActiveTab('memory')}
            className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'memory'
                ? 'bg-emerald-600 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Brain className="w-3.5 h-3.5" /> Mémoire IA
          </button>
          <button
            onClick={() => setActiveTab('about')}
            className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'about'
                ? 'bg-emerald-600 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Shield className="w-3.5 h-3.5" /> Confidentialité & À propos
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto py-3 space-y-4 pr-1 text-xs sm:text-sm">
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-emerald-500/20 border border-amber-500/40 flex items-center justify-center text-xl font-bold text-amber-300">
                  {userName ? userName[0].toUpperCase() : 'U'}
                </div>
                <div className="flex-1">
                  <label className="text-[11px] text-slate-400 font-medium block">
                    Ton prénom (utilisé par CHAT MALI)
                  </label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => onUpdateUserName(e.target.value)}
                    placeholder="Ahmed"
                    className="mt-1 w-full px-3 py-1.5 bg-black/50 border border-slate-700 rounded-xl text-white font-semibold text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                <label className="text-xs font-semibold text-slate-200 block">
                  Nom donné à ton compagnon IA
                </label>
                <div className="flex gap-2">
                  {['Awa', 'Moussa', 'CHAT MALI'].map((name) => (
                    <button
                      key={name}
                      onClick={() => onUpdateAssistantName(name)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
                        assistantName === name
                          ? 'border-emerald-500 bg-emerald-500/20 text-white'
                          : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                  <Globe2 className="w-4 h-4 text-emerald-400" /> Langue de prédilection
                </label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {LANGUAGES.slice(0, 4).map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => onSelectLanguage(lang.code)}
                      className={`p-2.5 rounded-xl border flex items-center justify-between text-xs transition ${
                        languageCode === lang.code
                          ? 'border-emerald-500 bg-emerald-500/20 text-white font-bold'
                          : 'border-slate-800 bg-slate-950 text-slate-400'
                      }`}
                    >
                      <span>
                        {lang.flag} {lang.name}
                      </span>
                      {languageCode === lang.code && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'voice' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-200">Voix sélectionnée</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                    {currentVoice.name} ({currentVoice.style})
                  </span>
                </div>
                <p className="text-xs text-slate-400">{currentVoice.description}</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-200">Vitesse d’élocution</span>
                  <span className="text-amber-300 font-mono font-bold">{voiceSpeed.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.7"
                  max="1.3"
                  step="0.05"
                  value={voiceSpeed}
                  onChange={(e) => onChangeVoiceSpeed(parseFloat(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>Posée (0.7x)</span>
                  <span>Normale (1.0x)</span>
                  <span>Rapide (1.3x)</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'memory' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start justify-between gap-4">
                <div>
                  <h4 className="font-bold text-slate-200 text-sm flex items-center gap-2">
                    <Brain className="w-4 h-4 text-emerald-400" />
                    Mémoire personnalisée de l’IA
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Permet à CHAT MALI de se souvenir de ton prénom (« {userName} »), de ta langue
                    favorite, de tes objectifs d’études ou de travail pour ne pas avoir à tout
                    répéter à chaque fois.
                  </p>
                </div>
                <button
                  onClick={() => onToggleAiMemory(!aiMemoryEnabled)}
                  className={`w-12 h-6 rounded-full transition p-0.5 flex items-center ${
                    aiMemoryEnabled ? 'bg-emerald-600 justify-end' : 'bg-slate-700 justify-start'
                  }`}
                >
                  <div className="w-5 h-5 rounded-full bg-white shadow-md" />
                </button>
              </div>

              <div className="p-3.5 rounded-2xl bg-black/40 border border-slate-800 text-xs text-slate-400 space-y-1.5">
                <p className="font-semibold text-amber-300 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Données retenues :
                </p>
                <ul className="list-disc list-inside space-y-0.5 text-[11px]">
                  <li>Prénom : {userName}</li>
                  <li>Langue préférée : Bambara / Français</li>
                  <li>Voix active : {currentVoice.name}</li>
                  <li>Style de ton : Chaleureux, respectueux et direct</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'about' && (
            <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
              <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                <span className="font-bold text-white text-sm block">À propos de CHAT MALI</span>
                <p>
                  CHAT MALI est conçu pour être le compagnon numérique d'Afrique et du monde entier,
                  qui s’adapte aux langues locales avec le Bambara comme cœur culturel.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                <span className="font-bold text-slate-200 block flex items-center gap-1.5">
                  <Wifi className="w-4 h-4 text-amber-400" /> Connectivité et Mode Hors-ligne
                </span>
                <p className="text-slate-400 text-[11px]">
                  « Cette fonctionnalité d'IA avancée nécessite une connexion Internet active pour la
                  génération de texte et la synthèse multilingue. »
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
                <span className="font-bold text-slate-200 block">Sécurité & Confidentialité</span>
                <p className="text-slate-400 text-[11px]">
                  Tes données de conversations restent sous ton contrôle total. Tu peux réinitialiser
                  ou supprimer tes échanges à tout instant.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-emerald-500/20 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  )
}
