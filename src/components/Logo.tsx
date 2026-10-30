export function Logo({
  size = 'md',
  showText = true,
  slogan = false,
}: {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showText?: boolean
  slogan?: boolean
}) {
  const sizeMap = {
    sm: { box: 'w-7 h-7', text: 'text-base', wave: 'h-3' },
    md: { box: 'w-10 h-10', text: 'text-xl', wave: 'h-4' },
    lg: { box: 'w-14 h-14', text: 'text-2xl', wave: 'h-6' },
    xl: { box: 'w-20 h-20', text: 'text-3xl', wave: 'h-8' },
  }

  const s = sizeMap[size]

  return (
    <div className="flex items-center gap-3 select-none">
      {/* Mali AI Emblem Icon */}
      <div
        className={`${s.box} relative rounded-2xl flex items-center justify-center p-1 shadow-lg shadow-emerald-950/50 overflow-hidden border border-emerald-500/30 bg-gradient-to-br from-[#0c2419] via-[#081811] to-[#040e0a]`}
      >
        {/* Subtle Mali flag stripe accent in the background */}
        <div className="absolute inset-0 opacity-20 pointer-events-none flex">
          <div className="w-1/3 bg-[#008751] h-full" />
          <div className="w-1/3 bg-[#FCD116] h-full" />
          <div className="w-1/3 bg-[#CE1126] h-full" />
        </div>

        {/* Central SVG symbol: Chat bubble + Soundwave + AI spark */}
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full relative z-10"
        >
          {/* Stylized rounded speech bubble */}
          <path
            d="M8 12C8 7.58172 11.5817 4 16 4H24C28.4183 4 32 7.58172 32 12V22C32 26.4183 28.4183 30 24 30H15L9 35V29.5C8.36873 28.6186 8 27.5342 8 26.3571V12Z"
            fill="url(#maliGradient)"
            stroke="#10b981"
            strokeWidth="1.2"
          />
          {/* Soundwave bars inside bubble */}
          <rect x="13" y="14" width="2" height="6" rx="1" fill="#fef08a" />
          <rect x="17" y="11" width="2" height="12" rx="1" fill="#10b981" />
          <rect x="21" y="9" width="2.2" height="16" rx="1.1" fill="#f59e0b" />
          <rect x="25" y="12" width="2" height="10" rx="1" fill="#e11d48" />

          {/* AI Sparkle */}
          <circle cx="28" cy="8" r="1.5" fill="#fcd116" />

          <defs>
            <linearGradient id="maliGradient" x1="8" y1="4" x2="32" y2="35" gradientUnits="userSpaceOnUse">
              <stop stopColor="#064e2b" stopOpacity="0.9" />
              <stop offset="0.5" stopColor="#082b1c" stopOpacity="0.95" />
              <stop offset="1" stopColor="#02140c" stopOpacity="0.98" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 leading-none">
            <span className={`font-black tracking-tight ${s.text} bg-gradient-to-r from-emerald-400 via-amber-300 to-rose-400 bg-clip-text text-transparent`}>
              CHAT MALI
            </span>
            <span className="text-xs px-1.5 py-0.5 rounded-full font-bold bg-amber-400/10 text-amber-300 border border-amber-400/20">
              🇲🇱 🤖
            </span>
          </div>
          {slogan && (
            <span className="text-[11px] text-emerald-400/80 font-medium tracking-wide mt-0.5">
              Ton ami IA, dans ta langue
            </span>
          )}
        </div>
      )}
    </div>
  )
}
