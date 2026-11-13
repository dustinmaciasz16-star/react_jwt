
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/apiConfig.js";
import "./Login.css";

function Registrar() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [rol, setRol] = useState('USER', 'ADMIN'); // Estado para el rol del usuario

  const navigate = useNavigate();

  const manejarSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/registrar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, rol }),
      });

      if (!response.ok) {
        throw new Error('Error al registrar el usuario');
      }

      navigate('/login');

    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <div className="login-header">
          <h1>Crear cuenta</h1>
          <p>Registra tus datos para continuar</p>
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
              placeholder="Crea una contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="login-field">
            <label htmlFor="confirmPassword">Confirmar contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Repite tu contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="login-field">
            <label htmlFor="rol">Tipo de cuenta</label>

            <select
                id="rol"
                value={rol}
                onChange={(e) => setRol(e.target.value)}
                required
            >
                <option value="USER">Usuario</option>
                <option value="ADMIN">Administrador</option>
            </select>
        </div>

          {error && (
            <div className="login-error">
              {error}
            </div>
          )}

          <button className="login-button" type="submit">
            Registrarse
          </button>

            <div className="login-footer">
            ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link>
            </div>
        </form>

      </div>
    </div>
  );
}

export default Registrar;
