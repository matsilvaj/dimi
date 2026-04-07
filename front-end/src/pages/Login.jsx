import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { isSupabaseConfigured, supabase } from "../lib/supabaseClient";
import "./Login.css";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  useEffect(() => {
    async function checkSession() {
      if (!supabase) return;
      const { data } = await supabase.auth.getSession();
      if (data.session) navigate("/dashboard", { replace: true });
    }
    checkSession();
  }, [navigate]);

  async function handleLogin(e) {
    e.preventDefault();

    if (!isSupabaseConfigured || !supabase) {
      setFeedback({
        type: "error",
        message: "Configure as variaveis do Supabase no .env.",
      });
      return;
    }

    setLoading(true);
    setFeedback({ type: "", message: "" });

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setFeedback({ type: "error", message: "E-mail ou senha invalidos." });
      setLoading(false);
      return;
    }

    setLoading(false);
    navigate("/dashboard", { replace: true });
  }

  return (
    <div className="login-page">
      <button className="btn-back" onClick={() => navigate("/")}>
        <ArrowLeft size={20} /> Voltar
      </button>

      <div className="login-card">
        <h2>Bem-vindo ao Dimi</h2>

        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-group">
            <label>
              <Mail size={16} /> E-mail
            </label>
            <input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>
              <Lock size={16} /> Senha
            </label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="btn-toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {feedback.message && <p className={`login-feedback ${feedback.type}`}>{feedback.message}</p>}

          <button type="submit" className="btn-login-submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="login-footer">
          Nao tem uma conta?
          <a
            href="https://api.whatsapp.com/send/?phone=5571983578489&text=Ol%C3%A1+Dimi%21%21&type=phone_number&app_absent=0"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", marginLeft: "5px" }}
          >
            <span>Cadastre-se</span>
          </a>
        </p>
      </div>
    </div>
  );
}
