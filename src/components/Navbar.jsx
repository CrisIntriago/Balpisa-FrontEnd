import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Navbar = () => {
  const { auth } = useAuth();
  const [open, setOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState('consultas');
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

  const handleSectionClick = (section) => {
    setCurrentSection(section);
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
        `}
      </style>
      <div className="container mx-auto">
        <div className="relative flex items-center justify-between">
          <div className="w-60 max-w-full">
            <Link to="/home" className="block w-full py-5">
              <img
                src="\src\assets\logo.png"
                alt="logo"
              />
            </Link>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <nav
                id="navbarCollapse"
                className={`absolute top-full w-full max-w-[250px] bg-white px-6 py-5 shadow lg:static lg:block lg:w-full lg:max-w-full lg:shadow-none ${
                  !open && "hidden"
                } `}
              >
                <ul className="block lg:flex">
                  <ListItem NavLink="/consultas" active={currentSection === 'consultas'} onClick={() => handleSectionClick('consultas')}>
                    Consultas
                  </ListItem>
                  <ListItem NavLink="/movimientos" active={currentSection === 'movimientos'} onClick={() => handleSectionClick('movimientos')}>
                    Movimientos
                  </ListItem>
                  <ListItem NavLink="/reportes" active={currentSection === 'reportes'} onClick={() => handleSectionClick('reportes')}>
                    Reportes
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

const ListItem = ({ children, NavLink, active, onClick }) => {
  return (
    <>
      <li>
        <Link
          to={NavLink}
          className={`flex py-2 text-base font-medium ${active ? 'text-primary font-bold' : 'text-body-color'} hover:text-dark lg:ml-12 lg:inline-flex`}
          onClick={onClick}
        >
          {children}
        </Link>
      </li>
    </>
  );
};