import { useState } from 'react';
import PageHero from '../components/PageHero';
import usePageMeta from '../hooks/usePageMeta';
import contactConnect from '../assets/contact-connect.svg';
import { company, contactReasons } from '../data/siteContent';

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
    <div className="page-frame space-y-20">
      <PageHero
        eyebrow="Contact Us"
        title="Let’s keep it simple."
        description="Share your project, timeline, or hiring need and we’ll respond with the next step."
        aside={
          <div className="space-y-4">
            <img
              src={contactConnect}
              alt="Communication and support illustration"
              className="h-56 w-full rounded-[22px] border border-white/10 object-cover shadow-luxe"
            />
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              <div className="rounded-[20px] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-200 backdrop-blur">
                <p className="text-[11px] uppercase tracking-[0.24em] text-slate-400">Email</p>
                <p className="mt-2">{company.contact.email}</p>
              </div>
              <div className="rounded-[20px] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-200 backdrop-blur">
                <p className="text-[11px] uppercase tracking-[0.24em] text-slate-400">Phone</p>
                <p className="mt-2">{company.contact.phone}</p>
              </div>
              <div className="rounded-[20px] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-200 backdrop-blur">
                <p className="text-[11px] uppercase tracking-[0.24em] text-slate-400">Hours</p>
                <p className="mt-2">{company.contact.hours}</p>
              </div>
            </div>
          </div>
        }
      />

      <section className="grid gap-8 lg:grid-cols-[0.86fr,1.14fr] lg:items-start">
        <article className="glass-panel p-7 sm:p-8">
          <p className="text-sm uppercase tracking-[0.28em] text-ocean-300">Direct contact</p>
          <p className="mt-4 font-display text-4xl text-white">Reach us in the channel that fits.</p>
          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
            Email works best for briefs and quotes. Phone works best for quick coordination.
          </p>

          <div className="mt-8 grid gap-4">
            {contactChannels.map((item) => {
              const content = (
                <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-forest-300/30">
                  <p className="text-xs uppercase tracking-[0.26em] text-slate-400">{item.label}</p>
                  <p className="mt-3 text-xl font-semibold text-white">{item.value}</p>
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

        <div className="spotlight-border self-start p-[1px]">
          <div className="rounded-[27px] bg-white/[0.03] p-7 backdrop-blur-xl sm:p-8">
            <div className="space-y-3">
              <span className="eyebrow">Inquiry</span>
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">
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

      <section className="cta-band">
        <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr,auto] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-forest-300">Prefer email?</p>
            <p className="mt-4 max-w-xl text-4xl font-semibold leading-tight">
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
