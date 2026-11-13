
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../config/apiConfig.js";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { login } = useAuth();

  const manejarSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Credenciales incorrectas');
      }

      const data = await response.json();

      console.log("Respuesta del login:", data);

      if (!data.token) {
          throw new Error("El backend no devolvió un token JWT");
      }

      login(data.token);

      console.log("Token guardado:", localStorage.getItem('token'));

      navigate('/perfil');

    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <div className="login-header">
          <h1>Bienvenido</h1>
          <p>Ingresa tus credenciales para continuar</p>
        </div>

        <form className="login-form" onSubmit={manejarSubmit}>

          <div className="login-field">
            <label htmlFor="username">Usuario</label>
            <input
              type="text"
              id="username"
              placeholder="Ingresa tu usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="login-field">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className="login-error">
              {error}
            </div>
          )}

          <button className="login-button" type="submit">
            Iniciar sesión
          </button>

          <div className="login-footer">
            ¿No tienes una cuenta? <Link to="/registrar">Regístrate aquí</Link>
          </div>
        </form>

      </div>
    </div>
  );
}

export default Login;
