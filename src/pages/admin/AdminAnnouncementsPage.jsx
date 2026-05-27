import { useState } from 'react';
import { useManagedContent } from '../../context/ManagedContentContext';
import usePageMeta from '../../hooks/usePageMeta';

const emptyAnnouncementForm = {
  date: '',
  category: '',
  title: '',
  summary: '',
};

function AdminAnnouncementsPage() {
  const { isSaving, managedContent, updateAnnouncements } = useManagedContent();
  const [formState, setFormState] = useState(emptyAnnouncementForm);
  const [editingIndex, setEditingIndex] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null);

  usePageMeta('Admin Announcements');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((currentState) => ({
      ...currentState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextAnnouncement = {
      date: formState.date.trim(),
      category: formState.category.trim(),
      title: formState.title.trim(),
      summary: formState.summary.trim(),
    };

    const nextAnnouncements =
      editingIndex !== null
        ? managedContent.announcements.map((item, index) =>
            index === editingIndex ? nextAnnouncement : item,
          )
        : [nextAnnouncement, ...managedContent.announcements];

    const result = await updateAnnouncements(nextAnnouncements);

    if (!result.ok) {
      setStatusMessage({
        tone: 'border-rose-400/24 bg-rose-400/10 text-rose-100',
        text: result.error || 'Unable to save this announcement right now.',
      });
      return;
    }

    setFormState(emptyAnnouncementForm);
    setEditingIndex(null);
    setStatusMessage({
      tone: 'border-emerald-400/24 bg-emerald-400/10 text-emerald-100',
      text:
        editingIndex !== null
          ? 'Announcement updated and synced successfully.'
          : 'Announcement published and synced successfully.',
    });
  };

  const handleEdit = (item, index) => {
    setFormState(item);
    setEditingIndex(index);
    setStatusMessage(null);
  };

  const handleDelete = async (indexToDelete) => {
    if (!window.confirm('Delete this announcement from the portal?')) {
      return;
    }

    const result = await updateAnnouncements(
      managedContent.announcements.filter((_, index) => index !== indexToDelete),
    );

    if (!result.ok) {
      setStatusMessage({
        tone: 'border-rose-400/24 bg-rose-400/10 text-rose-100',
        text: result.error || 'Unable to delete this announcement right now.',
      });
      return;
    }

    if (editingIndex === indexToDelete) {
      setFormState(emptyAnnouncementForm);
      setEditingIndex(null);
    } else if (editingIndex !== null && indexToDelete < editingIndex) {
      setEditingIndex(editingIndex - 1);
    }

    setStatusMessage({
      tone: 'border-amber-400/24 bg-amber-400/10 text-amber-100',
      text: 'Announcement removed successfully.',
    });
  };

  const handleCancelEdit = () => {
    setFormState(emptyAnnouncementForm);
    setEditingIndex(null);
    setStatusMessage(null);
  };

  return (
    <div className="admin-page">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <p className="admin-label">Content Management</p>
          <h1 className="admin-page-title">Announcements</h1>
          <p className="admin-page-copy">
            Create, update, and remove items shown on the public announcement page.
          </p>
        </div>

        <div className="admin-card min-w-[180px] px-5 py-4">
          <p className="admin-label">Published</p>
          <p className="mt-2 text-4xl font-semibold text-white">
            {managedContent.announcements.length}
          </p>
        </div>
      </section>

      {statusMessage && (
        <div className={`rounded-[18px] border px-4 py-3 text-sm ${statusMessage.tone}`}>
          {statusMessage.text}
        </div>
      )}

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.08fr),380px] xl:items-start">
        <div className="space-y-4">
          {managedContent.announcements.length ? (
            managedContent.announcements.map((item, index) => (
              <article key={`${item.title}-${index}`} className="admin-card p-5 sm:p-6">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0 max-w-3xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="admin-pill">{item.category}</span>
                      <span className="text-sm text-slate-400">{item.date}</span>
                    </div>
                    <p className="mt-3 text-xl font-semibold text-white">{item.title}</p>
                    <p className="mt-3 text-sm leading-7 text-slate-400">{item.summary}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => handleEdit(item, index)}
                      className="admin-button-secondary"
                      disabled={isSaving}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(index)}
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
            <div className="admin-card p-6 text-sm leading-7 text-slate-300">
              No announcements yet. Add one from the form to populate the public page.
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="admin-card p-6 xl:sticky xl:top-28">
          <div className="space-y-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="admin-label">
                  {editingIndex !== null ? 'Edit Announcement' : 'New Announcement'}
                </p>
                <p className="mt-2 text-2xl font-semibold text-white">
                  {editingIndex !== null ? 'Update announcement' : 'Create announcement'}
                </p>
              </div>
              {editingIndex !== null && (
                <button type="button" onClick={handleCancelEdit} className="admin-button-secondary">
                  Cancel
                </button>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
              <label className="grid gap-2 text-sm font-medium text-slate-200">
                Date
                <input
                  required
                  type="text"
                  name="date"
                  value={formState.date}
                  onChange={handleChange}
                  className="admin-input"
                  placeholder="May 2026"
                />
              </label>

              <label className="grid gap-2 text-sm font-medium text-slate-200">
                Category
                <input
                  required
                  type="text"
                  name="category"
                  value={formState.category}
                  onChange={handleChange}
                  className="admin-input"
                  placeholder="Service Update"
                />
              </label>
            </div>

            <label className="grid gap-2 text-sm font-medium text-slate-200">
              Title
              <input
                required
                type="text"
                name="title"
                value={formState.title}
                onChange={handleChange}
                className="admin-input"
                placeholder="Write a concise headline"
              />
            </label>

            <label className="grid gap-2 text-sm font-medium text-slate-200">
              Summary
              <textarea
                required
                rows="5"
                name="summary"
                value={formState.summary}
                onChange={handleChange}
                className="admin-input"
                placeholder="Add the public-facing summary for this announcement."
              />
            </label>

            <button type="submit" className="admin-button-primary w-full" disabled={isSaving}>
              {isSaving
                ? 'Saving...'
                : editingIndex !== null
                  ? 'Save Announcement'
                  : 'Publish Announcement'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default AdminAnnouncementsPage;
