import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import usePageMeta from '../hooks/usePageMeta';
import { company } from '../data/siteContent';

const policySections = [
  {
    title: 'Information We Collect',
    intro: 'We may collect the following information:',
    items: [
      'Name and contact details',
      'Email address and phone number',
      'Company and business information',
      'Project requirements and communications',
      'Website usage data and analytics',
      'Information submitted through contact forms, applications, or service inquiries',
    ],
  },
  {
    title: 'How We Use Information',
    intro: 'We use collected information to:',
    items: [
      'Provide and manage our services',
      'Respond to inquiries and support requests',
      'Process project and partnership requests',
      'Improve our website and service quality',
      'Communicate project updates and business information',
      'Maintain security and prevent fraud',
    ],
  },
  {
    title: 'Data Security',
    paragraphs: [
      'Shan Globalization implements appropriate technical and organizational measures to protect information against unauthorized access, disclosure, alteration, or destruction.',
      'We follow internationally recognized information security and quality management practices and maintain compliance with ISO 9001 (Quality Management System) and ISO/IEC 27001 (Information Security Management System).',
    ],
  },
  {
    title: 'Confidentiality & NDA Compliance',
    paragraphs: [
      'We understand that many client projects involve confidential business information, proprietary content, training data, AI-related materials, and sensitive documentation.',
      'Shan Globalization operates under strict confidentiality standards and can work under client-specific Non-Disclosure Agreements (NDAs) whenever required.',
      'All project-related information is treated as confidential and is only accessed by authorized personnel involved in project execution.',
    ],
  },
  {
    title: 'Third-Party Services',
    paragraphs: [
      'Our website may use trusted third-party services for hosting, analytics, communication, or business operations. These providers are required to maintain appropriate security and privacy standards.',
    ],
  },
  {
    title: 'Cookies',
    paragraphs: [
      'Our website may use cookies and similar technologies to improve user experience, analyze website traffic, and enhance website functionality.',
    ],
  },
  {
    title: 'Data Retention',
    paragraphs: [
      'We retain information only for as long as necessary to provide services, fulfill legal obligations, resolve disputes, and maintain business records.',
    ],
  },
  {
    title: 'Your Rights',
    intro: 'Depending on your location and applicable laws, you may have the right to:',
    items: [
      'Access your personal information',
      'Request correction of inaccurate information',
      'Request deletion of personal information',
      'Restrict or object to processing',
      'Request data portability',
    ],
  },
  {
    title: 'Policy Updates',
    paragraphs: [
      'Shan Globalization may update this Privacy Policy periodically. Any updates will be published on this page with the revised effective date.',
    ],
  },
];

function PrivacyPolicyPage() {
  usePageMeta('Privacy Policy');

  return (
    <div className="page-frame policy-page space-y-10 sm:space-y-14">
      <PageHero
        eyebrow="Privacy Policy"
        title="Shan Globalization Privacy Policy"
        description="We are committed to protecting the privacy, confidentiality, and security of our clients, partners, employees, contractors, and website visitors."
        aside={
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.24em] text-forest-300">Privacy support</p>
            <p className="text-2xl font-semibold leading-tight text-white">
              Contact us for privacy, security, confidentiality, or NDA-related inquiries.
            </p>
            <Link to="/contact-us" className="btn-primary">
              Contact Shan Globalization
            </Link>
          </div>
        }
      />

      <section className="policy-panel">
        <div className="policy-lead">
          <p>
            At <strong>{company.name}</strong>, we are committed to protecting the privacy,
            confidentiality, and security of our clients, partners, employees, contractors, and
            website visitors. This Privacy Policy explains how we collect, use, store, and protect
            information when you interact with our website and services.
          </p>
        </div>

        <div className="policy-section-list">
          {policySections.map((section) => (
            <article key={section.title} className="policy-section-card">
              <h2>{section.title}</h2>
              {section.intro && <p>{section.intro}</p>}
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.items && (
                <ul>
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </article>
          ))}

          <article className="policy-section-card">
            <h2>Contact Information</h2>
            <p>
              For privacy, security, confidentiality, or NDA-related inquiries, please contact:
            </p>
            <div className="policy-contact-box">
              <strong>{company.name}</strong>
              <a href={`mailto:${company.contact.email}`}>{company.contact.email}</a>
              <a href="https://www.shanglobalization.com" target="_blank" rel="noreferrer">
                www.shanglobalization.com
              </a>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}

export default PrivacyPolicyPage;
