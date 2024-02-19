import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout';
import Login from './paginas/Login';
import { AuthProvider } from "./context/AuthProvider.jsx";
import Home from './paginas/Home';
import RutaProtegida from './layouts/RutaProtegida';
import Movimientos from './paginas/Movimientos.jsx';
import Reportes from './paginas/Reportes.jsx';


function App() {

  return (

    <AuthProvider>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Login/>} />
        </Route>

        <Route path="/consultas" element={<RutaProtegida />}>
          <Route index element={<Home/>} />
        </Route>

        <Route path="/movimientos" element={<RutaProtegida />}>
          <Route index element={<Movimientos/>} />
        </Route>

        <Route path="/reportes" element={<RutaProtegida />}>
          <Route index element={<Reportes/>} />
        </Route>

      </Routes>
    </AuthProvider>


  );
}

export default App;