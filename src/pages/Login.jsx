import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Layout from "../components/Layout";
import { FaUser, FaLock, FaSignInAlt } from "react-icons/fa";

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin/products");
    }
  }, [isAuthenticated, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();

    const result = await login({ username: email, password });

    if (result.ok) {
      toast.success("Inicio de sesión exitoso 🎉");
    } else {
      toast.error(result.message || "Error al iniciar sesión");
    }
  }

  return (
    <div>
      <Layout title="Login" description="Iniciar Sesión">
      <h1>Iniciar Sesión</h1>

      <form onSubmit={handleSubmit} aria-label="Formulario de inicio de sesión">

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <FaUser aria-hidden="true" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            aria-label="Correo electrónico"
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <FaLock aria-hidden="true" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            aria-label="Contraseña"
          />
        </div>

        <button aria-label="Iniciar sesión">
          <FaSignInAlt style={{ marginRight: "6px" }} aria-hidden="true" />
          Entrar
        </button>
      </form>
      </Layout>
    </div>
  );
}