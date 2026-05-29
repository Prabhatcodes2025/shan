import { useState } from 'react';
import usePageMeta from '../hooks/usePageMeta';
import contactHeroBg from '../assets/contact-hero-bg.jpg';
import { company, contactReasons } from '../data/siteContent';

const mapLocation = {
  label: 'Vijay Nagar, Indore, Madhya Pradesh',
  note: 'Use this map view as a quick area reference for meetings and project coordination.',
  embedSrc:
    'https://maps.google.com/maps?q=Vijay%20Nagar%20Indore%20Madhya%20Pradesh&z=13&output=embed',
};

const contactChannels = [
  {
    label: 'Email',
    value: company.contact.email,
    detail: 'Project briefs and quotes.',
    href: `mailto:${company.contact.email}`,
  },
  {
    label: 'Phone',
    value: company.contact.phone,
    detail: 'Business-hour coordination.',
    href: `tel:${company.contact.phone.replace(/\s+/g, '')}`,
  },
  {
    label: 'Hours',
    value: company.contact.hours,
    detail: 'Responsive global support.',
  },
];

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  usePageMeta('Contact Us');

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="page-frame contact-page-frame space-y-14 sm:space-y-20">
      <section
        className="contact-hero"
        style={{ backgroundImage: `url(${contactHeroBg})` }}
      >
        <div className="contact-hero-overlay" />
        <div className="contact-hero-inner">
          <div className="max-w-3xl space-y-5">
            <span className="eyebrow">Contact Us</span>
            <div className="space-y-4">
              <h1 className="font-display text-4xl font-semibold leading-[1.02] text-white sm:text-6xl lg:whitespace-nowrap lg:text-7xl">
                Let’s keep it simple.
              </h1>
              <p className="max-w-2xl text-sm leading-7 text-slate-200 sm:text-lg lg:whitespace-nowrap">
                Share your project, timeline, or hiring need and we’ll respond with the next step.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid min-w-0 gap-6 sm:gap-8 lg:grid-cols-[0.86fr,1.14fr] lg:items-start">
        <article className="glass-panel min-w-0 p-5 sm:p-8">
          <p className="text-sm uppercase tracking-[0.28em] text-ocean-300">Direct contact</p>
          <p className="mt-4 font-display text-3xl leading-tight text-white sm:text-4xl">Reach us in the channel that fits.</p>
          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
            Email works best for briefs and quotes. Phone works best for quick coordination.
          </p>

          <div className="mt-8 grid gap-4">
            {contactChannels.map((item) => {
              const content = (
                <div className="min-w-0 rounded-[22px] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-forest-300/30 sm:rounded-[24px] sm:p-5">
                  <p className="text-xs uppercase tracking-[0.26em] text-slate-400">{item.label}</p>
                  <p className="mt-3 break-words text-lg font-semibold leading-7 text-white sm:text-xl">{item.value}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{item.detail}</p>
                </div>
              );

              return item.href ? (
                <a key={item.label} href={item.href} className="block">
                  {content}
                </a>
              ) : (
                <div key={item.label}>{content}</div>
              );
            })}
          </div>
        </article>

        <div className="spotlight-border min-w-0 self-start p-[1px]">
          <div className="rounded-[21px] bg-white/[0.03] p-5 backdrop-blur-xl sm:rounded-[27px] sm:p-8">
            <div className="space-y-3">
              <span className="eyebrow">Inquiry</span>
              <h2 className="text-2xl font-semibold text-white sm:text-4xl">
                Tell us what you need.
              </h2>
              <p className="max-w-2xl text-sm leading-7 text-slate-400">
                Keep it brief. We just need the basics to guide the next step.
              </p>
            </div>

            <form className="mt-8 grid gap-5" onSubmit={handleSubmit}>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-medium text-slate-200">
                  Full Name
                  <input required type="text" className="glass-field" placeholder="Your name" />
                </label>
                <label className="grid gap-2 text-sm font-medium text-slate-200">
                  Email Address
                  <input
                    required
                    type="email"
                    className="glass-field"
                    placeholder="you@company.com"
                  />
                </label>
              </div>

              <label className="grid gap-2 text-sm font-medium text-slate-200">
                Reason for Contact
                <select className="glass-field">
                  {contactReasons.map((reason) => (
                    <option key={reason}>{reason}</option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2 text-sm font-medium text-slate-200">
                Project Details
                <textarea
                  required
                  rows="5"
                  className="glass-field"
                  placeholder="Languages, timing, content type, or hiring need."
                />
              </label>

              <div className="flex flex-col gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <button type="submit" className="btn-primary">
                  Send Inquiry
                </button>
                {submitted && (
                  <p className="max-w-md text-sm leading-6 text-forest-200">
                    Thank you. Our team will follow up shortly.
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="grid min-w-0 gap-6 sm:gap-8 lg:grid-cols-[1.12fr,0.88fr] lg:items-stretch">
        <article className="glass-panel overflow-hidden p-0">
          <div className="border-b border-white/10 px-5 py-6 sm:px-8">
            <p className="text-sm uppercase tracking-[0.28em] text-ocean-300">Map View</p>
            <p className="mt-4 text-2xl font-semibold text-white sm:text-4xl">
              A quick location preview.
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
              {mapLocation.note}
            </p>
          </div>

          <div className="p-3 sm:p-5">
            <div className="overflow-hidden rounded-[24px] border border-white/10 bg-[#08131f]">
              <iframe
                title={`Map of ${mapLocation.label}`}
                src={mapLocation.embedSrc}
                className="h-[300px] w-full sm:h-[360px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </article>

        <article className="glass-panel flex h-full min-w-0 flex-col justify-between p-5 sm:p-8">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-forest-300">Location</p>
            <p className="mt-4 break-words text-2xl font-semibold leading-tight text-white sm:text-4xl">{mapLocation.label}</p>
            <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
              A visible location block makes the contact page feel more complete and easier to trust.
            </p>
          </div>

          <div className="mt-8 grid gap-3">
            <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur">
              <p className="text-[11px] uppercase tracking-[0.24em] text-slate-400">Coordination hours</p>
              <p className="mt-3 text-sm leading-7 text-slate-200">
                {company.contact.hours}
              </p>
            </div>
            <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur">
              <p className="text-[11px] uppercase tracking-[0.24em] text-slate-400">Best contact</p>
              <p className="mt-3 text-sm leading-7 text-slate-200">
                Email for briefs and quotes, or call for quick coordination during business hours.
              </p>
            </div>
          </div>
        </article>
      </section>

      <section className="cta-band">
        <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr,auto] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-forest-300">Prefer email?</p>
            <p className="mt-4 max-w-xl text-3xl font-semibold leading-tight sm:text-4xl">
              Send the brief directly and we’ll take it from there.
            </p>
          </div>
          <a
            href={`mailto:${company.contact.email}`}
            className="inline-flex rounded-full border border-white/12 bg-white/[0.96] px-6 py-3 text-sm font-semibold text-ink-950 transition hover:-translate-y-0.5 hover:bg-white"
          >
            Email the Team
          </a>
        </div>
      </section>
    </div>
  );
}

export default ContactPage;
