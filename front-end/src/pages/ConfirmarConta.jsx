import { useState } from "react";

export default function ConfirmarConta() {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirm) {
      alert("As senhas não conferem");
      return;
    }

    setLoading(true);

    const res = await fetch("http://localhost:3001/api/ativar-conta", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    if (res.ok) {
      alert("Conta ativada! Agora é só entrar 😊");
      window.location.href = "/login";
    } else {
      alert("Link inválido ou expirado");
    }

    setLoading(false);
  }

  return (
    <div style={{ maxWidth: 400, margin: "80px auto" }}>
      <h2>Crie sua senha</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirmar senha"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
        />

        <button disabled={loading}>
          {loading ? "Ativando..." : "Ativar conta"}
        </button>
      </form>
    </div>
  );
}
