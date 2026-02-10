import { ArrowRight } from 'lucide-react';
import './Hero.css';

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-container">
        <h1 className="hero-title">
          Organize sua rotina <br />
          <span>sem esforço</span>
        </h1>
        <p className="hero-subtitle">
          O Dimi integra suas tarefas ao WhatsApp para você nunca mais esquecer o que é importante.
        </p>
        
        {/* Novo Botão CTA */}
        <button className="btn-hero-cta">
          Começar gratuitamente
        </button>
      </div>
    </section>
  );
}