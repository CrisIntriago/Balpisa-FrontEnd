import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';



const Navbar = () => {
  const { auth, cerrarSesionAuth } = useAuth();
  const [open, setOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState('');
  const [navbarHeight, setNavbarHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.getElementById('navbar');
      if (navbar) {
        const isTop = window.scrollY < navbar.offsetTop;
        if (isTop) {
          navbar.classList.remove("sticky");
          document.body.style.marginTop = '0';
        } else {
          navbar.classList.add("sticky");
          document.body.style.marginTop = `${navbarHeight}px`;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navbarHeight]);

  useEffect(() => {
    const navbar = document.getElementById('navbar');
    if (navbar) {
      setNavbarHeight(navbar.offsetHeight);
    }
  }, []);

  useEffect(() => {
    const storedSection = localStorage.getItem('currentSection');
    if (storedSection) {
      setCurrentSection(storedSection);
    }else{
      setCurrentSection('consultas');
    }
  }, []);

  const handleSectionClick = (section) => {
    setCurrentSection(section);
    localStorage.setItem('currentSection', section);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentSection');
    cerrarSesionAuth()
    localStorage.removeItem('token')

  };

  return (
    <header id="navbar" className={`navbar flex w-full items-center ${open ? 'open' : ''}`}>
      <style>
        {`
          .sticky {
            position: fixed;
            top: 0;
            width: 100%;
            z-index: 1000;
          }

          .navbar {
            background-color: #ffffff;
            transition: background-color 0.3s ease;
          }

          .navbar.open {
            background-color: #ffffff;
          }

          .sub-menu {
            display: none;
            position: absolute;
            background-color: #f9f9f9;
            box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
            padding: 12px 16px;
            z-index: 1;
          }

          .sub-menu.show {
            display: block;
          }

          .dropdown:hover .sub-menu {
            display: block;
          }
        `}
      </style>
      <div className="container mx-auto">
        <div className="relative flex items-center justify-between">
          <div className="w-60 max-w-full">
          <Link to="/consultas" className="block w-full py-5" active={currentSection === 'consultas'} onClick={() => handleSectionClick('consultas')}>
              <img
                src="/logo.png"
                alt="logo"
              />
            </Link>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <nav
                id="navbarCollapse"
                className={`absolute top-full w-full max-w-[250px] bg-white px-6 py-5 shadow lg:static lg:block lg:w-full lg:max-w-full lg:shadow-none ${!open && "hidden"
                  } `}
              >
                <ul className="block lg:flex">
                  <ListItem NavLink="/consultas" active={currentSection === 'consultas'} onClick={() => handleSectionClick('consultas')}>
                    Consultas
                  </ListItem>
                  <ListItem
                    NavLink="#"
                    active={currentSection === 'movimientos' || ['/ingreso-inventario', '/salida-inventario', '/salida-multiple', '/cambio-bodega', '/modificar-plancha'].includes(currentSection)}
                    onClick={() => handleSectionClick('movimientos')}
                    subMenu={[
                      { name: 'Ingreso de inventario', link: '/ingreso-inventario' },
                      { name: 'Salida de inventario', link: '/salida-inventario' },
                      { name: 'Salida múltiple', link: '/salida-multiple' },
                      { name: 'Cambio de bodega', link: '/cambio-bodega' },
                      { name: 'Modificar plancha', link: '/modificar-plancha' }
                    ]}
                    currentSection={currentSection}
                    setCurrentSection={setCurrentSection}
                  >
                    Movimientos &#9660;
                  </ListItem>
                  <ListItem NavLink="/reportes" active={currentSection === 'reportes'} onClick={() => handleSectionClick('reportes')}>
                    Reportes
                  </ListItem>
                  <ListItem
                    NavLink="#"
                    active={currentSection === 'admin' || ['/agregar-modelo', '/modificar-modelo'].includes(currentSection)}
                    onClick={() => handleSectionClick('admin')}
                    subMenu={[
                      { name: 'Agregar modelo', link: '/agregar-modelo' },
                      { name: 'Modificar modelo', link: '/modificar-modelo' }
                    ]}
                    currentSection={currentSection}
                    setCurrentSection={setCurrentSection}
                  >
                    Admin &#9660;
                  </ListItem>
                </ul>
              </nav>
            </div>
            <div className="flex items-center">
              <div className="mr-8 hidden sm:flex lg:pr-0">
                <p
                  className="px-7 py-3 text-base font-medium text-dark"
                >
                  Bienvenid@ {auth.nombre}
                </p>
              </div>
              <div className="hidden sm:flex lg:pr-0">
                <a
                  href="/"
                  className="rounded-md bg-primary px-7 py-3 text-base font-medium text-white hover:bg-primary/90"
                  onClick={handleLogout}
                >
                  Cerrar Sesión
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};


export default Navbar;

const ListItem = ({ children, NavLink, active, onClick, subMenu, currentSection, setCurrentSection }) => {
  const [showSubMenu, setShowSubMenu] = useState(false);

  const handleSubMenuItemClick = (section) => {
    localStorage.setItem('currentSection', section);
    setCurrentSection(section);
  };

  return (
    <>
      <li className={subMenu ? 'dropdown' : ''} onMouseEnter={() => setShowSubMenu(true)} onMouseLeave={() => setShowSubMenu(false)}>
        <Link
          to={NavLink}
          className={`flex py-2 text-base font-medium ${active ? 'text-primary font-bold' : 'text-body-color'} hover:text-dark lg:ml-12 lg:inline-flex`}
          onClick={onClick}
        >
          {children}
        </Link>
        {subMenu && (
          <div className={`sub-menu ${showSubMenu ? 'show' : ''}`}>
            {subMenu.map((item, index) => (
              <Link
                to={item.link}
                key={index}
                className={`block py-2 text-base font-medium ${currentSection === item.link ? 'text-primary font-bold' : 'text-body-color'} hover:text-dark`}
                onClick={() => handleSubMenuItemClick(item.link)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </li>
    </>
  );
};