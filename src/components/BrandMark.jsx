import sgLogo from '../assets/sg-logo.jpeg';

function BrandMark({ compact = false }) {
  return (
    <div className="flex items-center gap-3">
      <img
        src={sgLogo}
        alt="Shan Globalization logo"
        className="h-12 w-12 rounded-2xl border border-white/10 object-cover shadow-[0_20px_42px_-24px_rgba(0,0,0,0.48)]"
      />

      {!compact && (
        <div>
          <p className="font-display text-2xl font-semibold leading-none">
            <span className="block">
              <span className="text-white">S</span>
              <span className="text-[var(--sg-green)]">han</span>
            </span>
            <span className="block">
              <span className="text-[var(--sg-green)]">G</span>
              <span className="text-white">lobalization</span>
            </span>
          </p>
        </div>
      )}
    </div>
  );
}

export default BrandMark;
