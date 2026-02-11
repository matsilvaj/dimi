import './Hero.css';

export function Hero() {
  const whatsappUrl = "https://api.whatsapp.com/send/?phone=5571983578489&text=Ol%C3%A1+Dimi%21%21&type=phone_number&app_absent=0";

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
        
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-hero-cta">
          Começar gratuitamente
        </a>
      </div>
    </section>
  );
}