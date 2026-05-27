import { Link, NavLink, Outlet } from 'react-router-dom';
import BrandMark from '../BrandMark';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { useManagedContent } from '../../context/ManagedContentContext';

const adminNavigation = [
  { label: 'Dashboard', path: '/admin' },
  { label: 'Announcements', path: '/admin/announcements' },
  { label: 'Careers', path: '/admin/careers' },
];

function AdminLayout() {
  const { authLabel, isDemoMode, logout, session } = useAdminAuth();
  const { backendMode, isSaving, lastSyncedAt, syncError } = useManagedContent();

  const formattedSyncTime = lastSyncedAt
    ? new Intl.DateTimeFormat('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }).format(new Date(lastSyncedAt))
    : null;

  const navClassName = ({ isActive }) =>
    [
      'w-full rounded-[18px] border px-4 py-3 text-sm font-medium transition',
      isActive
        ? 'border-sky-400/30 bg-sky-400/12 text-white'
        : 'border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/20 hover:bg-white/[0.06] hover:text-white',
    ].join(' ');

  return (
    <div className="site-shell min-h-screen xl:h-screen xl:overflow-hidden">
      <main className="admin-shell py-6 sm:py-8 xl:h-full">
        <div className="grid min-h-[calc(100dvh-3rem)] gap-6 sm:min-h-[calc(100dvh-4rem)] xl:h-full xl:min-h-0 xl:grid-cols-[280px,minmax(0,1fr)]">
          <aside className="admin-card p-5 sm:p-6 xl:sticky xl:top-0 xl:h-full">
            <div className="flex h-full flex-col gap-6">
              <div className="flex items-start gap-4">
                <BrandMark compact />
                <div className="min-w-0">
                  <p className="admin-label">Admin Portal</p>
                  <p className="mt-1 text-sm text-slate-300">
                    Manage announcements and careers from one place.
                  </p>
                </div>
              </div>

              <nav className="grid gap-2">
                {adminNavigation.map((item) => (
                  <NavLink key={item.path} to={item.path} end={item.path === '/admin'} className={navClassName}>
                    {item.label}
                  </NavLink>
                ))}
              </nav>

              <div className="mt-auto grid gap-3">
                <div className="rounded-[20px] border border-white/10 bg-white/[0.04] p-4">
                  <div>
                    <p className="admin-label">Signed In</p>
                    <p className="mt-1 text-sm font-medium text-white">{session?.username}</p>
                    <p className="mt-3 text-xs uppercase tracking-[0.24em] text-slate-500">
                      {authLabel}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-slate-400">
                      {backendMode === 'supabase'
                        ? isSaving
                          ? 'Connected to Supabase. Saving your latest changes now.'
                          : formattedSyncTime
                            ? `Connected to Supabase. Last synced ${formattedSyncTime}.`
                            : 'Connected to Supabase. Ready to sync shared content.'
                        : 'Local demo mode. Add Supabase keys to turn this into a shared client CMS.'}
                    </p>
                  </div>
                </div>

                <Link to="/" className="admin-button-secondary w-full">
                  View Website
                </Link>
                <button type="button" onClick={logout} className="admin-button-primary w-full">
                  Sign Out
                </button>
              </div>
            </div>
          </aside>

          <section className="min-w-0 xl:h-full xl:overflow-y-auto xl:pr-1">
            <div className="flex min-h-full flex-col rounded-[24px] border border-white/8 bg-white/[0.02] p-4 sm:p-6">
              {syncError ? (
                <div className="mb-4 rounded-[18px] border border-rose-400/24 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">
                  Sync issue: {syncError}
                </div>
              ) : (
                <div className="mb-4 rounded-[18px] border border-sky-400/16 bg-sky-400/8 px-4 py-3 text-sm text-slate-300">
                  {isDemoMode
                    ? 'Local demo mode only. Add Supabase environment variables to enable shared backend storage for the client.'
                    : 'Supabase mode is active. Content now saves to the shared backend and live-syncs across connected browsers.'}
                </div>
              )}
              <Outlet />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;
