import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import BrandMark from '../../components/BrandMark';
import globalNetwork from '../../assets/global-network.svg';
import { demoAdminCredentials, useAdminAuth } from '../../context/AdminAuthContext';
import usePageMeta from '../../hooks/usePageMeta';

function AdminLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isLoading, isSupabaseConfigured, login } = useAdminAuth();
  const [formState, setFormState] = useState({
    username: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  usePageMeta('Admin Login');

  if (isLoading && !isAuthenticated) {
    return (
      <div className="site-shell min-h-screen">
        <main className="container-shell flex min-h-screen items-center justify-center py-6">
          <div className="glass-panel max-w-lg p-8 text-center">
            <p className="text-xs uppercase tracking-[0.26em] text-slate-400">Admin Sign In</p>
            <p className="mt-4 font-display text-3xl text-white">Preparing secure sign in...</p>
            <p className="mt-4 text-sm leading-7 text-slate-400">
              We&apos;re checking your admin session and backend connection.
            </p>
          </div>
        </main>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to={location.state?.from?.pathname ?? '/admin'} replace />;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((currentState) => ({
      ...currentState,
      [name]: value,
    }));

    if (errorMessage) {
      setErrorMessage('');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await login(formState);

    if (!result.ok) {
      setErrorMessage(result.error);
      return;
    }

    navigate(location.state?.from?.pathname ?? '/admin', { replace: true });
  };

  return (
    <div className="site-shell min-h-screen lg:h-screen lg:overflow-hidden">
      <main className="container-shell flex min-h-screen items-center py-4 lg:h-screen lg:min-h-0">
        <div className="grid w-full overflow-hidden rounded-[32px] border border-white/10 bg-ink-950/80 shadow-[0_36px_80px_-46px_rgba(0,0,0,0.78)] backdrop-blur-2xl lg:h-[calc(100vh-2rem)] lg:max-h-[680px] lg:grid-cols-[1.1fr,0.9fr]">
          <section className="relative overflow-hidden border-b border-white/10 bg-slate-950 lg:border-b-0 lg:border-r">
            <img
              src={globalNetwork}
              alt="Admin portal illustration"
              className="h-56 w-full object-cover sm:h-72 lg:h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-ink-950/10 via-ink-950/24 to-ink-950/50" />
          </section>

          <section className="flex items-center p-6 sm:p-8 lg:p-10">
            <div className="mx-auto w-full max-w-md space-y-6">
              <BrandMark compact />

              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.26em] text-slate-400">Admin Sign In</p>
                <h1 className="font-display text-4xl text-white sm:text-5xl">Sign in</h1>
                <p className="text-sm leading-7 text-slate-400">
                  {isSupabaseConfigured
                    ? 'Use the admin email and password created in Supabase Auth.'
                    : `Demo login: ${demoAdminCredentials.username} / ${demoAdminCredentials.password}`}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="grid gap-4">
                <label className="grid gap-2 text-sm font-medium text-slate-200">
                  {isSupabaseConfigured ? 'Admin Email' : 'Username'}
                  <input
                    required
                    type={isSupabaseConfigured ? 'email' : 'text'}
                    name="username"
                    value={formState.username}
                    onChange={handleChange}
                    className="glass-field"
                    placeholder={
                      isSupabaseConfigured ? 'admin@company.com' : 'Enter admin username'
                    }
                  />
                </label>

                <label className="grid gap-2 text-sm font-medium text-slate-200">
                  Password
                  <input
                    required
                    type="password"
                    name="password"
                    value={formState.password}
                    onChange={handleChange}
                    className="glass-field"
                    placeholder="Enter admin password"
                  />
                </label>

                {errorMessage && (
                  <div className="rounded-[20px] border border-rose-400/24 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">
                    {errorMessage}
                  </div>
                )}

                <button type="submit" className="btn-primary w-full">
                  {isSupabaseConfigured ? 'Enter Secure Admin Portal' : 'Enter Admin Portal'}
                </button>
              </form>

              <div className="border-t border-white/10 pt-5 text-sm text-slate-400">
                <p className="mb-4 leading-7">
                  {isSupabaseConfigured
                    ? 'This project is connected to Supabase, so admin sign-in uses shared backend auth and content saves to the shared store.'
                    : 'This project is still using local demo mode until Supabase environment variables are added.'}
                </p>
                <Link to="/" className="font-medium text-forest-300 transition hover:text-forest-200">
                  Back to website
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default AdminLoginPage;
