import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";

const AuthContext = createContext();


const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({});

    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                return
            }

            const config = {
                headers: {
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${token}`
                }
            }
            try {
                const {usuario} = await clienteAxios.get("/usuarios/perfil", config);
               // setAuth(usuario);

            } catch (error) {
                console.log("Error al pedir Token");
            }
        };
        autenticarUsuario();
    }, []);

    //Aquí hay funciones que puedes definir;
    return (
        <AuthContext.Provider
            value={
                {
                    //Aquí pones lo que quieres que esté disponible en toda tu app
                    setAuth
                }
            }
        >
            {children}
        </AuthContext.Provider>
    )

}

export {
    AuthProvider
}

export default AuthContext;