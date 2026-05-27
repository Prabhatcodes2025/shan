import { createContext, useContext, useEffect, useState } from 'react';
import { backendMode, isSupabaseConfigured, supabase } from '../lib/supabase';

const ADMIN_SESSION_STORAGE_KEY = 'sg-admin-session';

export const demoAdminCredentials = {
  username: 'admin',
  password: 'SGAdmin123',
};

const AdminAuthContext = createContext(null);

function buildSupabaseSession(nextSession) {
  const user = nextSession?.user;

  if (!user) {
    return null;
  }

  return {
    username: user.email ?? 'Admin',
    email: user.email ?? '',
    signedInAt: user.last_sign_in_at ?? new Date().toISOString(),
  };
}

function readStoredSession() {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const storedSession = window.localStorage.getItem(ADMIN_SESSION_STORAGE_KEY);
    return storedSession ? JSON.parse(storedSession) : null;
  } catch (error) {
    return null;
  }
}

function persistLocalSession(nextSession) {
  if (typeof window === 'undefined') {
    return;
  }

  if (nextSession) {
    window.localStorage.setItem(ADMIN_SESSION_STORAGE_KEY, JSON.stringify(nextSession));
    return;
  }

  window.localStorage.removeItem(ADMIN_SESSION_STORAGE_KEY);
}

function AdminAuthProvider({ children }) {
  const [session, setSession] = useState(() =>
    isSupabaseConfigured ? null : readStoredSession(),
  );
  const [isLoading, setIsLoading] = useState(isSupabaseConfigured);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      if (typeof window === 'undefined') {
        return undefined;
      }

      const handleStorage = (event) => {
        if (event.key === ADMIN_SESSION_STORAGE_KEY) {
          setSession(readStoredSession());
        }
      };

      window.addEventListener('storage', handleStorage);

      return () => {
        window.removeEventListener('storage', handleStorage);
      };
    }

    let isActive = true;

    const syncInitialSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (!isActive) {
        return;
      }

      if (error) {
        setSession(null);
        setIsLoading(false);
        return;
      }

      setSession(buildSupabaseSession(data.session));
      setIsLoading(false);
    };

    syncInitialSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(buildSupabaseSession(nextSession));
      setIsLoading(false);
    });

    return () => {
      isActive = false;
      subscription.unsubscribe();
    };
  }, []);

  const login = async ({ username, password }) => {
    if (!isSupabaseConfigured) {
      if (username.trim() !== demoAdminCredentials.username || password !== demoAdminCredentials.password) {
        return {
          ok: false,
          error: 'Incorrect username or password.',
        };
      }

      const nextSession = {
        username: demoAdminCredentials.username,
        email: '',
        signedInAt: new Date().toISOString(),
      };

      setSession(nextSession);
      persistLocalSession(nextSession);

      return { ok: true };
    }

    setIsLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: username.trim(),
      password,
    });

    if (error) {
      setIsLoading(false);

      return {
        ok: false,
        error: error.message || 'Unable to sign in right now.',
      };
    }

    setSession(buildSupabaseSession(data.session));
    setIsLoading(false);

    return { ok: true };
  };

  const logout = async () => {
    if (!isSupabaseConfigured) {
      setSession(null);
      persistLocalSession(null);
      return;
    }

    setIsLoading(true);
    await supabase.auth.signOut();
    setSession(null);
    setIsLoading(false);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        authLabel: isSupabaseConfigured ? 'Supabase Auth' : 'Demo login',
        authMode: backendMode,
        isAuthenticated: Boolean(session),
        isDemoMode: !isSupabaseConfigured,
        isLoading,
        isSupabaseConfigured,
        session,
        login,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

function useAdminAuth() {
  const context = useContext(AdminAuthContext);

  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }

  return context;
}

export { AdminAuthProvider, useAdminAuth };
