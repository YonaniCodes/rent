"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

type SupabaseContextType = {
  supabase: SupabaseClient;
};

const SupabaseContext = createContext<SupabaseContextType | undefined>(
  undefined
);

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    async function initializeSupabase() {
      try {
        // Fetch JWT from server endpoint
        const response = await fetch("/api/auth/token");
        if (!response.ok) {
          console.error("Failed to fetch token:", await response.text());
          return;
        }

        const data = await response.json();
        if (!data.token) {
          console.error("No token returned from API");
          return;
        }

        // Create a new Supabase client with the JWT in the Authorization header
        const supabaseWithAuth = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL || "",
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
          {
            global: {
              headers: {
                Authorization: `Bearer ${data.token}`,
              },
            },
            auth: {
              persistSession: false,
              autoRefreshToken: false,
              detectSessionInUrl: false,
            },
          }
        );

        setSupabase(supabaseWithAuth);
        console.log("Supabase client initialized with JWT in headers");
      } catch (error) {
        console.error("Error initializing Supabase:", error);
      } finally {
        setIsInitialized(true);
      }
    }

    initializeSupabase();
  }, []);

  if (!isInitialized || !supabase) {
    return null; // Or a loading spinner
  }

  return (
    <SupabaseContext.Provider value={{ supabase }}>
      {children}
    </SupabaseContext.Provider>
  );
}

export function useSupabase() {
  const context = useContext(SupabaseContext);
  if (!context) {
    throw new Error("useSupabase must be used within a SupabaseProvider");
  }
  return context.supabase;
}
