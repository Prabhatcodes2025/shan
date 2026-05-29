import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import usePageMeta from '../hooks/usePageMeta';
import vrHero from '../assets/vr-hero.jpg';
import aboutVision from '../assets/about-vision.svg';
import globalizationWorkflow from '../assets/globalization-workflow.jpeg';
import sgLogo from '../assets/sg-logo.jpeg';
import { company } from '../data/siteContent';

const serviceCards = [
  {
    icon: 'stack',
    title: 'Transcription',
    copy: 'Fast, accurate audio and video transcription with clean formatting.',
    tags: ['Audio', 'Video', 'Text'],
  },
  {
    icon: 'globe',
    title: 'Translation',
    copy: 'Text, audio, and video translation for business and project content.',
    tags: ['Business', 'Content', 'Review'],
  },
  {
    icon: 'spark',
    title: 'Annotation',
    copy: 'Data labeling for image, video, text, audio, and AI workflows.',
    tags: ['Labeling', 'AI Data', 'Quality'],
  },
  {
    icon: 'shield',
    title: 'Data Collection',
    copy: 'Reliable data collection for training, testing, and research needs.',
    tags: ['Research', 'Datasets', 'Validation'],
  },
];

const aboutStats = [
  { end: 50, suffix: '+', label: 'In-house team' },
  { end: 1500, suffix: '+', label: 'Outsource team' },
  { end: 1, suffix: 'B+', label: 'Words translated' },
  { end: 5000, suffix: 'hr+', label: 'Transcription to date' },
];

const chooseReasons = [
  {
    icon: 'globe',
    title: 'Worldwide Project Support',
    copy: 'Coordinated delivery for translation, transcription, annotation, and data collection across global teams.',
  },
  {
    icon: 'spark',
    title: 'AI Data Expertise',
    copy: 'Structured workflows for multilingual AI data, labeling, review, and dataset preparation.',
  },
  {
    icon: 'shield',
    title: 'High-Quality Results',
    copy: 'Every project moves through clear checks for accuracy, consistency, and delivery readiness.',
  },
  {
    icon: 'stack',
    title: 'Scalable Operations',
    copy: 'Flexible team support for small requests, recurring programs, and high-volume delivery needs.',
  },
  {
    icon: 'globe',
    title: 'Language-Sensitive Delivery',
    copy: 'Content is handled with attention to meaning, market fit, tone, and audience expectations.',
  },
];

function HomePage() {
  usePageMeta('Home');
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/about-us') {
      return undefined;
    }

    const scrollTimer = window.setTimeout(() => {
      document.getElementById('about-company')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 50);

    return () => window.clearTimeout(scrollTimer);
  }, [location.pathname]);

  return (
    <div className="page-frame home-page-frame space-y-20">
      <section className="home-hero animate-rise" style={{ backgroundImage: `url(${vrHero})` }}>
        <div className="home-hero-overlay" />
        <div className="home-hero-content">
          <div className="max-w-2xl space-y-7">
            <span className="eyebrow">Built for global teams</span>

            <div className="space-y-4">
              <h2 className="max-w-[14ch] text-[clamp(2.35rem,4.4vw,4.65rem)] font-semibold leading-[1.04] text-white">
                Translation & Localization Services
              </h2>
              <p className="max-w-xl text-base font-semibold leading-8 text-white sm:text-lg">
                Shan Globalization: Your one-stop AI/ML data partner
              </p>
              <p className="max-w-xl text-sm font-medium leading-7 text-slate-100 sm:text-base">
                {company.heroStatement} Translation, localization, QA, and AI data support in one
                coordinated flow.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link to="/services" className="btn-primary">
                Know more
              </Link>
              <Link to="/contact-us" className="btn-secondary">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="services-band">
        <div className="space-y-10">
          <div className="mx-auto max-w-3xl space-y-4 text-center">
            <span className="eyebrow">Services</span>
            <h2 className="text-4xl font-semibold leading-tight tracking-[-0.04em] text-white sm:text-5xl">
              Services we offer for you
            </h2>
            <p className="mx-auto max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
              A compact service mix for teams entering new markets or managing ongoing multilingual
              work.
            </p>
            <Link to="/services" className="btn-secondary">
              See All Services
            </Link>
          </div>

          <div className="services-carousel" aria-label="Services carousel">
            <div className="services-carousel-track">
              {[...serviceCards, ...serviceCards].map((service, index) => (
                <article key={`${service.title}-${index}`} className="service-card service-slide">
                  <div className="service-card-icon">
                    <ServiceIcon kind={service.icon} />
                  </div>
                  <p className="mt-8 text-2xl font-semibold text-white">
                    {service.title}
                  </p>
                  <p className="mx-auto mt-5 max-w-[28ch] text-sm font-medium leading-6 text-white">
                    {service.copy}
                  </p>
                  <div className="mt-5 flex flex-wrap justify-center gap-2">
                    {service.tags.map((tag) => (
                      <span key={tag} className="outline-chip">
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>

          <article className="media-card">
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
                <div className="media-image-surface">
                  <img
                    src={globalizationWorkflow}
                    alt="Globalization language network illustration"
                    className="media-image"
                  />
                  <div className="media-image-overlay" />
                </div>
                <div className="preview-scanline" />
                <div className="preview-tag">
                  <span className="signal-dot" />
                  Delivery workflow
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section id="about-company" className="about-company">
        <div className="about-company-inner">
          <div className="about-company-copy">
            <p className="text-sm font-semibold uppercase text-sky-600">About Company</p>
            <h2 className="mt-6 text-4xl font-bold leading-tight text-black sm:text-5xl">
              Who we are?
            </h2>
            <div className="mt-6 space-y-5 text-base font-medium leading-8 text-black">
              <p>
                At <strong>Shan Globalization</strong>, we are a trusted AI data and localization
                service provider delivering high-quality language, data, and evaluation solutions
                for global businesses, AI companies, and growing enterprises.
              </p>
              <p>
                Founded in 2022 with a small freelance team, we successfully managed and delivered
                large-scale projects with accuracy, reliability, and on-time execution, helping
                clients build scalable and efficient AI-driven workflows.
              </p>
              <p>
                Our core services include <strong>Translation &amp; Transcription</strong>,{' '}
                <strong>Data Collection</strong>, <strong>Data Annotation</strong>,{' '}
                <strong>AI Training &amp; Quality Analysis</strong>, and{' '}
                <strong>Search Engine Evaluation &amp; Rating</strong> for search results, ads,
                maps, apps, and online content.
              </p>
              <p>
                We are committed to maintaining international quality and security standards and
                are proudly <strong>ISO 9001</strong> and <strong>ISO/IEC 27001 Certified</strong>,
                ensuring reliable processes, data protection, and professional project management.
              </p>
            </div>
            {/* <Link to="/about-us" className="about-company-button">
              Know more
            </Link> */}
          </div>

          <div className="about-company-image-wrap">
            <img
              src={aboutVision}
              alt="Shan Globalization company overview"
              className="about-company-image"
            />
          </div>
        </div>

        <div className="about-company-stats">
          {aboutStats.map((item) => (
            <div key={item.label} className="about-company-stat">
              <AnimatedStat end={item.end} suffix={item.suffix} />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="choose-section">
        <div className="choose-section-inner">
          <div className="choose-title-block">
            <p className="text-sm font-semibold uppercase text-white">Why shan globalization</p>
            <h2>Choosing Shan Globalization for language solutions can be your best decision</h2>
            {/* <div className="choose-zigzag" aria-hidden="true" /> */}
          </div>

          {chooseReasons.map((reason) => (
            <article key={reason.title} className="choose-card">
              <div className="choose-icon-tile">
                <ChooseIcon kind={reason.icon} />
              </div>
              <div>
                <h3>{reason.title}</h3>
                <div className="choose-card-line" />
                <p>{reason.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="brand-services-section">
        <div className="brand-services-inner">
          <div className="brand-services-logo">
            <img src={sgLogo} alt="Shan Globalization logo" />
          </div>

          <div className="brand-services-copy">
            <h2>Translation, AI Data Collection, And AI Services</h2>
            <p>
              Shan Globalization helps teams manage multilingual content, transcription,
              annotation, and data collection with dependable coordination and quality-focused
              delivery.
            </p>
            <p>
              Our workflows support AI/ML training data needs, global communication, and recurring
              language operations with accuracy, speed, and clear ownership.
            </p>
            <Link to="/services" className="btn-primary">
              Checkout our Services
            </Link>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr,auto] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-black/70">Next step</p>
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

function AnimatedStat({ end, suffix }) {
  const [value, setValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const statRef = useRef(null);

  useEffect(() => {
    const element = statRef.current;

    if (!element) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated) {
          return;
        }

        setHasAnimated(true);
        const duration = 1400;
        const start = performance.now();

        const animate = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue(Math.round(end * eased));

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };

        requestAnimationFrame(animate);
        observer.disconnect();
      },
      { threshold: 0.35 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [end, hasAnimated]);

  return (
    <p ref={statRef}>
      {new Intl.NumberFormat('en-US').format(value)}
      {suffix}
    </p>
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

function ChooseIcon({ kind }) {
  if (kind === 'globe') {
    return (
      <svg viewBox="0 0 96 96" className="choose-premium-icon" role="img" aria-hidden="true">
        <defs>
          <radialGradient id="choose-globe-ocean" cx="38%" cy="26%" r="68%">
            <stop offset="0%" stopColor="#efffff" />
            <stop offset="38%" stopColor="#28d5d4" />
            <stop offset="100%" stopColor="#087c91" />
          </radialGradient>
          <linearGradient id="choose-globe-land" x1="18%" y1="20%" x2="82%" y2="84%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#d8f8f4" />
          </linearGradient>
        </defs>
        <circle cx="48" cy="48" r="31" fill="url(#choose-globe-ocean)" />
        <path
          d="M29 34c7-8 18-12 28-7 6 3 4 9-1 11-4 2-8-1-11 2-2 2 0 6-4 7-5 1-9-5-14-1-4 3-7-5 2-12Zm29 18c7-1 11 5 8 12-3 6-10 10-17 10-5 0-5-6-2-9 3-4 2-12 11-13Z"
          fill="url(#choose-globe-land)"
          opacity="0.95"
        />
        <path d="M20 48h56M48 17c-9 9-13 20-13 31s4 22 13 31M48 17c9 9 13 20 13 31s-4 22-13 31" fill="none" stroke="#dffcff" strokeWidth="3" opacity="0.5" />
        <circle cx="37" cy="27" r="8" fill="#fff" opacity="0.32" />
      </svg>
    );
  }

  if (kind === 'spark') {
    return (
      <svg viewBox="0 0 96 96" className="choose-premium-icon" role="img" aria-hidden="true">
        <defs>
          <linearGradient id="choose-spark-a" x1="18%" y1="16%" x2="82%" y2="84%">
            <stop offset="0%" stopColor="#ffb000" />
            <stop offset="48%" stopColor="#ff6b4a" />
            <stop offset="100%" stopColor="#35d7e6" />
          </linearGradient>
          <linearGradient id="choose-spark-b" x1="25%" y1="18%" x2="78%" y2="82%">
            <stop offset="0%" stopColor="#53f36d" />
            <stop offset="100%" stopColor="#3569ff" />
          </linearGradient>
        </defs>
        <circle cx="48" cy="48" r="29" fill="none" stroke="url(#choose-spark-a)" strokeWidth="14" strokeLinecap="round" strokeDasharray="92 96" />
        <circle cx="48" cy="48" r="29" fill="none" stroke="url(#choose-spark-b)" strokeWidth="14" strokeLinecap="round" strokeDasharray="58 130" strokeDashoffset="-88" />
        <circle cx="48" cy="48" r="14" fill="#ffffff" />
        <path d="m70 25 3 8 8 3-8 3-3 8-3-8-8-3 8-3 3-8Z" fill="#7dfcff" />
      </svg>
    );
  }

  if (kind === 'shield') {
    return (
      <svg viewBox="0 0 96 96" className="choose-premium-icon" role="img" aria-hidden="true">
        <defs>
          <linearGradient id="choose-shield-a" x1="20%" y1="12%" x2="82%" y2="90%">
            <stop offset="0%" stopColor="#34e6ff" />
            <stop offset="52%" stopColor="#2a87ff" />
            <stop offset="100%" stopColor="#6d5bff" />
          </linearGradient>
        </defs>
        <path d="M48 15 73 24v21c0 17-10 29-25 36-15-7-25-19-25-36V24l25-9Z" fill="url(#choose-shield-a)" />
        <path d="M48 24 64 30v15c0 11-6 19-16 25-10-6-16-14-16-25V30l16-6Z" fill="#fff" opacity="0.2" />
        <path d="m36 48 8 8 17-19" fill="none" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="39" cy="29" r="6" fill="#fff" opacity="0.25" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 96 96" className="choose-premium-icon" role="img" aria-hidden="true">
      <defs>
        <linearGradient id="choose-stack-a" x1="24%" y1="12%" x2="76%" y2="88%">
          <stop offset="0%" stopColor="#46f06b" />
          <stop offset="50%" stopColor="#31c6ff" />
          <stop offset="100%" stopColor="#3067ff" />
        </linearGradient>
      </defs>
      <rect x="23" y="20" width="50" height="15" rx="5" fill="url(#choose-stack-a)" />
      <rect x="23" y="40" width="50" height="15" rx="5" fill="url(#choose-stack-a)" opacity="0.86" />
      <rect x="23" y="60" width="50" height="15" rx="5" fill="url(#choose-stack-a)" opacity="0.72" />
      <circle cx="34" cy="27.5" r="3" fill="#ffffff" />
      <circle cx="34" cy="47.5" r="3" fill="#ffffff" />
      <circle cx="34" cy="67.5" r="3" fill="#ffffff" />
    </svg>
  );
}

export default HomePage;
