import { useState, useEffect, createContext } from "react";


const AuthContext = createContext();


const AuthProvider = ({ children }) => {

    const [auth ,setAuth] = useState({});

    //Aquí hay funciones que puedes definir;
    return (
        <AuthContext.Provider
            value= {
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