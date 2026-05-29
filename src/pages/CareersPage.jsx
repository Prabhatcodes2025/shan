import { useEffect, useRef, useState } from 'react';
import SectionHeading from '../components/SectionHeading';
import { useManagedContent } from '../context/ManagedContentContext';
import usePageMeta from '../hooks/usePageMeta';
import careersHeroBg from '../assets/careers-hero-bg.jpg';
import { company } from '../data/siteContent';

const emptyApplicationForm = {
  fullName: '',
  email: '',
  phone: '',
  currentLocation: '',
  country: '',
  language: '',
  experienceLevel: '',
  availability: '',
  telegramWhatsapp: '',
  resumeFileName: '',
  resumeLink: '',
  coverLetter: '',
};

const languageOptions = [
  'English',
  'Hindi',
  'Tamil',
  'Telugu',
  'Kannada',
  'Malayalam',
  'Bengali',
  'Marathi',
  'Gujarati',
  'Punjabi',
  'Urdu',
  'Arabic',
  'French',
  'German',
  'Spanish',
  'Other',
];

const countryOptions = [
  'India',
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'United Arab Emirates',
  'Singapore',
  'Germany',
  'France',
  'Spain',
  'Other',
];

const experienceLevelOptions = [
  'Fresher',
  'Less than 1 year',
  '1-2 years',
  '3-5 years',
  '5+ years',
];

const availabilityOptions = [
  'Immediate',
  'Within 1 week',
  'Within 2 weeks',
  'Within 1 month',
  'Part-time only',
  'Freelance / project based',
];

const requiredCareerBenefits = [
  'Remote Opportunities',
  'Flexible Work Culture',
  'Global AI Projects',
  'Fast-Growing Team',
  'Multilingual Environment',
  'Skill Development',
];

const currentLocationOptions = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
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

  if (!applicationDetails.country) {
    errors.country = 'Country is required.';
  }

  if (!applicationDetails.language) {
    errors.language = 'Language selection is required.';
  }

  if (!applicationDetails.experienceLevel) {
    errors.experienceLevel = 'Experience level is required.';
  }

  if (!applicationDetails.availability) {
    errors.availability = 'Availability is required.';
  }

  if (!applicationDetails.telegramWhatsapp) {
    errors.telegramWhatsapp = 'Telegram or WhatsApp contact is required.';
  }

  if (!applicationDetails.resumeFileName && !applicationDetails.resumeLink) {
    errors.resumeFileName = 'Upload a resume or provide a resume link.';
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
    `Telegram / WhatsApp: ${applicationDetails.telegramWhatsapp}`,
    `Country: ${applicationDetails.country}`,
    `Current Location: ${applicationDetails.currentLocation || 'Not provided'}`,
    `Language: ${applicationDetails.language}`,
    `Experience Level: ${applicationDetails.experienceLevel}`,
    `Availability: ${applicationDetails.availability}`,
    `Uploaded Resume File: ${applicationDetails.resumeFileName || 'Not provided through browser form'}`,
    `Resume / Portfolio Link: ${applicationDetails.resumeLink || 'Not provided'}`,
    '',
    'Note: If a resume file was selected in the website form, please attach it manually before sending this email.',
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
  const displayedCareerBenefits = Array.from(
    new Set([...careersContent.benefits, ...requiredCareerBenefits]),
  );
  const [selectedRole, setSelectedRole] = useState(null);
  const [applicationForm, setApplicationForm] = useState(emptyApplicationForm);
  const [applicationErrors, setApplicationErrors] = useState({});
  const [isLocationMenuOpen, setIsLocationMenuOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const dialogRef = useRef(null);
  const locationMenuRef = useRef(null);
  const resumeInputRef = useRef(null);

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

  useEffect(() => {
    if (!isLocationMenuOpen) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (!locationMenuRef.current?.contains(event.target)) {
        setIsLocationMenuOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsLocationMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isLocationMenuOpen]);

  const handleOpenApplicationForm = (role, event) => {
    event?.preventDefault();
    event?.stopPropagation();
    event?.currentTarget?.blur();

    setSelectedRole(role);
    setIsLocationMenuOpen(false);
    setSuccessMessage('');
    setApplicationForm({ ...emptyApplicationForm });
    setApplicationErrors({});
  };

  const handleCloseApplicationForm = () => {
    setSelectedRole(null);
    setApplicationErrors({});
    setIsLocationMenuOpen(false);
  };

  const updateApplicationField = (name, value) => {
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

  const handleApplicationChange = (event) => {
    const { name, value } = event.target;
    updateApplicationField(name, value);
  };

  const handleResumeFileChange = (event) => {
    const file = event.target.files?.[0];
    updateApplicationField('resumeFileName', file?.name || '');
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
    setIsLocationMenuOpen(false);
    setApplicationForm({ ...emptyApplicationForm });
    if (resumeInputRef.current) {
      resumeInputRef.current.value = '';
    }
    setApplicationErrors({});
    setSelectedRole(null);
    window.location.href = emailDraftLink;
  };

  return (
    <>
      <div className="page-frame careers-page-frame space-y-24">
        <section
          className="careers-hero"
          style={{ backgroundImage: `url(${careersHeroBg})` }}
        >
          <div className="careers-hero-overlay" />
          <div className="careers-hero-inner">
            <div className="space-y-5">
              <span className="eyebrow">Careers</span>
              <div className="space-y-4">
                <h1 className="max-w-5xl text-balance font-display text-5xl font-semibold leading-[0.98] text-white sm:text-6xl lg:text-7xl">
                  {careersContent.heroTitle}
                </h1>
                <p className="max-w-2xl text-sm leading-7 text-slate-200 sm:text-lg">
                  {careersContent.heroDescription}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-10">
          <SectionHeading
            eyebrow={careersContent.cultureEyebrow}
            title={careersContent.cultureTitle}
            description={careersContent.cultureDescription}
          />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {displayedCareerBenefits.length ? (
              displayedCareerBenefits.map((benefit, index) => (
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

        <section className="glass-panel p-7 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-forest-300">
            Who Can Apply
          </p>
          <p className="mt-4 max-w-4xl text-xl font-semibold leading-8 text-white sm:text-2xl sm:leading-9">
            We welcome freelancers, language experts, AI contributors, data annotators, reviewers,
            and remote professionals from multiple regions.
          </p>
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

                      <div className="grid gap-1.5 text-[13px] font-medium text-slate-200">
                        <span>Current Location</span>
                        <div ref={locationMenuRef} className="relative">
                          <button
                            type="button"
                            onClick={() => setIsLocationMenuOpen((currentValue) => !currentValue)}
                            className="glass-field flex w-full items-center justify-between gap-3 py-2.5 text-left text-sm"
                            aria-expanded={isLocationMenuOpen}
                            aria-haspopup="listbox"
                          >
                            <span
                              className={
                                applicationForm.currentLocation
                                  ? 'truncate text-slate-100'
                                  : 'truncate text-slate-400'
                              }
                            >
                              {applicationForm.currentLocation || 'Select your current location'}
                            </span>
                            <svg
                              viewBox="0 0 20 20"
                              className={`h-4 w-4 shrink-0 text-slate-300 transition ${isLocationMenuOpen ? 'rotate-180' : ''}`}
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              aria-hidden="true"
                            >
                              <path
                                d="M5 7.5 10 12.5 15 7.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>

                          {isLocationMenuOpen ? (
                            <div className="absolute left-0 right-0 top-[calc(100%+0.45rem)] z-30 overflow-hidden rounded-[20px] border border-white/10 bg-[#08131f] shadow-[0_24px_54px_-24px_rgba(0,0,0,0.82)]">
                              <div className="max-h-64 overflow-y-auto p-2">
                                <button
                                  type="button"
                                  onClick={() => {
                                    updateApplicationField('currentLocation', '');
                                    setIsLocationMenuOpen(false);
                                  }}
                                  className={`flex w-full items-center rounded-2xl px-3 py-2.5 text-left text-sm transition ${
                                    !applicationForm.currentLocation
                                      ? 'bg-white/[0.08] text-white'
                                      : 'text-slate-300 hover:bg-white/[0.05] hover:text-white'
                                  }`}
                                  role="option"
                                  aria-selected={!applicationForm.currentLocation}
                                >
                                  Select your current location
                                </button>

                                {currentLocationOptions.map((location) => (
                                  <button
                                    key={location}
                                    type="button"
                                    onClick={() => {
                                      updateApplicationField('currentLocation', location);
                                      setIsLocationMenuOpen(false);
                                    }}
                                    className={`flex w-full items-center rounded-2xl px-3 py-2.5 text-left text-sm transition ${
                                      applicationForm.currentLocation === location
                                        ? 'bg-sky-400/18 text-white'
                                        : 'text-slate-300 hover:bg-white/[0.05] hover:text-white'
                                    }`}
                                    role="option"
                                    aria-selected={applicationForm.currentLocation === location}
                                  >
                                    {location}
                                  </button>
                                ))}
                              </div>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="grid gap-1.5 text-[13px] font-medium text-slate-200">
                        <span>
                          Telegram / WhatsApp <span className="text-rose-300">*</span>
                        </span>
                        <input
                          required
                          type="text"
                          name="telegramWhatsapp"
                          value={applicationForm.telegramWhatsapp}
                          onChange={handleApplicationChange}
                          aria-invalid={Boolean(applicationErrors.telegramWhatsapp)}
                          className={`glass-field py-2.5 text-sm ${applicationErrors.telegramWhatsapp ? 'border-rose-300/60 focus:border-rose-300/60' : ''}`}
                          placeholder="+91 98765 43210 or @username"
                        />
                        {applicationErrors.telegramWhatsapp && (
                          <span className="text-sm text-rose-200">{applicationErrors.telegramWhatsapp}</span>
                        )}
                      </label>

                      <label className="grid gap-1.5 text-[13px] font-medium text-slate-200">
                        <span>
                          Country <span className="text-rose-300">*</span>
                        </span>
                        <select
                          required
                          name="country"
                          value={applicationForm.country}
                          onChange={handleApplicationChange}
                          aria-invalid={Boolean(applicationErrors.country)}
                          className={`glass-field py-2.5 text-sm ${applicationErrors.country ? 'border-rose-300/60 focus:border-rose-300/60' : ''}`}
                        >
                          <option value="">Select country</option>
                          {countryOptions.map((country) => (
                            <option key={country} value={country}>
                              {country}
                            </option>
                          ))}
                        </select>
                        {applicationErrors.country && (
                          <span className="text-sm text-rose-200">{applicationErrors.country}</span>
                        )}
                      </label>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                      <label className="grid gap-1.5 text-[13px] font-medium text-slate-200">
                        <span>
                          Language <span className="text-rose-300">*</span>
                        </span>
                        <select
                          required
                          name="language"
                          value={applicationForm.language}
                          onChange={handleApplicationChange}
                          aria-invalid={Boolean(applicationErrors.language)}
                          className={`glass-field py-2.5 text-sm ${applicationErrors.language ? 'border-rose-300/60 focus:border-rose-300/60' : ''}`}
                        >
                          <option value="">Select language</option>
                          {languageOptions.map((language) => (
                            <option key={language} value={language}>
                              {language}
                            </option>
                          ))}
                        </select>
                        {applicationErrors.language && (
                          <span className="text-sm text-rose-200">{applicationErrors.language}</span>
                        )}
                      </label>

                      <label className="grid gap-1.5 text-[13px] font-medium text-slate-200">
                        <span>
                          Experience Level <span className="text-rose-300">*</span>
                        </span>
                        <select
                          required
                          name="experienceLevel"
                          value={applicationForm.experienceLevel}
                          onChange={handleApplicationChange}
                          aria-invalid={Boolean(applicationErrors.experienceLevel)}
                          className={`glass-field py-2.5 text-sm ${applicationErrors.experienceLevel ? 'border-rose-300/60 focus:border-rose-300/60' : ''}`}
                        >
                          <option value="">Select experience</option>
                          {experienceLevelOptions.map((experienceLevel) => (
                            <option key={experienceLevel} value={experienceLevel}>
                              {experienceLevel}
                            </option>
                          ))}
                        </select>
                        {applicationErrors.experienceLevel && (
                          <span className="text-sm text-rose-200">{applicationErrors.experienceLevel}</span>
                        )}
                      </label>

                      <label className="grid gap-1.5 text-[13px] font-medium text-slate-200">
                        <span>
                          Availability <span className="text-rose-300">*</span>
                        </span>
                        <select
                          required
                          name="availability"
                          value={applicationForm.availability}
                          onChange={handleApplicationChange}
                          aria-invalid={Boolean(applicationErrors.availability)}
                          className={`glass-field py-2.5 text-sm ${applicationErrors.availability ? 'border-rose-300/60 focus:border-rose-300/60' : ''}`}
                        >
                          <option value="">Select availability</option>
                          {availabilityOptions.map((availability) => (
                            <option key={availability} value={availability}>
                              {availability}
                            </option>
                          ))}
                        </select>
                        {applicationErrors.availability && (
                          <span className="text-sm text-rose-200">{applicationErrors.availability}</span>
                        )}
                      </label>
                    </div>

                    <label className="grid gap-1.5 text-[13px] font-medium text-slate-200">
                      <span>
                        Resume Upload <span className="text-rose-300">*</span>
                      </span>
                      <input
                        ref={resumeInputRef}
                        type="file"
                        name="resumeFile"
                        accept=".pdf,.doc,.docx"
                        onChange={handleResumeFileChange}
                        aria-invalid={Boolean(applicationErrors.resumeFileName)}
                        className={`glass-field py-2.5 text-sm file:mr-4 file:rounded-full file:border-0 file:bg-white file:px-4 file:py-2 file:text-sm file:font-semibold file:text-ink-950 ${applicationErrors.resumeFileName ? 'border-rose-300/60 focus:border-rose-300/60' : ''}`}
                      />
                      {applicationErrors.resumeFileName && (
                        <span className="text-sm text-rose-200">{applicationErrors.resumeFileName}</span>
                      )}
                      <span className="text-xs leading-5 text-slate-400">
                        PDF, DOC, or DOCX. Attach this file when your email draft opens.
                      </span>
                    </label>

                    <label className="grid gap-1.5 text-[13px] font-medium text-slate-200">
                      <span>Resume or Portfolio Link</span>
                      <input
                        type="url"
                        name="resumeLink"
                        value={applicationForm.resumeLink}
                        onChange={handleApplicationChange}
                        className="glass-field py-2.5 text-sm"
                        placeholder="Optional: Google Drive resume, portfolio, or LinkedIn profile"
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
