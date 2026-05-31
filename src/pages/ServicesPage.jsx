import { Link } from 'react-router-dom';
import usePageMeta from '../hooks/usePageMeta';
import servicesHeroBg from '../assets/services-hero-bg.jpg';

const serviceCards = [
  {
    title: 'Translation',
    icon: 'broadcast',
    kicker: 'Language precision',
    copy:
      'Context-aware multilingual translation for business, technical, digital, and customer-facing content.',
    points: ['Terminology control', 'Human review', 'Market-ready tone'],
  },
  {
    title: 'Transcription',
    icon: 'message',
    kicker: 'Speech to structure',
    copy:
      'Readable audio and video transcripts prepared for media, research, operations, and AI pipelines.',
    points: ['Speaker labels', 'Timestamp options', 'Clean formatting'],
  },
  {
    title: 'Data Collection',
    icon: 'database',
    kicker: 'AI-ready datasets',
    copy:
      'Large-scale text, image, audio, video, and web datasets gathered around clear project criteria.',
    points: ['Custom sourcing', 'Quality checks', 'Delivery control'],
  },
  {
    title: 'Search Engine Evaluation & Rating',
    icon: 'search',
    kicker: 'Relevance quality',
    copy:
      'Evaluation for search results, ads, maps, apps, websites, online content, and AI responses.',
    points: ['Rating guidelines', 'Accuracy review', 'User intent focus'],
  },
  {
    title: 'AI Training & Quality Analysis',
    icon: 'bot',
    kicker: 'Model improvement',
    copy:
      'Data preparation, validation, quality analysis, and model evaluation for stronger AI systems.',
    points: ['Validation loops', 'Output review', 'QA reporting'],
  },
  {
    title: 'Annotation',
    icon: 'annotation',
    kicker: 'Structured labeling',
    copy:
      'Precise image, video, text, and audio annotation for training data that needs reliable structure.',
    points: ['Bounding boxes', 'Segmentation', 'Text and audio tags'],
  },
];

const serviceStats = [
  { value: '01', label: 'Scope mapped before production' },
  { value: '02', label: 'Specialist delivery teams assigned' },
  { value: '03', label: 'QA checks before final handoff' },
];

const workflowSteps = [
  {
    title: 'Brief',
    copy: 'We clarify content type, languages, guidelines, volume, and delivery expectations.',
  },
  {
    title: 'Build',
    copy: 'The right team runs production with shared terminology, instructions, and review gates.',
  },
  {
    title: 'Refine',
    copy: 'Outputs are checked for accuracy, formatting, consistency, and final usability.',
  },
  {
    title: 'Deliver',
    copy: 'You receive organized files, notes, and support for follow-up batches or scale-up.',
  },
];

const serviceSections = [
  {
    title: 'Language Translation Services We Offer',
    tone: 'mint',
    copy:
      'Global teams need content that feels natural to every audience. Shan Globalization supports precise, context-aware translation across business, technical, digital, and customer-facing material.',
    items: [
      'Content Translation',
      'Technical Translation',
      'Business Translation',
      'Document Translation',
      'Legal Translation',
      'eLearning Translation',
      'Healthcare Translation',
      'eCommerce Translation',
      'Enterprise Translation',
      'Book Translation',
      'Resume Translation',
      'Script Translation',
      'Brochure Translation',
      'Catalogue Translation',
      'Website Translation',
    ],
    close:
      'Need a specialized language workflow? Our team can adapt scope, review depth, terminology, and delivery format around your project.',
  },
  {
    title: 'Transcription Services We Offer',
    tone: 'white',
    copy:
      'We prepare readable, accurate transcripts from spoken content so meetings, interviews, media, research, and training data can be searched, reviewed, and reused.',
    items: [
      'Audio Transcription',
      'Online Transcription',
      'Audio Text Transcription',
      'Business Transcription',
      'Video Transcription',
      'YouTube Transcription',
      'Medical Transcription',
      'Language Transcription',
      'Human Transcription',
      'General Transcription',
      'Multilingual Transcription',
    ],
    close:
      'If your source files need timestamps, speaker tags, verbatim capture, summaries, or custom formatting, we can align the output before production begins.',
  },
  {
    title: 'Our Specialized AI Power Data Localization Services for Global Audiences',
    tone: 'mint',
    copy:
      'AI systems need high-quality multilingual data. We help teams collect, prepare, label, and review datasets that support localization, speech, chatbot, and model-evaluation programs.',
    items: [
      'AI Data Collection and Annotation',
      'Data Filling',
      'Speech Collection',
      'Data Labelling',
      'Image Data Collection',
      'Voice Collection',
      'Speech to Text, Text to Speech',
      'AI & Machine Translation',
      'Chatbot Training Data',
      'And more..',
    ],
    close:
      'From pilot datasets to high-volume programs, we keep instructions, QA checks, and delivery files organized for reliable AI data operations.',
  },
  {
    title: 'Proofreading Services We Offer',
    tone: 'white',
    copy:
      'Before content reaches customers, we review wording, grammar, punctuation, consistency, tone, and structure so every file is polished and ready to publish.',
    items: [
      'Document Proofreading',
      'Website Content Proofreading',
      'Online Proofreading',
      'Book Proofreading',
      'Language Proofreading',
      'Social Media Content Proofreading',
      'Content Proofreading',
      'Academic Proofreading',
    ],
    close:
      'Our proofreading support helps your message stay clear, professional, and aligned with the audience you want to reach.',
  },
];

function ServicesPage() {
  usePageMeta('Services');

  return (
    <div className="services-page">
      <section
        className="services-page-hero"
        style={{ backgroundImage: `url(${servicesHeroBg})` }}
      >
        <div className="services-page-hero-inner">
          <div className="services-page-hero-copy">
            <h1>Language, data, and AI quality services built for serious delivery.</h1>
            <p>
              Shan Globalization helps teams prepare multilingual content, speech files, training
              data, and search-quality workflows with disciplined production and review.
            </p>
            <div className="services-hero-actions">
              <Link to="/contact-us" className="btn-primary">Start a Project</Link>
              <a href="#service-suite" className="btn-secondary">Explore Services</a>
            </div>
          </div>
          <div className="services-hero-panel" aria-label="Service delivery highlights">
            {serviceStats.map((stat) => (
              <div key={stat.value}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="service-suite" className="services-card-section">
        <div className="services-section-heading">
          <span className="eyebrow">What we do</span>
          <h2>A focused suite for global content and AI operations.</h2>
          <p>
            Each service is built around clear scope, specialist execution, and final output that is
            easy for your team to review, publish, train on, or reuse.
          </p>
        </div>
        <div className="services-card-grid">
          {serviceCards.map((service, index) => (
            <article key={service.title} className="services-feature-card">
              <div className="services-card-topline">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <ServiceIcon kind={service.icon} />
              </div>
              <p className="services-card-kicker">{service.kicker}</p>
              <h3>{service.title}</h3>
              <p className="services-card-copy">{service.copy}</p>
              <ul>
                {service.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="services-workflow-section">
        <div className="services-workflow-inner">
          <div>
            <span className="eyebrow">Delivery method</span>
            <h2>Premium is not decoration. It is how the work moves.</h2>
            <div className="services-workflow-summary" aria-label="Delivery standards">
              <div>
                <strong>Scoped</strong>
                <span>Clear brief before production begins</span>
              </div>
              <div>
                <strong>Reviewed</strong>
                <span>Quality checks before handoff</span>
              </div>
              <div>
                <strong>Ready</strong>
                <span>Files organized for real use</span>
              </div>
            </div>
          </div>
          <div className="services-workflow-grid">
            {workflowSteps.map((step, index) => (
              <article key={step.title} className="services-workflow-card">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {serviceSections.map((section) => (
        <section
          key={section.title}
          className={`services-detail-section ${
            section.tone === 'mint' ? 'services-detail-section-mint' : 'services-detail-section-white'
          }`}
        >
          <div className="services-detail-inner">
            <div className="services-detail-copy">
              <span>{section.tone === 'mint' ? 'Core capability' : 'Specialized support'}</span>
              <h2>{section.title}</h2>
              <p className="services-detail-lead">{section.copy}</p>
              <p className="services-detail-close">{section.close}</p>
            </div>

            <ul className="services-detail-list">
              {section.items.map((item) => (
                <li key={item}>
                  <CheckIcon />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <section className="services-cta">
        <div className="services-cta-inner">
          <p>Ready when the brief is real</p>
          <h2>Bring us the files, target market, or dataset plan. We will shape the workflow.</h2>
          <span>Get a practical scope, clean delivery structure, and a team that can scale with you.</span>
          <Link to="/contact-us">Contact Us</Link>
        </div>
      </section>
    </div>
  );
}

function ServiceIcon({ kind }) {
  if (kind === 'message') {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
        <rect x="12" y="10" width="24" height="20" rx="4" />
        <path d="M18 17h12" />
        <path d="M18 23h7" />
        <path d="M20 30 16 38l10-8" />
        <circle cx="32" cy="31" r="6" />
        <path d="m29.5 31 1.8 1.8 3.4-4" />
      </svg>
    );
  }

  if (kind === 'database') {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
        <ellipse cx="24" cy="12" rx="14" ry="6" />
        <path d="M10 12v10c0 3.3 6.3 6 14 6s14-2.7 14-6V12" />
        <path d="M10 22v10c0 3.3 6.3 6 14 6s14-2.7 14-6V22" />
        <path d="M17 22h.01" />
        <path d="M17 32h.01" />
      </svg>
    );
  }

  if (kind === 'search') {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
        <circle cx="21" cy="21" r="11" />
        <path d="m30 30 8 8" />
        <path d="M16 21h10" />
        <path d="M21 16v10" />
        <path d="M33 13h6" />
        <path d="M36 10v6" />
      </svg>
    );
  }

  if (kind === 'bot') {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
        <rect x="12" y="16" width="24" height="20" rx="5" />
        <path d="M24 16V9" />
        <circle cx="24" cy="7" r="2" />
        <path d="M18 25h.01" />
        <path d="M30 25h.01" />
        <path d="M19 31h10" />
        <path d="M8 24h4" />
        <path d="M36 24h4" />
      </svg>
    );
  }

  if (kind === 'annotation') {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
        <path d="M13 35h8l18-18a5.7 5.7 0 0 0-8-8L13 27v8Z" />
        <path d="m28 12 8 8" />
        <path d="M12 39h25" />
        <path d="M14 27h7v7" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <path d="M14 21a10 10 0 0 1 20 0" />
      <path d="M9 21a15 15 0 0 1 30 0" />
      <path d="M19 33h10l-2.5-6.5a7 7 0 1 0-5 0L19 33Z" />
      <circle cx="24" cy="21" r="3.5" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <circle cx="10" cy="10" r="7" />
      <path d="m6.8 10.2 2 2 4.5-4.7" />
    </svg>
  );
}

export default ServicesPage;
