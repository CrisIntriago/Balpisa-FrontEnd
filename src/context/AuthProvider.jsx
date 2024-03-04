import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [cargando, setCargando] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem("token");
            console.log("Se está verificando al usuario.")

            if (!token) {
                setCargando(false);
                return;
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };

            try {
                const response = await clienteAxios.get("/usuarios/perfil", config);
                setAuth({
                    "id": response.data.id,
                    "nombre": response.data.nombre, // Asumiendo que el nombre de usuario está en el objeto usuario
                    "token": JSON.parse(token)
                });
                navigate("consultas");

            } catch (error) {
                console.log("Error al pedir Token");
                setAuth({});
            }
            setCargando(false);

        };
        autenticarUsuario();
    }, []);

    const cerrarSesionAuth = () => {
        setAuth({})
    }

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesionAuth
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider };
export default AuthContext;