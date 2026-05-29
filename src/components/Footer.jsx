import { Link } from 'react-router-dom';
import BrandMark from './BrandMark';
import { company, navigation } from '../data/siteContent';

const socialLinks = [
  { label: 'Instagram', href: '#', icon: 'instagram' },
  { label: 'Facebook', href: '#', icon: 'facebook' },
  { label: 'LinkedIn', href: '#', icon: 'linkedin' },
  { label: 'YouTube', href: '#', icon: 'youtube' },
];

const complianceItems = [
  'ISO 9001 Certified',
  'ISO/IEC 27001 Certified',
  'Privacy Policy',
  'NDA Compliance',
];

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="grid gap-10 lg:grid-cols-[1.25fr,0.65fr,0.85fr,0.9fr]">
          <div className="space-y-4">
            <BrandMark />
            <p className="max-w-md text-sm leading-7 text-slate-100">{company.description}</p>
            <div className="flex flex-wrap gap-3 pt-2">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  title={item.label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-transparent text-white transition hover:-translate-y-0.5 hover:border-forest-300 hover:text-forest-300"
                >
                  <SocialIcon kind={item.icon} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white">Navigation</p>
            <div className="mt-4 grid gap-3 text-sm text-slate-100">
              {navigation.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="transition hover:text-forest-300"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white">Contact</p>
            <div className="mt-4 space-y-3 text-sm leading-7 text-slate-100">
              <p>
                <a href={`mailto:${company.contact.email}`} className="transition hover:text-forest-300">
                  {company.contact.email}
                </a>
              </p>
              <p>
                <a href={`tel:${company.contact.phone.replace(/\s+/g, '')}`} className="transition hover:text-forest-300">
                  {company.contact.phone}
                </a>
              </p>
              <p>{company.contact.hours}</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white">Compliance</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {complianceItems.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-slate-100"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-3 border-t border-white/20 pt-6 text-xs text-slate-100 sm:grid-cols-2 sm:items-center lg:grid-cols-[1fr,auto,1fr]">
          <p>Copyright {currentYear} {company.name}. All rights reserved.</p>
          <p className="uppercase tracking-[0.22em] sm:text-right lg:text-center">
            {company.tagline}
          </p>
          <p className="sm:col-span-2 lg:col-span-1 lg:text-right">
            Designed and developed by{' '}
            <a
              href="https://wa.me/919993013936"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-forest-300"
            >
              Clickmyze Technologies
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ kind }) {
  if (kind === 'instagram') {
    return (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="5" y="5" width="14" height="14" rx="4" />
        <circle cx="12" cy="12" r="3.2" />
        <path d="M16.4 7.8h.01" strokeLinecap="round" />
      </svg>
    );
  }

  if (kind === 'facebook') {
    return (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden="true">
        <path d="M14.2 8.1H16V5.2c-.3 0-1.4-.1-2.6-.1-2.6 0-4.3 1.6-4.3 4.5v2.5H6.2v3.3h2.9V23h3.5v-7.6h2.9l.5-3.3h-3.4V9.9c0-1 .3-1.8 1.6-1.8Z" />
      </svg>
    );
  }

  if (kind === 'linkedin') {
    return (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden="true">
        <path d="M6.9 9.4H3.6V20h3.3V9.4ZM5.3 4.3a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8Zm14.9 9.8c0-3.2-1.7-4.9-4.1-4.9a3.6 3.6 0 0 0-3.2 1.8V9.4H9.7V20H13v-5.6c0-1.5.7-2.4 2-2.4s1.9.9 1.9 2.5V20h3.3v-5.9Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M21.6 7.2a2.8 2.8 0 0 0-2-2C17.9 4.8 12 4.8 12 4.8s-5.9 0-7.6.4a2.8 2.8 0 0 0-2 2A29.3 29.3 0 0 0 2 12a29.3 29.3 0 0 0 .4 4.8 2.8 2.8 0 0 0 2 2c1.7.4 7.6.4 7.6.4s5.9 0 7.6-.4a2.8 2.8 0 0 0 2-2A29.3 29.3 0 0 0 22 12a29.3 29.3 0 0 0-.4-4.8ZM10 15.1V8.9l5.5 3.1-5.5 3.1Z" />
    </svg>
  );
}

export default Footer;
