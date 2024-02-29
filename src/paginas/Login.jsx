import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';

import useAuth from "../hooks/useAuth";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const {setAuth} = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault()
        // llamar db para verif
        try {
            const response = await clienteAxios.post('/usuarios/login', {
                nombre: username,
                contrasena: password
            });

            if (response.status >= 200 && response.status < 300) {
                // La solicitud fue exitosa (código de respuesta en el rango 200-299)
                // Manejar la respuesta aquí
                localStorage.setItem("token", JSON.stringify(response.data.token));
                setAuth(response.data);
                navigate("/consultas");
                console.log("Se ingresó correctamente");
            } else {
                // La solicitud no fue exitosa (código de respuesta fuera del rango 200-299)
                // Manejar el error aquí
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            // Manejar errores de red u otros errores relacionados con la solicitud
            console.error('Error:', error.message);
        }


    };

    return (
        <>
            <div className="mb-10 text-center md:mb-16">
                <a
                    href="/#"
                    className="mx-auto inline-block max-w-[160px]"
                >
                    <img
                        src="/logo.png"
                        alt="logo"
                    />
                </a>
            </div>
            <form onSubmit={handleSubmit}>
                <InputBox
                    type="text"
                    name="user"
                    placeholder="Usuario"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <InputBox
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="mb-10">
                    <input
                        type="submit"
                        value="Iniciar Sesión"
                        className="w-full cursor-pointer rounded-md border border-primary bg-indigo-600 px-5 py-3 text-base font-medium text-white transition hover:bg-opacity-90"
                    />
                </div>
            </form>
        </>
    );
};

export default Login;


const InputBox = ({ type, placeholder, name, onChange }) => {
    return (
        <div className="mb-6">
            <input
                type={type}
                placeholder={placeholder}
                name={name}
                onChange={onChange} // Añadido el evento onChange
                className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-black outline-none focus:border-primary focus-visible:shadow-none"
            />
        </div>
    );
};