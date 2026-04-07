import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { isSupabaseConfigured, supabase } from "../lib/supabaseClient";

export function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function checkSession() {
      if (!isSupabaseConfigured || !supabase) {
        if (isMounted) {
          setAuthenticated(false);
          setLoading(false);
        }
        return;
      }

      const { data } = await supabase.auth.getSession();
      if (isMounted) {
        setAuthenticated(Boolean(data.session));
        setLoading(false);
      }
    }

    checkSession();

    const { data: authListener } = supabase
      ? supabase.auth.onAuthStateChange((_event, session) => {
          if (isMounted) setAuthenticated(Boolean(session));
        })
      : { data: null };

    return () => {
      isMounted = false;
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        Carregando...
      </div>
    );
  }

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
