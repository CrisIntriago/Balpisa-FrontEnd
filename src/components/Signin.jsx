import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Signin = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    // llamar db para verif
    try {
      const response = await fetch('http://localhost:4000/api/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre: username,
          contrasena: password
        })
      });

      if(response.ok){
        setIsLoggedIn(true);
        navigate("/home");
        console.log("Se ingresó correctamente");
      }

    } catch (error) {
      console.error('Error:', error);
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