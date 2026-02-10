export function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">Dimi</div>
      <div className="nav-links">
        <a href="#features">Features</a>
        <a href="#dashboard">Dashboard</a>
        <a href="#Planos">Planos</a>
        <button className="btn-secondary">Entrar</button>
        <button className="btn-primary">Cadastrar</button>
      </div>
    </nav>
  );
}