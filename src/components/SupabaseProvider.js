"use client";

import { createContext, useState, useEffect, useMemo } from 'react';
import { createClient } from '@/utils/supabase/client';

export const SupabaseContext = createContext(null);


export function SupabaseProvider({children }) {
    const supabase = createClient();
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
        let subscription;
        if (typeof supabase.auth.onAuthStateChange === "function") {
        const { data } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
        subscription = data?.subscription;
        }

        // Cleanup the subscription when the component unmounts
        return () => {
            if (subscription) subscription.unsubscribe();
        };
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