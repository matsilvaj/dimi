import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { isSupabaseConfigured, supabase } from "../lib/supabaseClient";
import "./ConfirmarConta.css";

export default function ConfirmarConta() {
  const navigate = useNavigate();
  const [tokenInfo, setTokenInfo] = useState(null);
  const [validationError, setValidationError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [popup, setPopup] = useState({
    open: false,
    type: "info",
    title: "",
    message: "",
  });
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validating, setValidating] = useState(true);
  const [tokenReady, setTokenReady] = useState(false);

  function showPopup(type, title, message) {
    setPopup({ open: true, type, title, message });
  }

  function validatePasswords() {
    if (password.length < 6) {
      setPasswordError("Use ao menos 6 caracteres.");
      return false;
    }

    if (password !== confirm) {
      setPasswordError("Senhas diferentes.");
      return false;
    }

    setPasswordError("");
    return true;
  }

  useEffect(() => {
    async function validateToken() {
      if (!isSupabaseConfigured || !supabase) {
        setValidating(false);
        return;
      }

      const queryParams = new URLSearchParams(window.location.search);
      const token = decodeURIComponent((queryParams.get("token") || "").trim());

      if (!token) {
        setValidationError("Link sem token.");
        setValidating(false);
        return;
      }

      const { data, error } = await supabase.rpc("validate_email_token", {
        p_token: token,
      });

      if (error) {
        setValidationError("Nao foi possivel validar o link.");
        setValidating(false);
        return;
      }

      const tokenRow = Array.isArray(data) ? data[0] : null;

      if (!tokenRow) {
        setValidationError("Link invalido.");
        setValidating(false);
        return;
      }

      setTokenInfo({
        token,
        email: tokenRow.email,
        user_id: tokenRow.user_id,
      });
      setTokenReady(true);
      setValidationError("");
      setValidating(false);
    }

    validateToken();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!isSupabaseConfigured || !supabase) {
      showPopup("error", "Configuracao", "Revise as variaveis do .env.");
      return;
    }

    if (!tokenReady || !tokenInfo) {
      showPopup("warning", "Link invalido", "Solicite um novo link.");
      return;
    }

    if (!validatePasswords()) return;

    setLoading(true);

    const { error: signUpError } = await supabase.auth.signUp({
      email: tokenInfo.email,
      password,
    });

    if (signUpError && !signUpError.message.toLowerCase().includes("registered")) {
      showPopup("error", "Erro", "Nao foi possivel criar o acesso.");
      setLoading(false);
      return;
    }

    const { data: consumeOk, error: consumeError } = await supabase.rpc(
      "consume_email_token_and_activate",
      {
        p_token: tokenInfo.token,
        p_email: tokenInfo.email,
      },
    );

    if (consumeError || consumeOk !== true) {
      showPopup("error", "Erro", "Nao foi possivel finalizar o link.");
      setLoading(false);
      return;
    }

    setLoading(false);
    showPopup("success", "Conta ativada", "Redirecionando para login...");
    setTimeout(() => navigate("/login"), 1200);
  }

  return (
    <div className="confirm-page">
      <div className="confirm-card">
        <h2>Crie sua senha</h2>

        {!isSupabaseConfigured && (
          <p className="confirm-message warning">Configure o .env com as chaves do Supabase.</p>
        )}

        {validating && <p className="confirm-message">Validando link...</p>}
        {!validating && validationError && <p className="confirm-message warning">{validationError}</p>}

        <form className="confirm-form" onSubmit={handleSubmit}>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              className={passwordError ? "input-error" : ""}
              placeholder="Senha"
              minLength={6}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (passwordError) setPasswordError("");
              }}
            />
            <button
              type="button"
              className="btn-toggle-password"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="password-wrapper">
            <input
              type={showConfirmPassword ? "text" : "password"}
              className={passwordError ? "input-error" : ""}
              placeholder="Confirmar senha"
              minLength={6}
              value={confirm}
              onChange={(e) => {
                setConfirm(e.target.value);
                if (passwordError) setPasswordError("");
              }}
            />
            <button
              type="button"
              className="btn-toggle-password"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              aria-label={showConfirmPassword ? "Ocultar confirmacao" : "Mostrar confirmacao"}
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {passwordError && <p className="confirm-message error-inline">{passwordError}</p>}

          <button className="btn-confirm-submit" disabled={loading || validating || !tokenReady}>
            {loading ? "Ativando..." : "Ativar conta"}
          </button>
        </form>
      </div>

      {popup.open && (
        <div className="confirm-popup-overlay">
          <div className="confirm-popup-card">
            <h3 className={`popup-title ${popup.type}`}>{popup.title}</h3>
            <p className="popup-message">{popup.message}</p>
            {popup.type !== "success" && (
              <button className="popup-action" onClick={() => setPopup((prev) => ({ ...prev, open: false }))}>
                Fechar
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
