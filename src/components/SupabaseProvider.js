"use client";

import { createContext, useState, useEffect, useMemo } from 'react';

export const SupabaseContext = createContext(null);

export function SupabaseProvider({ supabase, children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
        setLoading(false);
        return;
    };

    // Fetch the initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth state changes (login, logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChanged((_event, session) => {
      setSession(session);
    });

    // Cleanup the subscription when the component unmounts
    return () => subscription.unsubscribe();
  }, [supabase]);

  // Use useMemo to prevent the context value from being recreated on every render
  const value = useMemo(() => ({
    supabase,
    session,
    loading
  }), [supabase, session, loading]);

  return (
    <SupabaseContext.Provider value={value}>
      {children}
    </SupabaseContext.Provider>
  );
}