import { createContext, useContext, useEffect, useRef, useState } from 'react';
import {
  createDefaultManagedContent,
  createManagedContentBackup,
  MANAGED_CONTENT_STORAGE_KEY,
  normalizeManagedContent,
  parseManagedContentBackup,
} from '../data/managedContent';
import {
  backendLabel,
  backendMode,
  isSupabaseConfigured,
  SITE_CONTENT_KEY,
  SITE_CONTENT_TABLE,
  supabase,
} from '../lib/supabase';

const ManagedContentContext = createContext(null);

function readManagedContent() {
  if (typeof window === 'undefined') {
    return createDefaultManagedContent();
  }

  try {
    const storedContent = window.localStorage.getItem(MANAGED_CONTENT_STORAGE_KEY);

    if (!storedContent) {
      return createDefaultManagedContent();
    }

    return normalizeManagedContent(JSON.parse(storedContent));
  } catch (error) {
    return createDefaultManagedContent();
  }
}

function writeManagedContent(nextContent) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(MANAGED_CONTENT_STORAGE_KEY, JSON.stringify(nextContent));
}

async function loadManagedContentFromSupabase() {
  const { data, error } = await supabase
    .from(SITE_CONTENT_TABLE)
    .select('content, updated_at')
    .eq('key', SITE_CONTENT_KEY)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return {
    managedContent: data?.content
      ? normalizeManagedContent(data.content)
      : createDefaultManagedContent(),
    updatedAt: data?.updated_at ?? null,
  };
}

async function saveManagedContentToSupabase(nextContent) {
  const payload = createManagedContentBackup(nextContent).managedContent;

  const { data, error } = await supabase
    .from(SITE_CONTENT_TABLE)
    .upsert(
      {
        key: SITE_CONTENT_KEY,
        content: payload,
      },
      {
        onConflict: 'key',
      },
    )
    .select('updated_at')
    .single();

  if (error) {
    throw error;
  }

  return {
    managedContent: payload,
    updatedAt: data?.updated_at ?? new Date().toISOString(),
  };
}

function ManagedContentProvider({ children }) {
  const [managedContent, setManagedContent] = useState(() =>
    isSupabaseConfigured ? createDefaultManagedContent() : readManagedContent(),
  );
  const [isLoading, setIsLoading] = useState(isSupabaseConfigured);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSyncedAt, setLastSyncedAt] = useState(null);
  const [syncError, setSyncError] = useState('');
  const managedContentRef = useRef(managedContent);

  useEffect(() => {
    managedContentRef.current = managedContent;
  }, [managedContent]);

  const applyManagedContentSnapshot = (nextSnapshot) => {
    managedContentRef.current = nextSnapshot.managedContent;
    setManagedContent(nextSnapshot.managedContent);
    setLastSyncedAt(nextSnapshot.updatedAt);
    setSyncError('');
  };

  useEffect(() => {
    if (isSupabaseConfigured || typeof window === 'undefined') {
      return undefined;
    }

    const handleStorage = (event) => {
      if (event.key === MANAGED_CONTENT_STORAGE_KEY) {
        setManagedContent(readManagedContent());
      }
    };

    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      return undefined;
    }

    let isActive = true;

    const syncRemoteContent = async () => {
      try {
        const nextSnapshot = await loadManagedContentFromSupabase();

        if (!isActive) {
          return;
        }

        applyManagedContentSnapshot(nextSnapshot);
      } catch (error) {
        if (!isActive) {
          return;
        }

        setSyncError(
          error instanceof Error
            ? error.message
            : 'Unable to load content from Supabase right now.',
        );
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    const liveContentChannel = supabase
      .channel(`site-content:${SITE_CONTENT_KEY}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: SITE_CONTENT_TABLE,
          filter: `key=eq.${SITE_CONTENT_KEY}`,
        },
        (payload) => {
          if (!isActive) {
            return;
          }

          if (payload.eventType === 'DELETE') {
            applyManagedContentSnapshot({
              managedContent: createDefaultManagedContent(),
              updatedAt: new Date().toISOString(),
            });
            return;
          }

          const nextContent = payload.new?.content;

          if (!nextContent) {
            return;
          }

          applyManagedContentSnapshot({
            managedContent: normalizeManagedContent(nextContent),
            updatedAt: payload.new.updated_at ?? new Date().toISOString(),
          });
        },
      )
      .subscribe((status) => {
        if (!isActive) {
          return;
        }

        if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
          setSyncError(
            'Live sync connection to Supabase was interrupted. You can keep editing and refresh when needed.',
          );
        }
      });

    syncRemoteContent();

    return () => {
      isActive = false;
      supabase.removeChannel(liveContentChannel);
    };
  }, []);

  const refreshManagedContent = async () => {
    if (!isSupabaseConfigured) {
      const nextContent = readManagedContent();
      managedContentRef.current = nextContent;
      setManagedContent(nextContent);
      setLastSyncedAt(new Date().toISOString());
      setSyncError('');

      return { ok: true };
    }

    setIsLoading(true);

    try {
      const nextSnapshot = await loadManagedContentFromSupabase();
      applyManagedContentSnapshot(nextSnapshot);
      return { ok: true };
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Unable to refresh content from Supabase right now.';

      setSyncError(message);
      return { ok: false, error: message };
    } finally {
      setIsLoading(false);
    }
  };

  const commitManagedContent = async (nextContent, previousContent) => {
    const normalizedContent = normalizeManagedContent(nextContent);

    managedContentRef.current = normalizedContent;
    setManagedContent(normalizedContent);
    setSyncError('');

    if (!isSupabaseConfigured) {
      writeManagedContent(normalizedContent);
      setLastSyncedAt(new Date().toISOString());
      return { ok: true };
    }

    setIsSaving(true);

    try {
      const nextSnapshot = await saveManagedContentToSupabase(normalizedContent);
      applyManagedContentSnapshot(nextSnapshot);
      return { ok: true };
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Unable to save content to Supabase right now.';

      managedContentRef.current = previousContent;
      setManagedContent(previousContent);
      setSyncError(message);

      return {
        ok: false,
        error: message,
      };
    } finally {
      setIsSaving(false);
    }
  };

  const updateAnnouncements = (announcements) => {
    const previousContent = managedContentRef.current;

    return commitManagedContent(
      {
        ...previousContent,
        announcements,
      },
      previousContent,
    );
  };

  const updateCareers = (updates) => {
    const previousContent = managedContentRef.current;

    return commitManagedContent(
      {
        ...previousContent,
        careers: {
          ...previousContent.careers,
          ...updates,
        },
      },
      previousContent,
    );
  };

  const importManagedContent = (payload) => {
    const previousContent = managedContentRef.current;
    const nextContent = parseManagedContentBackup(payload);

    return commitManagedContent(nextContent, previousContent);
  };

  const resetManagedContent = () => {
    const previousContent = managedContentRef.current;
    const nextContent = createDefaultManagedContent();

    return commitManagedContent(nextContent, previousContent);
  };

  return (
    <ManagedContentContext.Provider
      value={{
        backendLabel,
        backendMode,
        importManagedContent,
        isLoading,
        isSaving,
        isSupabaseConfigured,
        lastSyncedAt,
        managedContent,
        refreshManagedContent,
        resetManagedContent,
        syncError,
        updateAnnouncements,
        updateCareers,
      }}
    >
      {children}
    </ManagedContentContext.Provider>
  );
}

function useManagedContent() {
  const context = useContext(ManagedContentContext);

  if (!context) {
    throw new Error('useManagedContent must be used within a ManagedContentProvider');
  }

  return context;
}

export { ManagedContentProvider, useManagedContent };
