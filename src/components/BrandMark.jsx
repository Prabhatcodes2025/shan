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
            <span className="block text-[var(--sg-green)]">Shan</span>
            <span className="block text-white">Globalization</span>
          </p>
        </div>
      )}
    </div>
  );
}

export default BrandMark;
