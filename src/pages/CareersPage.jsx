import { useEffect, useRef, useState } from 'react';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import { useManagedContent } from '../context/ManagedContentContext';
import usePageMeta from '../hooks/usePageMeta';
import careersTeam from '../assets/careers-team.svg';
import { company } from '../data/siteContent';

const emptyApplicationForm = {
  fullName: '',
  email: '',
  phone: '',
  currentLocation: '',
  resumeLink: '',
  coverLetter: '',
};

const currentLocationOptions = [
  'Chennai',
  'Bengaluru',
  'Hyderabad',
  'Mumbai',
  'Pune',
  'Remote in India',
  'Outside India',
];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const namePattern = /^[A-Za-z]+(?:[A-Za-z\s.'-]*[A-Za-z])?$/;
const phonePattern = /^[+\d\s()-]+$/;

function validateApplicationForm(applicationDetails) {
  const errors = {};
  const phoneDigits = applicationDetails.phone.replace(/\D/g, '');

  if (!applicationDetails.fullName) {
    errors.fullName = 'Full name is required.';
  } else if (applicationDetails.fullName.length < 2 || !namePattern.test(applicationDetails.fullName)) {
    errors.fullName = 'Enter a valid full name using letters and spaces only.';
  }

  if (!applicationDetails.email) {
    errors.email = 'Email address is required.';
  } else if (!emailPattern.test(applicationDetails.email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (!applicationDetails.phone) {
    errors.phone = 'Phone number is required.';
  } else if (!phonePattern.test(applicationDetails.phone) || phoneDigits.length < 10 || phoneDigits.length > 15) {
    errors.phone = 'Enter a valid phone number with 10 to 15 digits.';
  }

  return errors;
}

function buildApplicationEmail(role, applicationDetails) {
  const subject = `Application for ${role.title} - ${applicationDetails.fullName}`;
  const body = [
    'Hello Shan Globalization Team,',
    '',
    'I would like to apply for the following role.',
    '',
    `Role: ${role.title}`,
    `Employment Type: ${role.type}`,
    `Job Location: ${role.location}`,
    '',
    'Applicant Details',
    `Full Name: ${applicationDetails.fullName}`,
    `Email Address: ${applicationDetails.email}`,
    `Phone Number: ${applicationDetails.phone}`,
    `Current Location: ${applicationDetails.currentLocation || 'Not provided'}`,
    `Resume / Portfolio Link: ${applicationDetails.resumeLink || 'Not provided'}`,
    '',
    'Cover Letter',
    applicationDetails.coverLetter || 'Not provided',
    '',
    'Regards,',
    applicationDetails.fullName,
  ].join('\n');

  return `mailto:${company.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function CareersPage() {
  const { managedContent } = useManagedContent();
  const careersContent = managedContent.careers;
  const [selectedRole, setSelectedRole] = useState(null);
  const [applicationForm, setApplicationForm] = useState(emptyApplicationForm);
  const [applicationErrors, setApplicationErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const dialogRef = useRef(null);

  usePageMeta('Careers');

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog || typeof window === 'undefined') {
      return undefined;
    }

    if (selectedRole && !dialog.open) {
      dialog.showModal();
    }

    return () => {
      if (dialog.open) {
        dialog.close();
      }
    };
  }, [selectedRole]);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return undefined;
    }

    const handleCancel = (event) => {
      event.preventDefault();
      setSelectedRole(null);
      setApplicationErrors({});
    };

    dialog.addEventListener('cancel', handleCancel);

    return () => {
      dialog.removeEventListener('cancel', handleCancel);
    };
  }, []);

  const handleOpenApplicationForm = (role, event) => {
    event?.preventDefault();
    event?.stopPropagation();
    event?.currentTarget?.blur();

    setSelectedRole(role);
    setSuccessMessage('');
    setApplicationForm({ ...emptyApplicationForm });
    setApplicationErrors({});
  };

  const handleCloseApplicationForm = () => {
    setSelectedRole(null);
    setApplicationErrors({});
  };

  const handleApplicationChange = (event) => {
    const { name, value } = event.target;

    setApplicationForm((currentState) => ({
      ...currentState,
      [name]: value,
    }));

    setApplicationErrors((currentErrors) => {
      if (!currentErrors[name]) {
        return currentErrors;
      }

      return {
        ...currentErrors,
        [name]: '',
      };
    });
  };

  const handleApplicationSubmit = (event) => {
    event.preventDefault();

    if (!selectedRole) {
      return;
    }

    const trimmedApplication = Object.fromEntries(
      Object.entries(applicationForm).map(([key, value]) => [key, value.trim()]),
    );
    const validationErrors = validateApplicationForm(trimmedApplication);

    if (Object.keys(validationErrors).length) {
      setApplicationErrors(validationErrors);
      return;
    }

    const emailDraftLink = buildApplicationEmail(selectedRole, trimmedApplication);

    setSuccessMessage(
      `Your application for ${selectedRole.title} is ready. Your email app should open with all details prefilled so you can review and send it.`,
    );
    setApplicationForm({ ...emptyApplicationForm });
    setApplicationErrors({});
    setSelectedRole(null);
    window.location.href = emailDraftLink;
  };

  return (
    <>
      <div className="page-frame space-y-24">
        <PageHero
          eyebrow="Careers"
          title={careersContent.heroTitle}
          description={careersContent.heroDescription}
          aside={
            <div className="space-y-4">
              <img
                src={careersTeam}
                alt="Team and growth illustration for careers"
                className="h-56 w-full rounded-[22px] border border-white/10 object-cover shadow-luxe"
              />
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Working style</p>
              <p className="text-base leading-7 text-slate-200">{careersContent.workingStyle}</p>
            </div>
          }
        />

        <section className="space-y-10">
          <SectionHeading
            eyebrow={careersContent.cultureEyebrow}
            title={careersContent.cultureTitle}
            description={careersContent.cultureDescription}
          />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {careersContent.benefits.length ? (
              careersContent.benefits.map((benefit, index) => (
                <article key={`${benefit}-${index}`} className="glass-panel p-6">
                  <p className="text-base leading-7 text-slate-200">{benefit}</p>
                </article>
              ))
            ) : (
              <article className="glass-panel p-6 md:col-span-2 lg:col-span-4">
                <p className="text-base leading-7 text-slate-300">
                  No culture benefits are listed right now. Update the careers admin section to add
                  them back.
                </p>
              </article>
            )}
          </div>
        </section>

        <section className="space-y-10">
          <SectionHeading
            eyebrow={careersContent.rolesEyebrow}
            title={careersContent.rolesTitle}
            description={careersContent.rolesDescription}
          />

          {successMessage && (
            <div className="rounded-[28px] border border-forest-300/25 bg-forest-300/10 px-5 py-4 text-sm leading-7 text-forest-100 backdrop-blur-xl sm:px-6">
              {successMessage}
            </div>
          )}

          <div className="grid gap-6">
            {careersContent.roles.length ? (
              careersContent.roles.map((role, index) => (
                <article key={`${role.title}-${index}`} className="spotlight-border p-[1px]">
                  <div className="rounded-[27px] bg-white/[0.03] p-7 backdrop-blur-xl">
                    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr),auto] lg:items-center">
                      <div className="min-w-0">
                        <p className="text-2xl font-semibold text-white">{role.title}</p>
                        <p className="mt-3 text-sm leading-7 text-slate-400">{role.summary}</p>
                      </div>

                      <div className="flex flex-col items-start gap-4 lg:items-end">
                        <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.24em] text-slate-400">
                          <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 backdrop-blur">
                            {role.type}
                          </span>
                          <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 backdrop-blur">
                            {role.location}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={(event) => handleOpenApplicationForm(role, event)}
                          className="btn-secondary border-forest-300/30 text-forest-200 hover:border-forest-300/45 hover:text-forest-100"
                        >
                          Apply Now
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <article className="glass-panel p-7">
                <p className="text-2xl font-semibold text-white">No open roles right now.</p>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                  Add a role from the admin portal to show opportunities on this page.
                </p>
              </article>
            )}
          </div>
        </section>
      </div>

      <dialog
        ref={dialogRef}
        className="careers-application-dialog"
        onClose={handleCloseApplicationForm}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            handleCloseApplicationForm();
          }
        }}
      >
        {selectedRole ? (
          <>
            <div className="relative z-10 w-full max-w-4xl overflow-hidden rounded-[32px] border border-white/12 bg-[rgba(7,17,31,0.98)] shadow-[0_48px_140px_-42px_rgba(0,0,0,0.95)]">
              <div className="max-h-[92dvh] overflow-y-auto p-5 sm:p-6">
                <div
                  onClick={(event) => event.stopPropagation()}
                >
                  <div className="flex flex-col gap-3 border-b border-white/10 pb-5 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.28em] text-forest-300">Role Application</p>
                      <h3
                        id="careers-application-title"
                        className="mt-2 text-2xl font-semibold leading-tight text-white sm:text-[2rem]"
                      >
                        {selectedRole.title}
                      </h3>
                      <div className="mt-3 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.22em] text-slate-400">
                        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 backdrop-blur">
                          {selectedRole.type}
                        </span>
                        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 backdrop-blur">
                          {selectedRole.location}
                        </span>
                      </div>
                      <p className="mt-3 max-w-2xl text-[15px] leading-6 text-slate-400">
                        Fill in the basics below. Your email app will open with the application
                        details ready to review and send.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleCloseApplicationForm}
                      className="btn-secondary self-start"
                    >
                      Cancel
                    </button>
                  </div>

                  <form className="mt-5 grid gap-4" onSubmit={handleApplicationSubmit} noValidate>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="grid gap-1.5 text-[13px] font-medium text-slate-200">
                        <span>
                          Full Name <span className="text-rose-300">*</span>
                        </span>
                        <input
                          required
                          type="text"
                          name="fullName"
                          value={applicationForm.fullName}
                          onChange={handleApplicationChange}
                          aria-invalid={Boolean(applicationErrors.fullName)}
                          className={`glass-field py-2.5 text-sm ${applicationErrors.fullName ? 'border-rose-300/60 focus:border-rose-300/60' : ''}`}
                          placeholder="Your full name"
                        />
                        {applicationErrors.fullName && (
                          <span className="text-sm text-rose-200">{applicationErrors.fullName}</span>
                        )}
                      </label>

                      <label className="grid gap-1.5 text-[13px] font-medium text-slate-200">
                        <span>
                          Email Address <span className="text-rose-300">*</span>
                        </span>
                        <input
                          required
                          type="email"
                          name="email"
                          value={applicationForm.email}
                          onChange={handleApplicationChange}
                          aria-invalid={Boolean(applicationErrors.email)}
                          className={`glass-field py-2.5 text-sm ${applicationErrors.email ? 'border-rose-300/60 focus:border-rose-300/60' : ''}`}
                          placeholder="you@example.com"
                        />
                        {applicationErrors.email && (
                          <span className="text-sm text-rose-200">{applicationErrors.email}</span>
                        )}
                      </label>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="grid gap-1.5 text-[13px] font-medium text-slate-200">
                        <span>
                          Phone Number <span className="text-rose-300">*</span>
                        </span>
                        <input
                          required
                          type="tel"
                          name="phone"
                          value={applicationForm.phone}
                          onChange={handleApplicationChange}
                          aria-invalid={Boolean(applicationErrors.phone)}
                          className={`glass-field py-2.5 text-sm ${applicationErrors.phone ? 'border-rose-300/60 focus:border-rose-300/60' : ''}`}
                          placeholder="+91 98765 43210"
                        />
                        {applicationErrors.phone && (
                          <span className="text-sm text-rose-200">{applicationErrors.phone}</span>
                        )}
                      </label>

                      <label className="grid gap-1.5 text-[13px] font-medium text-slate-200">
                        <span>Current Location</span>
                        <select
                          name="currentLocation"
                          value={applicationForm.currentLocation}
                          onChange={handleApplicationChange}
                          className="glass-field appearance-none py-2.5 text-sm"
                        >
                          <option value="">Select your current location</option>
                          {currentLocationOptions.map((location) => (
                            <option key={location} value={location}>
                              {location}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>

                    <label className="grid gap-1.5 text-[13px] font-medium text-slate-200">
                      <span>Resume or Portfolio Link</span>
                      <input
                        type="url"
                        name="resumeLink"
                        value={applicationForm.resumeLink}
                        onChange={handleApplicationChange}
                        className="glass-field py-2.5 text-sm"
                        placeholder="https://drive.google.com/... or LinkedIn profile"
                      />
                    </label>

                    <label className="grid gap-1.5 text-[13px] font-medium text-slate-200">
                      <span>Cover Letter</span>
                      <textarea
                        rows="5"
                        name="coverLetter"
                        value={applicationForm.coverLetter}
                        onChange={handleApplicationChange}
                        className="glass-field py-2.5 text-sm"
                        placeholder="Introduce yourself, highlight relevant experience, and explain why this role fits you."
                      />
                    </label>

                    <div className="flex flex-col gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
                      <p className="max-w-xl text-[13px] leading-5 text-slate-400">
                        Required fields are marked with <span className="text-rose-300">*</span>.
                        Your details will be prepared in your email app.
                      </p>
                      <button type="submit" className="btn-primary">
                        Submit Application
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </dialog>
    </>
  );
}

export default CareersPage;
