import { Link } from 'react-router-dom';
import usePageMeta from '../hooks/usePageMeta';
import servicesHeroBg from '../assets/services-hero-bg.jpg';

const serviceCards = [
  {
    title: 'Translation',
    copy:
      'We provide accurate multilingual translation and professional audio/video transcription services with fast delivery, quality formatting, and reliable solutions for business, media, research, and AI projects.',
  },
  {
    title: 'Transcription',
    copy:
      'We provide accurate multilingual translation and professional audio/video transcription services with fast delivery, quality formatting, and reliable solutions for business, media, research, and AI projects.',
  },
  {
    title: 'Data Collection',
    copy:
      'We offer reliable large-scale data collection services including text, image, audio, video, and web datasets designed for AI training, machine learning, analytics, and research purposes.',
  },
  {
    title: 'Search Engine Evaluation & Rating',
    copy:
      'We provide professional evaluation and rating services for search results, ads, maps, apps, websites, online content, and AI-generated responses to improve relevance, accuracy, quality, and user experience.',
  },
  {
    title: 'AI Training & Quality Analysis',
    copy:
      'We deliver AI data preparation, validation, quality analysis, and model evaluation services to improve machine learning accuracy, performance, reliability, and overall AI system efficiency.',
  },
  {
    title: 'Annotation',
    copy:
      'Our expert team provides precise image, video, text, and audio annotation services including labeling, segmentation, polygon annotation, bounding boxes, and AI training data preparation.',
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
          <h1>Services</h1>
        </div>
      </section>

      <section className="services-card-section">
        <div className="services-card-grid">
          {serviceCards.map((service) => (
            <article key={service.title} className="services-feature-card">
              <ServiceSignalIcon />
              <h2>{service.title}</h2>
              <p>{service.copy}</p>
            </article>
          ))}
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
            <h2>{section.title}</h2>
            <p className="services-detail-lead">{section.copy}</p>

            <ul className="services-detail-list">
              {section.items.map((item) => (
                <li key={item}>
                  <CheckIcon />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="services-detail-close">{section.close}</p>
          </div>
        </section>
      ))}

      <section className="services-cta">
        <div className="services-cta-spark services-cta-spark-left" aria-hidden="true" />
        <div className="services-cta-spark services-cta-spark-right" aria-hidden="true" />
        <p>Join the success</p>
        <h2>Let's discuss your next big project with us</h2>
        <span>Schedule a free consultation with our team and let's make things happen.</span>
        <Link to="/contact-us">Contact Us</Link>
      </section>
    </div>
  );
}

function ServiceSignalIcon() {
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
