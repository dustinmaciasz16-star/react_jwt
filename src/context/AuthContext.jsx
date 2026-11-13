
import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [token, setToken] = useState(() => {
        const guardado = localStorage.getItem('token');
        console.log("Inicializando AuthProvider:", guardado);
        return guardado;
    });

    useEffect(() => {
        console.log("AuthProvider montado. Token:", token);

        return () => {
            console.log("AuthProvider desmontado");
        };
    }, []);

    useEffect(() => {
        console.log("Estado del token actualizado:", token);
    }, [token]);

    const login = (nuevoToken) => {
        localStorage.setItem('token', nuevoToken);
        setToken(nuevoToken);
    };

    
    const logout = () => {
        console.trace("¿QUIÉN ESTÁ EJECUTANDO LOGOUT?");

        localStorage.removeItem('token');
        setToken(null);
    };


    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
