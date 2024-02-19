import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});

    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
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
                console.log(response)
                setAuth({
                    ...response.data.usuario, // Asumiendo que el nombre de usuario está en el objeto usuario
                    token: token
                });

            } catch (error) {
                console.log("Error al pedir Token");
            }
        };
        autenticarUsuario();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider };
export default AuthContext;