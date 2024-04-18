import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';

import useAuth from "../hooks/useAuth";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const {auth, setAuth, cargando} = useAuth();

    console.log(auth);
    console.log(cargando);


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
        <div className='shadow-2xl flex flex-col overflow-hidden rounded-lg bg-white justify-center h-full'>
            <div className="mb-6 text-center md:mb-12">
                <a
                    href="/#"
                    className="mx-auto inline-block w-[300px] md:w-[300px] lg:w-[350px]"
                >
                    <img
                        src="/logo.png"
                        alt="logo"
                    />
                </a>
            </div>
            <form onSubmit={handleSubmit} className='mx-[10px] md:mx-14 lg:mx-14'>
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
                        className="w-full cursor-pointer rounded-md border border-primary bg-primary px-5 py-3 text-base font-medium text-white transition hover:bg-opacity-90"
                    />
                </div>
                <div className="flex mb-10 justify-center">
                    <p className='text-gray-500'>Copyright © Balpisa 2024.</p>
                </div>
            </form>
        </div>
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