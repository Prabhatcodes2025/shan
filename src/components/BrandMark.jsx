import { useId } from 'react';

function BrandMark({ compact = false }) {
  const gradientId = useId();

  return (
    <div className="flex items-center gap-3">
      <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] shadow-[0_20px_42px_-24px_rgba(0,0,0,0.48)] backdrop-blur-xl">
        <div className="absolute inset-1 rounded-[14px] bg-gradient-to-br from-white/10 via-transparent to-forest-400/10" />
        <svg viewBox="0 0 72 72" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#84da81" />
              <stop offset="55%" stopColor="#55ed71" />
              <stop offset="100%" stopColor="#34a8ff" />
            </linearGradient>
          </defs>
          <path
            d="M36 5 58 18v25L36 67 14 54V18L36 5Z"
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="2.5"
            opacity="0.95"
          />
          <circle cx="46" cy="25" r="8" fill="rgba(52,168,255,0.14)" />
        </svg>
        <span className="relative z-10 bg-gradient-to-r from-forest-200 via-forest-300 to-sky-300 bg-clip-text text-lg font-bold text-transparent">
          SG
        </span>
      </div>

      {!compact && (
        <div>
          <p className="font-display text-2xl font-semibold leading-none text-white">Shan Globalization</p>
          <p className="mt-1 text-[11px] uppercase tracking-[0.28em] text-slate-400">
            Language • Localization • AI Ops
          </p>
        </div>
      )}
    </div>
  );
}

export default BrandMark;
