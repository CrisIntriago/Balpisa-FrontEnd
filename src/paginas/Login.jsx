import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';
import Swal from 'sweetalert2'

import useAuth from "../hooks/useAuth";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState('')

    const navigate = useNavigate();

    const { auth, setAuth, cargando } = useAuth();


    const handleShow = () => {
        setShow(!show);
    }


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
                Swal.fire({
                    text: 'Please switch Google Translator to Spanish.',
                    icon: 'info',
                    confirmButtonText: 'Ok'
                })
            } else {
                // La solicitud no fue exitosa (código de respuesta fuera del rango 200-299)
                // Manejar el error aquí
                Swal.fire({
                    text: 'La contraseña no es correcta. Compruébala.',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
            }
        } catch (error) {
            // Manejar errores de red u otros errores relacionados con la solicitud
            console.error('Error:', error.message);
            Swal.fire({
                text: 'The username or password is incorrect.',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }


    };

    return (
        <div className='shadow-2xl flex flex-col overflow-hidden rounded-lg bg-white justify-center h-full'>
            <div className="mb-6 text-center md:mb-10">
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
                    placeholder="User"
                    onChange={(e) => setUsername(e.target.value)}
                    className="text-sm"
                />





                <div className="mb-6">
                    <div style={{ position: "relative" }}>
                        <input
                            type={show ? "text" : "password"}
                            placeholder="Password"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-sm text-black outline-none hover:border-black focus:border-primary focus-visible:shadow-none"
                        />
                        <label
                            onClick={handleShow}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-sm text-gray-500"

                        >
                            {show ? "Hide" : "Show"}
                        </label>
                    </div>
                </div>






                <div className="mb-2">
                    <input
                        type="submit"
                        value="Log In"
                        className="w-full cursor-pointer rounded-md border border-primary bg-primary px-5 py-3 text-sm font-medium text-white transition hover:bg-opacity-90"
                    />
                </div>


                <div className=" flex mb-2 w-full px-8 py-3 text-sm justify-between text-gray-600">
                    <p
                    >Test Account: test@test.com  </p>

                    <p>
                    Password: testing
                    </p>

                </div>


                <div className="flex text-xs mb-10 justify-center">
                    <p className='text-gray-400'>Developed by CrisIntriago & Jairrami</p>
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
                className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-sm text-black outline-none hover:border-black focus:border-primary focus-visible:shadow-none"
            />
        </div>
    );
};
const PasswordBox = ({ placeholder, name, onChange }) => {
    return (
        <div className="mb-6">
            <input
                type={show ? "text" : "password"}
                placeholder="Contraseña"
                name="password"
                onChange={(e) => setPassword(e.target.value)} // Añadido el evento onChange
                className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-sm text-black outline-none hover:border-black focus:border-primary focus-visible:shadow-none"
            />
            <label onClick={handleShow}></label>
        </div>
    );
};