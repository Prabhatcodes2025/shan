import { Link } from 'react-router-dom';
import usePageMeta from '../hooks/usePageMeta';
import techWorkspace from '../assets/tech-workspace.svg';
import globalNetwork from '../assets/global-network.svg';
import servicesFlow from '../assets/services-flow.svg';
import { company, metrics, processSteps, values } from '../data/siteContent';

const heroChips = ['Localization', 'Translation', 'AI Data', 'QA'];

const heroHighlights = [
  { label: 'Availability', value: '24/7 coordination' },
  { label: 'Focus', value: 'Translation to release' },
];

const serviceCards = [
  {
    icon: 'globe',
    title: 'Localization',
    copy: 'Website, product, and campaign content for new markets.',
    tags: ['Web', 'Product', 'Launch'],
  },
  {
    icon: 'shield',
    title: 'Translation QA',
    copy: 'Review pipelines built for clarity and consistency.',
    tags: ['QA', 'Review', 'Tone'],
  },
  {
    icon: 'spark',
    title: 'AI Data Support',
    copy: 'Multilingual annotation and evaluation for AI teams.',
    tags: ['Labeling', 'Evaluation', 'Refinement'],
  },
  {
    icon: 'stack',
    title: 'Managed Ops',
    copy: 'A steady external layer for recurring multilingual work.',
    tags: ['Reporting', 'Coordination', 'Delivery'],
  },
];

function HomePage() {
  usePageMeta('Home');

  return (
    <div className="page-frame space-y-20">
      <section className="page-hero animate-rise">
        <div className="grid gap-12 xl:grid-cols-[0.9fr,1.1fr] xl:items-center">
          <div className="space-y-7">
            <span className="eyebrow">Built for global teams</span>

            <div className="space-y-4">
              <h1 className="max-w-[9ch] text-[clamp(2.8rem,4.9vw,5.2rem)] font-semibold leading-[0.92] tracking-[-0.05em] text-white">
                Clear multilingual support.
              </h1>
              <p className="max-w-lg text-sm leading-7 text-slate-300 sm:text-base">
                {company.heroStatement} Translation, localization, QA, and AI data support in one
                coordinated flow.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link to="/services" className="btn-primary">
                View Services
              </Link>
              <Link to="/contact-us" className="btn-secondary">
                Contact Us
              </Link>
            </div>

            <div className="flex flex-wrap gap-3">
              {heroChips.map((item) => (
                <span key={item} className="outline-chip">
                  {item}
                </span>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {metrics.map((item) => (
                <div key={item.label} className="metric-card">
                  <p className="text-3xl font-semibold text-white">{item.value}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="tech-stage">
            <div className="preview-surface">
              <img
                src={techWorkspace}
                alt="Coordinated multilingual workflow illustration"
                className="h-[320px] w-full rounded-[24px] object-cover sm:h-[390px]"
              />

              <div className="floating-badge floating-badge-left drift-card">
                <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400">Stage</p>
                <p className="mt-2 text-sm font-medium text-white">One clear delivery lane</p>
              </div>

              <div className="floating-badge floating-badge-right drift-card-delayed">
                <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400">Output</p>
                <p className="mt-2 text-sm font-medium text-white">Translation, QA, release</p>
              </div>

              <div className="preview-play">
                <span className="play-orb">
                  <span className="play-triangle" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-300">Preview</p>
                  <p className="mt-1 text-sm font-medium text-white">Workflow snapshot</p>
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {heroHighlights.map((item) => (
                <article key={item.label} className="minimal-card p-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-sky-300">{item.label}</p>
                  <p className="mt-3 text-lg font-semibold leading-7 text-white">{item.value}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-surface">
        <div className="grid gap-8 lg:grid-cols-[0.78fr,1.22fr] lg:items-start">
          <div className="space-y-4">
            <span className="eyebrow">Services</span>
            <h2 className="max-w-lg text-4xl font-semibold leading-tight tracking-[-0.04em] text-white sm:text-5xl">
              Four focused service lines.
            </h2>
            <p className="max-w-md text-sm leading-7 text-slate-300 sm:text-base">
              A compact service mix for teams entering new markets or managing ongoing multilingual
              work.
            </p>
            <Link to="/services" className="btn-secondary">
              See All Services
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {serviceCards.map((service) => (
              <article key={service.title} className="minimal-card">
                <div className="icon-badge">
                  <ServiceIcon kind={service.icon} />
                </div>
                <p className="mt-5 text-sm uppercase tracking-[0.22em] text-sky-300">
                  {service.title}
                </p>
                <p className="mt-4 text-2xl font-semibold leading-tight text-white">
                  {service.copy}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span key={tag} className="outline-chip">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}

            <article className="media-card md:col-span-2">
              <div className="grid gap-6 lg:grid-cols-[0.92fr,1.08fr] lg:items-center">
                <div className="space-y-4">
                  <span className="eyebrow">Workflow</span>
                  <h3 className="max-w-md text-3xl font-semibold leading-tight tracking-[-0.04em] text-white">
                    Simple, visible, coordinated.
                  </h3>
                  <p className="max-w-lg text-sm leading-7 text-slate-300">
                    We keep scoping, production, review, and delivery in one clean structure.
                  </p>
                  <Link to="/contact-us" className="btn-primary">
                    Start a Project
                  </Link>
                </div>

                <div className="media-preview media-preview-animated">
                  <div
                    className="media-image-surface"
                    style={{
                      backgroundImage: `linear-gradient(135deg, rgba(8,16,28,0.16), rgba(8,16,28,0.56)), url(${servicesFlow})`,
                    }}
                  />
                  <div className="preview-scanline" />
                  <div className="preview-tag">
                    <span className="signal-dot" />
                    Delivery workflow
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.96fr,1.04fr] lg:items-start">
        <article className="glass-panel overflow-hidden p-0">
          <div className="border-b border-white/10 px-8 py-8">
            <span className="eyebrow">Process</span>
            <h2 className="mt-5 max-w-xl text-4xl font-semibold leading-tight tracking-[-0.04em] text-white sm:text-5xl">
              A lean process with clear checkpoints.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
              Fewer layers, better visibility, stronger delivery confidence.
            </p>
          </div>

          <div className="p-5">
            <img
              src={globalNetwork}
              alt="Connected delivery network illustration"
              className="h-[320px] w-full rounded-[24px] border border-white/10 bg-[#091321] p-4 object-contain"
            />
          </div>
        </article>

        <div className="grid gap-4">
          {processSteps.map((item) => (
            <article key={item.step} className="minimal-card">
              <div className="flex items-center gap-4">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-sm font-semibold text-sky-300">
                  {item.step}
                </span>
                <p className="text-2xl font-semibold text-white">{item.title}</p>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-300">{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-10">
        <div className="space-y-4">
          <span className="eyebrow">Why SG</span>
          <h2 className="section-title max-w-3xl">Small team. Clear standards.</h2>
          <p className="section-copy max-w-2xl">
            We keep the experience focused: fewer claims, clearer execution, and stronger quality
            control.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {values.map((value, index) => (
            <article key={value.title} className="minimal-card">
              <div className="icon-badge">
                <ValueIcon index={index} />
              </div>
              <span className="mt-5 inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-slate-400">
                0{index + 1}
              </span>
              <p className="mt-5 text-2xl font-semibold leading-tight text-white">{value.title}</p>
              <p className="mt-4 text-sm leading-7 text-slate-300">{value.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cta-band">
        <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr,auto] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-sky-200/80">Next step</p>
            <p className="mt-4 max-w-2xl text-4xl font-semibold leading-tight tracking-[-0.04em]">
              Start with a short conversation and build the right multilingual setup for your team.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link to="/contact-us" className="btn-primary">
              Contact Us
            </Link>
            <Link to="/services" className="btn-secondary">
              View Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function ServiceIcon({ kind }) {
  if (kind === 'globe') {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="8" />
        <path d="M4 12h16M12 4a14 14 0 0 1 0 16M12 4a14 14 0 0 0 0 16" />
      </svg>
    );
  }

  if (kind === 'shield') {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 3 18 5v6c0 4.2-2.3 7.2-6 9-3.7-1.8-6-4.8-6-9V5l6-2Z" />
        <path d="m9.5 12 1.7 1.7 3.3-3.7" />
      </svg>
    );
  }

  if (kind === 'spark') {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="m12 3 1.9 4.8L19 9.7l-4.2 2.9L16 18l-4-2.7L8 18l1.2-5.4L5 9.7l5.1-1.9L12 3Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="4" y="5" width="16" height="4" rx="1.6" />
      <rect x="4" y="10" width="16" height="4" rx="1.6" />
      <rect x="4" y="15" width="16" height="4" rx="1.6" />
    </svg>
  );
}

function ValueIcon({ index }) {
  const icons = [
    <path key="a" d="M12 3 4 7v5c0 4.4 2.7 7.2 8 9 5.3-1.8 8-4.6 8-9V7l-8-4Z" />,
    <path key="b" d="M6 12c1.7-4 4.1-6 6-6s4.3 2 6 6c-1.7 4-4.1 6-6 6s-4.3-2-6-6Zm6-2.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z" />,
    <path key="c" d="M5 16h14M7 12h10M9 8h6" />,
  ];

  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      {icons[index]}
    </svg>
  );
}

export default HomePage;
