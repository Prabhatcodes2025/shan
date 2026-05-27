import { Link } from 'react-router-dom';
import BrandMark from './BrandMark';
import { company, navigation } from '../data/siteContent';

function Footer() {
  return (
    <footer className="py-10">
      <div className="container-shell">
        <div className="glass-panel px-6 py-8 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.2fr,0.8fr,0.9fr]">
            <div className="space-y-4">
              <BrandMark />
              <p className="max-w-md text-sm leading-7 text-slate-300">{company.description}</p>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Navigation</p>
              <div className="mt-4 grid gap-3 text-sm text-slate-300">
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
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Contact</p>
              <div className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
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
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs uppercase tracking-[0.22em] text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p>{company.name}</p>
            <p>{company.tagline}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
