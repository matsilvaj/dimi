import { useState } from 'react';
import { LayoutDashboard, Rocket, CreditCard, Menu, X } from 'lucide-react';
import './Navbar.css';

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="navbar">
            {/* Lado Esquerdo: Logo */}
            <div className="nav-logo">
                <a href="/">Dimi</a>
            </div>

            <div className="navbar-container">
                {/* Centro: Links de Navegação */}
                <ul className="nav-links">
                    <li><a href="#features"><Rocket size={18} /> Features</a></li>
                    <li><a href="#dashboard"><LayoutDashboard size={18} /> Dashboard</a></li>
                    <li><a href="#planos"><CreditCard size={18} /> Planos</a></li>
                </ul>
            </div>

            {/* Lado Direito: Ações */}
            <div className="nav-actions">
                <button className="btn-login"><span>Entrar</span></button>
                <button className="btn-signup"><span>Cadastrar</span></button>

                {/* Botão de Menu - Alterna entre ícone Menu e X */}
                <button className="btn-mobile-menu" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Menu Mobile - Aparece apenas quando isMenuOpen é true */}
            {isMenuOpen && (
                <div className="mobile-menu-overlay">
                    <ul className="mobile-nav-links">
                        <li><a href="#features" onClick={() => setIsMenuOpen(false)}>Features</a></li>
                        <li><a href="#dashboard" onClick={() => setIsMenuOpen(false)}>Dashboard</a></li>
                        <li><a href="#planos" onClick={() => setIsMenuOpen(false)}>Planos</a></li>
                        <hr />
                        <li><button className="mobile-btn-login">Entrar</button></li>
                        <li><button className="mobile-btn-signup">Cadastrar</button></li>
                    </ul>
                </div>
            )}
        </nav>
    );
}