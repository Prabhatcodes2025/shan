import { useEffect, useState } from 'react';
import { useManagedContent } from '../../context/ManagedContentContext';
import usePageMeta from '../../hooks/usePageMeta';

const careerCopyFields = [
  {
    key: 'heroTitle',
    label: 'Hero Title',
    type: 'text',
  },
  {
    key: 'heroDescription',
    label: 'Hero Description',
    type: 'textarea',
  },
  {
    key: 'workingStyle',
    label: 'Working Style Copy',
    type: 'textarea',
  },
  {
    key: 'growthEyebrow',
    label: 'Growth Section Label',
    type: 'text',
  },
  {
    key: 'growthTitle',
    label: 'Growth Section Title',
    type: 'textarea',
  },
  {
    key: 'growthDescription',
    label: 'Growth Section Description',
    type: 'textarea',
  },
  {
    key: 'cultureEyebrow',
    label: 'Culture Section Label',
    type: 'text',
  },
  {
    key: 'cultureTitle',
    label: 'Culture Section Title',
    type: 'textarea',
  },
  {
    key: 'cultureDescription',
    label: 'Culture Section Description',
    type: 'textarea',
  },
  {
    key: 'rolesEyebrow',
    label: 'Roles Section Label',
    type: 'text',
  },
  {
    key: 'rolesTitle',
    label: 'Roles Section Title',
    type: 'textarea',
  },
  {
    key: 'rolesDescription',
    label: 'Roles Section Description',
    type: 'textarea',
  },
];

const emptyRoleForm = {
  title: '',
  type: '',
  location: '',
  summary: '',
};

function pickCareerCopyFields(careers) {
  return careerCopyFields.reduce((nextFields, field) => {
    nextFields[field.key] = careers[field.key] ?? '';
    return nextFields;
  }, {});
}

function AdminCareersPage() {
  const { isSaving, managedContent, updateCareers } = useManagedContent();
  const [careerCopy, setCareerCopy] = useState(() =>
    pickCareerCopyFields(managedContent.careers),
  );
  const [benefitValue, setBenefitValue] = useState('');
  const [editingBenefitIndex, setEditingBenefitIndex] = useState(null);
  const [roleFormState, setRoleFormState] = useState(emptyRoleForm);
  const [editingRoleIndex, setEditingRoleIndex] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null);

  usePageMeta('Admin Careers');

  useEffect(() => {
    setCareerCopy(pickCareerCopyFields(managedContent.careers));
  }, [managedContent.careers]);

  const handleCopyChange = (event) => {
    const { name, value } = event.target;
    setCareerCopy((currentState) => ({
      ...currentState,
      [name]: value,
    }));
  };

  const handleSaveCopy = async (event) => {
    event.preventDefault();

    const nextCopy = Object.fromEntries(
      Object.entries(careerCopy).map(([key, value]) => [key, value.trim()]),
    );
    const result = await updateCareers(nextCopy);

    if (!result.ok) {
      setStatusMessage({
        tone: 'border-rose-400/24 bg-rose-400/10 text-rose-100',
        text: result.error || 'Unable to save the careers page copy right now.',
      });
      return;
    }

    setStatusMessage({
      tone: 'border-emerald-400/24 bg-emerald-400/10 text-emerald-100',
      text: 'Careers page copy saved and synced successfully.',
    });
  };

  const handleBenefitSubmit = async (event) => {
    event.preventDefault();
    const trimmedBenefit = benefitValue.trim();

    if (!trimmedBenefit) {
      return;
    }

    const nextBenefits = [...managedContent.careers.benefits];

    if (editingBenefitIndex !== null) {
      nextBenefits[editingBenefitIndex] = trimmedBenefit;
    } else {
      nextBenefits.unshift(trimmedBenefit);
    }

    const result = await updateCareers({ benefits: nextBenefits });

    if (!result.ok) {
      setStatusMessage({
        tone: 'border-rose-400/24 bg-rose-400/10 text-rose-100',
        text: result.error || 'Unable to save this benefit right now.',
      });
      return;
    }

    setBenefitValue('');
    setEditingBenefitIndex(null);
    setStatusMessage({
      tone: 'border-emerald-400/24 bg-emerald-400/10 text-emerald-100',
      text:
        editingBenefitIndex !== null
          ? 'Benefit updated and synced successfully.'
          : 'Benefit added and synced successfully.',
    });
  };

  const handleDeleteBenefit = async (indexToDelete) => {
    if (!window.confirm('Delete this career benefit from the page?')) {
      return;
    }

    const result = await updateCareers({
      benefits: managedContent.careers.benefits.filter((_, index) => index !== indexToDelete),
    });

    if (!result.ok) {
      setStatusMessage({
        tone: 'border-rose-400/24 bg-rose-400/10 text-rose-100',
        text: result.error || 'Unable to delete this benefit right now.',
      });
      return;
    }

    if (editingBenefitIndex === indexToDelete) {
      setBenefitValue('');
      setEditingBenefitIndex(null);
    } else if (editingBenefitIndex !== null && indexToDelete < editingBenefitIndex) {
      setEditingBenefitIndex(editingBenefitIndex - 1);
    }

    setStatusMessage({
      tone: 'border-amber-400/24 bg-amber-400/10 text-amber-100',
      text: 'Benefit removed successfully.',
    });
  };

  const handleRoleChange = (event) => {
    const { name, value } = event.target;
    setRoleFormState((currentState) => ({
      ...currentState,
      [name]: value,
    }));
  };

  const handleRoleSubmit = async (event) => {
    event.preventDefault();

    const nextRole = Object.fromEntries(
      Object.entries(roleFormState).map(([key, value]) => [key, value.trim()]),
    );
    const nextRoles = [...managedContent.careers.roles];

    if (editingRoleIndex !== null) {
      nextRoles[editingRoleIndex] = nextRole;
    } else {
      nextRoles.unshift(nextRole);
    }

    const result = await updateCareers({ roles: nextRoles });

    if (!result.ok) {
      setStatusMessage({
        tone: 'border-rose-400/24 bg-rose-400/10 text-rose-100',
        text: result.error || 'Unable to save this role right now.',
      });
      return;
    }

    setRoleFormState(emptyRoleForm);
    setEditingRoleIndex(null);
    setStatusMessage({
      tone: 'border-emerald-400/24 bg-emerald-400/10 text-emerald-100',
      text:
        editingRoleIndex !== null
          ? 'Role updated and synced successfully.'
          : 'Role added and synced successfully.',
    });
  };

  const handleDeleteRole = async (indexToDelete) => {
    if (!window.confirm('Delete this role from the careers page?')) {
      return;
    }

    const result = await updateCareers({
      roles: managedContent.careers.roles.filter((_, index) => index !== indexToDelete),
    });

    if (!result.ok) {
      setStatusMessage({
        tone: 'border-rose-400/24 bg-rose-400/10 text-rose-100',
        text: result.error || 'Unable to delete this role right now.',
      });
      return;
    }

    if (editingRoleIndex === indexToDelete) {
      setRoleFormState(emptyRoleForm);
      setEditingRoleIndex(null);
    } else if (editingRoleIndex !== null && indexToDelete < editingRoleIndex) {
      setEditingRoleIndex(editingRoleIndex - 1);
    }

    setStatusMessage({
      tone: 'border-amber-400/24 bg-amber-400/10 text-amber-100',
      text: 'Role removed successfully.',
    });
  };

  const handleBenefitEdit = (benefit, index) => {
    setBenefitValue(benefit);
    setEditingBenefitIndex(index);
    setStatusMessage(null);
  };

  const handleRoleEdit = (role, index) => {
    setRoleFormState(role);
    setEditingRoleIndex(index);
    setStatusMessage(null);
  };

  const handleCancelBenefitEdit = () => {
    setBenefitValue('');
    setEditingBenefitIndex(null);
    setStatusMessage(null);
  };

  const handleCancelRoleEdit = () => {
    setRoleFormState(emptyRoleForm);
    setEditingRoleIndex(null);
    setStatusMessage(null);
  };

  return (
    <div className="admin-page">
      <section className="space-y-2">
        <p className="admin-label">Content Management</p>
        <h1 className="admin-page-title">Careers</h1>
        <p className="admin-page-copy max-w-3xl">
          This section covers both the editorial copy on the careers page and the actual benefit
          and job-role blocks shown to visitors.
        </p>
      </section>

      {statusMessage && (
        <div className={`rounded-[18px] border px-4 py-3 text-sm ${statusMessage.tone}`}>
          {statusMessage.text}
        </div>
      )}

      <section className="grid gap-6">
        <form onSubmit={handleSaveCopy} className="admin-card p-6">
          <div className="space-y-6">
            <div>
              <p className="admin-label">Page Copy</p>
              <p className="mt-3 text-2xl font-semibold text-white">
                Edit the main careers page text.
              </p>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              {careerCopyFields.map((field) => (
                <label key={field.key} className="grid gap-2 text-sm font-medium text-slate-200">
                  {field.label}
                  {field.type === 'textarea' ? (
                    <textarea
                      required
                      rows="4"
                      name={field.key}
                      value={careerCopy[field.key]}
                      onChange={handleCopyChange}
                      className="admin-input"
                    />
                  ) : (
                    <input
                      required
                      type="text"
                      name={field.key}
                      value={careerCopy[field.key]}
                      onChange={handleCopyChange}
                      className="admin-input"
                    />
                  )}
                </label>
              ))}
            </div>

            <button type="submit" className="admin-button-primary" disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save Careers Page Copy'}
            </button>
          </div>
        </form>

        <div className="grid gap-6 xl:grid-cols-[0.82fr,1.18fr]">
          <section className="admin-card p-6">
            <div className="space-y-6">
              <div>
                <p className="admin-label">Benefits</p>
                <p className="mt-3 text-2xl font-semibold text-white">
                  Manage the culture cards.
                </p>
              </div>

              <form onSubmit={handleBenefitSubmit} className="grid gap-4">
                <label className="grid gap-2 text-sm font-medium text-slate-200">
                  Benefit Copy
                  <textarea
                    required
                    rows="4"
                    value={benefitValue}
                    onChange={(event) => setBenefitValue(event.target.value)}
                    className="admin-input"
                    placeholder="Outcome-focused work with room for ownership"
                  />
                </label>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <button type="submit" className="admin-button-primary" disabled={isSaving}>
                    {isSaving
                      ? 'Saving...'
                      : editingBenefitIndex !== null
                        ? 'Save Benefit'
                        : 'Add Benefit'}
                  </button>
                  {editingBenefitIndex !== null && (
                    <button
                      type="button"
                      onClick={handleCancelBenefitEdit}
                      className="admin-button-secondary"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>
              </form>
            </div>
          </section>

          <section className="grid gap-4">
            {managedContent.careers.benefits.length ? (
              managedContent.careers.benefits.map((benefit, index) => (
                <article key={`${benefit}-${index}`} className="admin-card p-6">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                    <p className="max-w-2xl text-sm leading-7 text-slate-200">{benefit}</p>
                    <div className="flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => handleBenefitEdit(benefit, index)}
                        className="admin-button-secondary"
                        disabled={isSaving}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteBenefit(index)}
                        className="admin-button-primary"
                        disabled={isSaving}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="admin-card p-7 text-sm leading-7 text-slate-300">
                No benefits added yet. Create one to populate the culture section.
              </div>
            )}
          </section>
        </div>

        <section className="grid gap-6 xl:grid-cols-[0.84fr,1.16fr]">
          <form onSubmit={handleRoleSubmit} className="admin-card p-6">
            <div className="space-y-6">
              <div>
                <p className="admin-label">Open Roles</p>
                <p className="mt-3 text-2xl font-semibold text-white">
                  {editingRoleIndex !== null ? 'Update role details' : 'Create a new job listing'}
                </p>
              </div>

              <label className="grid gap-2 text-sm font-medium text-slate-200">
                Role Title
                <input
                  required
                  type="text"
                  name="title"
                  value={roleFormState.title}
                  onChange={handleRoleChange}
                  className="admin-input"
                  placeholder="Localization Project Coordinator"
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-medium text-slate-200">
                  Employment Type
                  <input
                    required
                    type="text"
                    name="type"
                    value={roleFormState.type}
                    onChange={handleRoleChange}
                    className="admin-input"
                    placeholder="Full Time"
                  />
                </label>

                <label className="grid gap-2 text-sm font-medium text-slate-200">
                  Location
                  <input
                    required
                    type="text"
                    name="location"
                    value={roleFormState.location}
                    onChange={handleRoleChange}
                    className="admin-input"
                    placeholder="Remote / India"
                  />
                </label>
              </div>

              <label className="grid gap-2 text-sm font-medium text-slate-200">
                Role Summary
                <textarea
                  required
                  rows="5"
                  name="summary"
                  value={roleFormState.summary}
                  onChange={handleRoleChange}
                  className="admin-input"
                  placeholder="Describe the role, responsibilities, and expectations."
                />
              </label>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button type="submit" className="admin-button-primary" disabled={isSaving}>
                  {isSaving
                    ? 'Saving...'
                    : editingRoleIndex !== null
                      ? 'Save Role'
                      : 'Add Role'}
                </button>
                {editingRoleIndex !== null && (
                  <button
                    type="button"
                    onClick={handleCancelRoleEdit}
                    className="admin-button-secondary"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>
            </div>
          </form>

          <div className="grid gap-5">
            {managedContent.careers.roles.length ? (
              managedContent.careers.roles.map((role, index) => (
                <article key={`${role.title}-${index}`} className="admin-card p-6">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="max-w-3xl">
                      <p className="text-2xl font-semibold text-white">{role.title}</p>
                      <p className="mt-4 text-sm leading-7 text-slate-300">{role.summary}</p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.24em] text-slate-400">
                        <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 backdrop-blur">
                          {role.type}
                        </span>
                        <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 backdrop-blur">
                          {role.location}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <button
                          type="button"
                          onClick={() => handleRoleEdit(role, index)}
                          className="admin-button-secondary"
                          disabled={isSaving}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteRole(index)}
                          className="admin-button-primary"
                          disabled={isSaving}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="admin-card p-7 text-sm leading-7 text-slate-300">
                No open roles listed yet. Add one from the form to populate the public page.
              </div>
            )}
          </div>
        </section>
      </section>
    </div>
  );
}

export default AdminCareersPage;
