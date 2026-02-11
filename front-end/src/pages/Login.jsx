import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from 'lucide-react'; // Importamos Eye e EyeOff
import './Login.css';

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Estado para o olhinho

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Tentativa de login:", { email, password });
  };

  return (
    <div className="login-page">
      <button className="btn-back" onClick={() => navigate('/')}>
        <ArrowLeft size={20} /> Voltar
      </button>

      <div className="login-card">
        <h2>Bem-vindo ao Dimi! 👋</h2>

        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-group">
            <label><Mail size={16} /> E-mail</label>
            <input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label><Lock size={16} /> Senha</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"} // Muda o tipo conforme o estado
                placeholder="Sua Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="btn-toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" className="btn-login-submit">
            Entrar
          </button>
        </form>

        <p className="login-footer">
          Não tem uma conta?
          <a
            href="https://api.whatsapp.com/send/?phone=5571983578489&text=Ol%C3%A1+Dimi%21%21&type=phone_number&app_absent=0"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none', marginLeft: '5px' }}
          >
            <span>Cadastre-se</span>
          </a>
        </p>
      </div>
    </div>
  );
}