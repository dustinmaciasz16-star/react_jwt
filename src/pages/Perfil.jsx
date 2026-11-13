
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../config/apiConfig.js";
import "./Perfil.css";

function Perfil() {
    const [datosPerfil, setDatosPerfil] = useState(null);
    const [error, setError] = useState("");
    const [cargando, setCargando] = useState(true);

    const { token, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const obtenerPerfil = async () => {
            try {
                if (!token) {
                    throw new Error("No existe una sesión activa");
                }

                const response = await fetch(`${API_BASE_URL}/auth/perfil`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Accept": "application/json"
                    }
                });

                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
                }

                const data = await response.json();

                setDatosPerfil(data);

            } catch (error) {
                console.error("Error al obtener perfil:", error);
                setError(error.message);
            } finally {
                setCargando(false);
            }
        };

        obtenerPerfil();

    }, [token]);

    const manejarCerrarSesion = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/logout`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error("No se pudo cerrar la sesión");
            }

        } catch (error) {
            console.error(error);
        } finally {
            logout();
            navigate("/login");
        }
    };

    return (
        <div className="perfil-container">
            <div className="perfil-card">

                <h1>Mi perfil</h1>

                {cargando && <p>Cargando información...</p>}

                {error && (
                    <p style={{ color: "red" }}>{error}</p>
                )}

                {datosPerfil && (
                    <div className="perfil-info">
                        <p>Mensaje: {datosPerfil.Mensaje}</p>
                        <p>Usuario: {datosPerfil.Usuario}</p>
                        <p>Rol: {datosPerfil.rol}</p>
                        <p>Estado: {datosPerfil.status}</p>
                    </div>
                )}

                <button onClick={manejarCerrarSesion}>
                    Cerrar sesión
                </button>

            </div>
        </div>
    );
}

export default Perfil;
