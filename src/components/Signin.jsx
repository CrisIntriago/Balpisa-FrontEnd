import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';

const Signin = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

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
        const data = response.data;
        console.log('Response data:', data);
        setIsLoggedIn(true);
        navigate("/home");
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
    <section className="bg-gray-100 py-20 dark:bg-dark lg:py-[120px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-white px-10 py-16 text-center dark:bg-dark-2 sm:px-12 md:px-[60px]">
              <div className="mb-10 text-center md:mb-16">
                <a
                  href="/#"
                  className="mx-auto inline-block max-w-[160px]"
                >
                  <img
                    src="src\assets\logo.png"
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signin;


const InputBox = ({ type, placeholder, name, onChange }) => {
  return (
    <div className="mb-6">
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={onChange} // Añadido el evento onChange
        className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:text-black"
      />
    </div>
  );
};