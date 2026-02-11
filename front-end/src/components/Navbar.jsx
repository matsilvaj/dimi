import { useState } from 'react';
import { LayoutDashboard, Rocket, CreditCard, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  // URL de Cadastro (WhatsApp)
  const whatsappUrl = "https://api.whatsapp.com/send/?phone=5571983578489&text=Ol%C3%A1+Dimi%21%21&type=phone_number&app_absent=0";

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    if (isMenuOpen) setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <Link to="/">Dimi</Link>
      </div>

      <div className="navbar-container">
        <ul className="nav-links">
          <li><a href="#features" onClick={(e) => scrollToSection(e, 'features')}><Rocket size={18} /> Features</a></li>
          <li><a href="#dashboard" onClick={(e) => scrollToSection(e, 'dashboard')}><LayoutDashboard size={18} /> Dashboard</a></li>
          <li><a href="#planos" onClick={(e) => scrollToSection(e, 'planos')}><CreditCard size={18} /> Planos</a></li>
        </ul>
      </div>

      <div className="nav-actions">
        <button className="btn-login" onClick={() => navigate('/login')}>
          <span>Entrar</span>
        </button>

        {/* Link de Cadastro via WhatsApp */}
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-signup">
          <span>Cadastrar</span>
        </a>

        <button className="btn-mobile-menu" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="mobile-menu-overlay">
          <ul className="mobile-nav-links">
            <li><a href="#features" onClick={(e) => scrollToSection(e, 'features')}>Features</a></li>
            <li><a href="#dashboard" onClick={(e) => scrollToSection(e, 'dashboard')}>Dashboard</a></li>
            <li><a href="#planos" onClick={(e) => scrollToSection(e, 'planos')}>Planos</a></li>
            <hr />
            <li>
              <button className="mobile-btn-login" onClick={() => { navigate('/login'); setIsMenuOpen(false); }}>
                Entrar
              </button>
            </li>
            <li>
              {/* Cadastro Mobile */}
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="mobile-btn-signup">
                Cadastrar
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}