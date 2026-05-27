import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';

function AdminProtectedRoute() {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="site-shell min-h-screen">
        <main className="container-shell flex min-h-screen items-center justify-center py-6">
          <div className="glass-panel max-w-lg p-8 text-center">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Admin Access</p>
            <p className="mt-4 font-display text-3xl text-white">Checking your session...</p>
            <p className="mt-4 text-sm leading-7 text-slate-400">
              Hold on while we confirm your admin access.
            </p>
          </div>
        </main>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

export default AdminProtectedRoute;
