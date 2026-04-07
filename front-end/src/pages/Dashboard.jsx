import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    if (!supabase) return;
    setLoading(true);
    await supabase.auth.signOut();
    setLoading(false);
    navigate("/login", { replace: true });
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-card">
        <h1>Dashboard</h1>
        <p>Area protegida. Vamos construir essa parte no proximo passo.</p>
        <button className="dashboard-logout" onClick={handleLogout} disabled={loading}>
          {loading ? "Saindo..." : "Sair"}
        </button>
      </div>
    </div>
  );
}
