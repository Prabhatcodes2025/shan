import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import BrandMark from './BrandMark';
import { navigation } from '../data/siteContent';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const navClassName = ({ isActive }) =>
    [
      'rounded-full px-4 py-2 text-sm font-medium transition',
      isActive
        ? 'bg-gradient-to-r from-forest-300 via-forest-400 to-sky-400 text-ink-950 shadow-[0_18px_34px_-18px_rgba(52,168,255,0.42)]'
        : 'text-slate-300 hover:bg-white/[0.06] hover:text-white',
    ].join(' ');

  return (
    <header className="sticky top-0 z-50 px-4 py-4 sm:px-6">
      <div className="mx-auto max-w-7xl rounded-[28px] border border-white/10 bg-ink-950/72 px-4 py-3 shadow-[0_22px_60px_-36px_rgba(0,0,0,0.68)] backdrop-blur-2xl sm:px-6">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" aria-label="Shan Globalization homepage">
            <BrandMark />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navigation.map((item) => (
              <NavLink key={item.path} to={item.path} className={navClassName}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Link to="/contact-us" className="btn-primary">
              Start a Conversation
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-slate-100 transition hover:border-forest-300/40 hover:text-white lg:hidden"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
          >
            <span className="relative h-4 w-5">
              <span
                className={`absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current transition ${
                  menuOpen ? 'translate-y-[7px] rotate-45' : ''
                }`}
              />
              <span
                className={`absolute left-0 top-[7px] h-0.5 w-5 rounded-full bg-current transition ${
                  menuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`absolute left-0 top-[14px] h-0.5 w-5 rounded-full bg-current transition ${
                  menuOpen ? '-translate-y-[7px] -rotate-45' : ''
                }`}
              />
            </span>
          </button>
        </div>

        {menuOpen && (
          <div className="mt-4 grid gap-2 border-t border-white/10 pt-4 lg:hidden">
            {navigation.map((item) => (
              <NavLink key={item.path} to={item.path} className={navClassName}>
                {item.label}
              </NavLink>
            ))}
            <Link to="/contact-us" className="btn-primary mt-2">
              Start a Conversation
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
