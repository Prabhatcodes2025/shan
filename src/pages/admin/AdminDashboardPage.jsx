import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useManagedContent } from '../../context/ManagedContentContext';
import { createManagedContentBackup } from '../../data/managedContent';
import usePageMeta from '../../hooks/usePageMeta';

const dashboardMetrics = [
  {
    key: 'announcements',
    label: 'Announcements',
    tone: 'text-forest-300',
    getValue: (managedContent) => managedContent.announcements.length,
  },
  {
    key: 'benefits',
    label: 'Career Benefits',
    tone: 'text-ocean-300',
    getValue: (managedContent) => managedContent.careers.benefits.length,
  },
  {
    key: 'roles',
    label: 'Open Roles',
    tone: 'text-slate-200',
    getValue: (managedContent) => managedContent.careers.roles.length,
  },
];

function AdminDashboardPage() {
  const {
    backendLabel,
    backendMode,
    importManagedContent,
    isLoading,
    isSaving,
    managedContent,
    refreshManagedContent,
    resetManagedContent,
  } = useManagedContent();
  const latestAnnouncement = managedContent.announcements[0];
  const latestRole = managedContent.careers.roles[0];
  const fileInputRef = useRef(null);
  const [handoverMessage, setHandoverMessage] = useState(null);

  usePageMeta('Admin Dashboard');

  const showStatusMessage = (tone, text) => {
    setHandoverMessage({ tone, text });
  };

  const handleReset = async () => {
    if (!window.confirm('Reset the portal content back to the original site copy?')) {
      return;
    }

    const result = await resetManagedContent();

    if (result.ok) {
      showStatusMessage(
        'border-amber-400/24 bg-amber-400/10 text-amber-100',
        'Content reset to the original site copy.',
      );
      return;
    }

    showStatusMessage(
      'border-rose-400/24 bg-rose-400/10 text-rose-100',
      result.error || 'Unable to reset content right now.',
    );
  };

  const handleExport = () => {
    const backup = createManagedContentBackup(managedContent);
    const fileName = `shan-globalization-content-${new Date().toISOString().slice(0, 10)}.json`;
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const downloadUrl = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');

    anchor.href = downloadUrl;
    anchor.download = fileName;
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    window.URL.revokeObjectURL(downloadUrl);

    showStatusMessage(
      'border-emerald-400/24 bg-emerald-400/10 text-emerald-100',
      `Content backup downloaded as ${fileName}.`,
    );
  };

  const handleRefresh = async () => {
    const result = await refreshManagedContent();

    if (result.ok) {
      showStatusMessage(
        'border-emerald-400/24 bg-emerald-400/10 text-emerald-100',
        backendMode === 'supabase'
          ? 'Latest content loaded from Supabase.'
          : 'Latest local browser content loaded.',
      );
      return;
    }

    showStatusMessage(
      'border-rose-400/24 bg-rose-400/10 text-rose-100',
      result.error || 'Unable to refresh content right now.',
    );
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleImportFile = async (event) => {
    const input = event.target;
    const [file] = input.files ?? [];

    if (!file) {
      return;
    }

    try {
      const fileContent = await file.text();
      const result = await importManagedContent(JSON.parse(fileContent));

      if (!result.ok) {
        showStatusMessage(
          'border-rose-400/24 bg-rose-400/10 text-rose-100',
          result.error || 'Unable to import the selected file.',
        );
        return;
      }

      showStatusMessage(
        'border-emerald-400/24 bg-emerald-400/10 text-emerald-100',
        `${file.name} imported successfully.`,
      );
    } catch (error) {
      showStatusMessage(
        'border-rose-400/24 bg-rose-400/10 text-rose-100',
        error instanceof SyntaxError
          ? 'The selected file is not valid JSON.'
          : error instanceof Error
            ? error.message
            : 'Unable to import the selected file.',
      );
    } finally {
      input.value = '';
    }
  };

  return (
    <div className="admin-page">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <p className="admin-label">Overview</p>
          <h1 className="admin-page-title">Dashboard</h1>
          <p className="admin-page-copy">
            Review content totals, check backend sync mode, and jump into the sections you want
            to manage.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link to="/admin/announcements" className="admin-button-secondary">
            Manage Announcements
          </Link>
          <Link to="/admin/careers" className="admin-button-secondary">
            Manage Careers
          </Link>
          <button type="button" onClick={handleRefresh} className="admin-button-secondary">
            {backendMode === 'supabase' ? 'Refresh from Supabase' : 'Refresh Local Content'}
          </button>
          <button type="button" onClick={handleReset} className="admin-button-primary">
            Reset Content
          </button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-[1.1fr,0.9fr,0.9fr,0.9fr]">
        <article className="admin-card p-5">
          <p className="admin-label">Backend</p>
          <p className="mt-3 text-2xl font-semibold text-white">{backendLabel}</p>
          <p className="mt-3 text-sm leading-7 text-slate-400">
            {backendMode === 'supabase'
              ? isLoading
                ? 'Loading shared content from Supabase.'
                : isSaving
                  ? 'Saving your latest changes to the backend.'
                  : 'Shared client-ready mode is active.'
              : 'Browser-only fallback mode is active until Supabase is configured.'}
          </p>
        </article>

        {dashboardMetrics.map((item) => (
          <article key={item.key} className="admin-card p-5">
            <p className="admin-label">{item.label}</p>
            <p className={`mt-3 text-4xl font-semibold ${item.tone}`}>
              {item.getValue(managedContent)}
            </p>
          </article>
        ))}
      </section>

      <section className="admin-card p-6">
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json"
          onChange={handleImportFile}
          className="hidden"
        />

        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <p className="admin-label">Client Handover</p>
            <p className="mt-3 text-2xl font-semibold text-white">
              Keep a portable backup even with the backend connected.
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              {backendMode === 'supabase'
                ? 'This project now saves managed content in Supabase, and the JSON backup gives you an extra handover copy for the client.'
                : 'This project is still in local fallback mode, so export a JSON backup now and then connect Supabase for shared editing later.'}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={handleExport} className="admin-button-secondary">
              Export JSON
            </button>
            <button type="button" onClick={handleImportClick} className="admin-button-primary">
              Import JSON
            </button>
          </div>
        </div>

        {handoverMessage && (
          <div className={`mt-5 rounded-[18px] border px-4 py-3 text-sm ${handoverMessage.tone}`}>
            {handoverMessage.text}
          </div>
        )}
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <article className="admin-card p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="admin-label text-forest-300">Latest Announcement</p>
              <p className="mt-3 text-2xl font-semibold text-white">
                {latestAnnouncement?.title ?? 'No announcement published yet.'}
              </p>
            </div>
            <Link to="/admin/announcements" className="admin-button-secondary">
              Open
            </Link>
          </div>
          {latestAnnouncement && (
            <>
              <p className="mt-5 text-xs uppercase tracking-[0.24em] text-slate-400">
                {latestAnnouncement.category} • {latestAnnouncement.date}
              </p>
              <p className="mt-4 text-sm leading-7 text-slate-300">{latestAnnouncement.summary}</p>
            </>
          )}
        </article>

        <article className="admin-card p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="admin-label text-ocean-300">Latest Role</p>
              <p className="mt-3 text-2xl font-semibold text-white">
                {latestRole?.title ?? 'No open roles listed yet.'}
              </p>
            </div>
            <Link to="/admin/careers" className="admin-button-secondary">
              Open
            </Link>
          </div>
          {latestRole && (
            <>
              <p className="mt-5 text-xs uppercase tracking-[0.24em] text-slate-400">
                {latestRole.type} • {latestRole.location}
              </p>
              <p className="mt-4 text-sm leading-7 text-slate-300">{latestRole.summary}</p>
            </>
          )}
        </article>
      </section>
    </div>
  );
}

export default AdminDashboardPage;
