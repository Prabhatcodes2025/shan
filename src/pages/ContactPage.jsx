import { useEffect, useState } from 'react';
import usePageMeta from '../hooks/usePageMeta';
import contactHeroBg from '../assets/contact-hero-bg.jpg';
import { company, contactReasons } from '../data/siteContent';
import {
  CONTACT_ENQUIRIES_TABLE,
  isSupabaseConfigured,
  supabase,
} from '../lib/supabase';

const officeLocation = company.contact.office;

const contactCards = [
  {
    label: 'Office Location',
    value: officeLocation,
    detail: 'Project coordination and client meetings by appointment.',
    icon: 'pin',
  },
  {
    label: 'Phone no.',
    value: company.contact.phone,
    detail: 'Speak with us during business hours.',
    href: `tel:${company.contact.phone.replace(/\s+/g, '')}`,
    icon: 'phone',
  },
  {
    label: 'Email address',
    value: company.contact.email,
    detail: 'Send project briefs, files, and pricing requests.',
    href: `mailto:${company.contact.email}`,
    icon: 'mail',
  },
];

const mapEmbedSrc =
  'https://maps.google.com/maps?q=Loni%2C%20Ghaziabad%2C%20Uttar%20Pradesh%20201102&z=13&output=embed';

const contactFormEndpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT?.trim() ?? '';
const web3FormsAccessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim() ?? '';
const web3FormsEndpoint = 'https://api.web3forms.com/submit';

function buildInquiryPayload(inquiryDetails) {
  return {
    full_name: inquiryDetails.fullName,
    email: inquiryDetails.email,
    phone: inquiryDetails.phone || null,
    company: inquiryDetails.company || null,
    reason: inquiryDetails.reason,
    project_details: inquiryDetails.projectDetails,
  };
}

async function submitContactInquiry(inquiryDetails) {
  const payload = buildInquiryPayload(inquiryDetails);
  const subject = `Project inquiry - ${inquiryDetails.fullName}`;

  if (contactFormEndpoint) {
    const response = await fetch(contactFormEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...payload,
        to: company.contact.email,
        subject,
      }),
    });

    if (!response.ok) {
      throw new Error('Unable to send your inquiry right now.');
    }
  } else if (web3FormsAccessKey) {
    const response = await fetch(web3FormsEndpoint, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_key: web3FormsAccessKey,
        subject,
        from_name: inquiryDetails.fullName,
        name: inquiryDetails.fullName,
        email: inquiryDetails.email,
        phone: inquiryDetails.phone || 'Not provided',
        company: inquiryDetails.company || 'Not provided',
        reason: inquiryDetails.reason,
        message: inquiryDetails.projectDetails,
      }),
    });
    const result = await response.json().catch(() => null);

    if (!response.ok || result?.success === false) {
      throw new Error(result?.message || 'Unable to send your inquiry right now.');
    }
  } else {
    throw new Error('Email delivery is not configured yet.');
  }

  if (isSupabaseConfigured) {
    const { error } = await supabase
      .from(CONTACT_ENQUIRIES_TABLE)
      .insert(payload);

    if (error) {
      throw error;
    }
  }
}

function ContactPage() {
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  usePageMeta('Contact Us');

  useEffect(() => {
    if (!statusMessage) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setStatusMessage('');
    }, 4000);

    return () => window.clearTimeout(timeoutId);
  }, [statusMessage]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const inquiryDetails = Object.fromEntries(
      Array.from(formData.entries()).map(([key, value]) => [key, String(value).trim()]),
    );

    setIsSubmitting(true);
    setStatusMessage('');
    setErrorMessage('');

    try {
      await submitContactInquiry(inquiryDetails);
      setStatusMessage('Thank you. Your inquiry has been emailed successfully.');
      form.reset();
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Unable to submit your inquiry right now.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearFormMessages = () => {
    if (statusMessage) {
      setStatusMessage('');
    }

    if (errorMessage) {
      setErrorMessage('');
    }
  };

  return (
    <div className="page-frame contact-page-frame">
      <section
        className="contact-hero contact-reference-hero"
        style={{ backgroundImage: `url(${contactHeroBg})` }}
      >
        <div className="contact-hero-overlay" />
        <div className="contact-hero-inner">
          <div className="contact-reference-hero-copy">
            <span className="eyebrow">Contact us</span>
            <h1>Let&apos;s discuss your next big project with us</h1>
            <p>
              Tell us about your translation, transcription, data collection, or annotation needs.
              Our team will help you plan the right workflow for quality, speed, and scale.
            </p>
          </div>
        </div>
      </section>

      <section className="contact-info-strip" aria-label="Contact information">
        {contactCards.map((item) => {
          const card = (
            <div className="contact-info-card">
              <span className="contact-info-icon" aria-hidden="true">
                <ContactIcon kind={item.icon} />
              </span>
              <div>
                <p className="contact-info-label">{item.label}</p>
                <p className="contact-info-value">{item.value}</p>
                <p className="contact-info-detail">{item.detail}</p>
              </div>
            </div>
          );

          return item.href ? (
            <a key={item.label} href={item.href} className="contact-info-link">
              {card}
            </a>
          ) : (
            <div key={item.label}>{card}</div>
          );
        })}
      </section>

      <section className="contact-reference-section">
        <div className="contact-reference-intro">
          <span className="eyebrow">Write to us</span>
          <h2>Have a project? Send the details.</h2>
          <p>
            Share the basics and we will route your inquiry to the right project team. The form is
            ideal for quotes, new project discussions, vendor support, and long-term collaboration.
          </p>
        </div>

        <div className="contact-reference-grid">
          <article className="contact-form-panel">
            <form
              className="contact-reference-form"
              onSubmit={handleSubmit}
              onInput={clearFormMessages}
              onInvalid={clearFormMessages}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <label>
                  <span>Full Name</span>
                  <input
                    required
                    type="text"
                    name="fullName"
                    placeholder="Your name"
                    autoComplete="name"
                  />
                </label>
                <label>
                  <span>Email Address</span>
                  <input
                    required
                    type="email"
                    name="email"
                    placeholder="you@company.com"
                    autoComplete="email"
                  />
                </label>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <label>
                  <span>Phone Number</span>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+91 00000 00000"
                    autoComplete="tel"
                  />
                </label>
                <label>
                  <span>Company Name <em>Optional</em></span>
                  <input
                    type="text"
                    name="company"
                    placeholder="Company or organization"
                    autoComplete="organization"
                  />
                </label>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <label>
                  <span>Reason for Contacting</span>
                  <select name="reason" defaultValue={contactReasons[0]}>
                    {contactReasons.map((reason) => (
                      <option key={reason}>{reason}</option>
                    ))}
                  </select>
                </label>
              </div>

              <label>
                <span>Project Details</span>
                <textarea
                  required
                  name="projectDetails"
                  rows={6}
                  placeholder="Languages, content type, volume, timeline, and any special instructions."
                />
              </label>

              <div className="contact-submit-row">
                <button
                  type="submit"
                  className="btn-primary contact-submit-button"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                  onClick={clearFormMessages}
                >
                  {isSubmitting && <span className="button-spinner" aria-hidden="true" />}
                  <span>{isSubmitting ? 'Sending' : 'Send Inquiry'}</span>
                </button>
                {statusMessage && (
                  <p className="contact-success">{statusMessage}</p>
                )}
                {errorMessage && (
                  <p className="contact-error">{errorMessage}</p>
                )}
              </div>
            </form>
          </article>

          <aside className="contact-side-panel">
            <p className="contact-side-kicker">Contact info</p>
            <h3>We are ready to support your global content workflows.</h3>
            <p>
              Email is best for project briefs and pricing. Phone is useful for quick coordination
              during business hours.
            </p>

            <div className="contact-side-list">
              <div>
                <span>Business hours</span>
                <strong>{company.contact.hours}</strong>
              </div>
              <div>
                <span>Best for</span>
                <strong>Translation, transcription, AI data, and annotation projects</strong>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="contact-map-section">
        <div>
          <span className="eyebrow">Location</span>
          <h2>Find our office area</h2>
          <p>{officeLocation}</p>
        </div>
        <div className="contact-map-frame">
          <iframe
            title={`Map of ${officeLocation}`}
            src={mapEmbedSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </div>
  );
}

function ContactIcon({ kind }) {
  if (kind === 'phone') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M6.6 3.8 9 3.2l2.1 4.9-1.4 1.2a12 12 0 0 0 5 5l1.2-1.4 4.9 2.1-.6 2.4c-.3 1.3-1.5 2.2-2.9 2.1A15.2 15.2 0 0 1 4.5 6.7c-.1-1.4.8-2.6 2.1-2.9Z" />
      </svg>
    );
  }

  if (kind === 'mail') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
        <path d="m4.5 7 7.5 6 7.5-6" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 21s6.5-5.4 6.5-11a6.5 6.5 0 0 0-13 0c0 5.6 6.5 11 6.5 11Z" />
      <circle cx="12" cy="10" r="2.4" />
    </svg>
  );
}

export default ContactPage;
