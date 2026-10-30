import { Volume2, Globe2, MessageSquare, ArrowLeftRight, Settings, Sparkles, Mic } from 'lucide-react'
import { Logo } from './Logo'
import type { Voice } from '@/lib/fixtures'

interface NavbarProps {
  currentVoice: Voice
  isBambaraMode: boolean
  onToggleBambaraMode: () => void
  onOpenVoicePicker: () => void
  onOpenLiveVoice: () => void
  onOpenTranslator: () => void
  onOpenHistory: () => void
  onOpenSettings: () => void
  currentLanguageCode: string
  onOpenOnboarding: () => void
}

export function Navbar({
  currentVoice,
  isBambaraMode,
  onToggleBambaraMode,
  onOpenVoicePicker,
  onOpenLiveVoice,
  onOpenTranslator,
  onOpenHistory,
  onOpenSettings,
  currentLanguageCode,
  onOpenOnboarding,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#08100C]/90 backdrop-blur-md border-b border-emerald-500/20 px-3 sm:px-6 py-2.5">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <Logo size="md" showText={true} slogan={false} />
        </div>

        {/* Action Center */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Bambara Mode Badge Toggle */}
          <button
            onClick={onToggleBambaraMode}
            className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border shadow-sm ${
              isBambaraMode
                ? 'bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 text-white border-emerald-400 shadow-emerald-950 animate-pulse'
                : 'bg-slate-900/80 text-emerald-400 border-emerald-500/30 hover:border-emerald-500/70 hover:bg-slate-800'
            }`}
            title="Activer le mode 100% Bambara"
          >
            <span>🇲🇱</span>
            <span className="hidden sm:inline">MODE</span> BAMBARA
            {isBambaraMode && <span className="w-2 h-2 rounded-full bg-amber-400 inline-block animate-ping" />}
          </button>

          {/* Quick Live Voice Mode Launcher */}
          <button
            onClick={onOpenLiveVoice}
            className="px-2.5 sm:px-3.5 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 flex items-center gap-1.5 shadow-md shadow-amber-950/40 transition active:scale-95"
            title="Démarrer la conversation vocale en continu"
          >
            <Mic className="w-3.5 h-3.5 fill-current animate-pulse" />
            <span className="hidden md:inline">Conversation</span> Live
          </button>

          {/* Voice Selector Pill */}
          <button
            onClick={onOpenVoicePicker}
            className="px-2 sm:px-2.5 py-1.5 rounded-xl text-xs font-medium bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/40 text-slate-200 flex items-center gap-1.5 transition"
            title="Changer de voix"
          >
            <span
              className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
              style={{ backgroundColor: currentVoice.accentColor }}
            >
              {currentVoice.avatar}
            </span>
            <span className="hidden sm:inline">{currentVoice.name}</span>
          </button>

          {/* Translator Tool Trigger */}
          <button
            onClick={onOpenTranslator}
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl text-xs font-medium bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/40 text-slate-300 flex items-center gap-1 transition"
            title="Ouvrir le traducteur Bambara"
          >
            <ArrowLeftRight className="w-4 h-4 text-emerald-400" />
            <span className="hidden lg:inline">Traducteur</span>
          </button>

          {/* History Trigger */}
          <button
            onClick={onOpenHistory}
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl text-xs font-medium bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/40 text-slate-300 flex items-center gap-1 transition"
            title="Historique des conversations"
          >
            <MessageSquare className="w-4 h-4 text-amber-400" />
            <span className="hidden lg:inline">Historique</span>
          </button>

          {/* Settings Trigger */}
          <button
            onClick={onOpenSettings}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-800 transition"
            title="Paramètres & Profil"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Guide / Onboarding Trigger */}
          <button
            onClick={onOpenOnboarding}
            className="hidden sm:flex p-1.5 rounded-xl text-slate-400 hover:text-amber-300 bg-slate-900/60 hover:bg-slate-800 border border-slate-800/80 transition"
            title="Revoir le guide de bienvenue"
          >
            <Sparkles className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  )
}
