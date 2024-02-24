import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout';
import Login from './paginas/Login';
import { AuthProvider } from "./context/AuthProvider.jsx";
import Home from './paginas/Home';
import RutaProtegida from './layouts/RutaProtegida';
import Reportes from './paginas/Reportes.jsx';
import IngresoInventario from './paginas/IngresoInventario.jsx';


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
        
        <Route path="/reportes" element={<RutaProtegida />}>
          <Route index element={<Reportes/>} />
        </Route>

        <Route path="/ingreso-inventario" element={<RutaProtegida />}>
          <Route index element={<IngresoInventario/>} />
        </Route>

        {/*
        <Route path="/salida-inventario" element={<RutaProtegida />}>
          <Route index element={<IngresoInventario/>} />
        </Route>

        <Route path="/cambio-bodega" element={<RutaProtegida />}>
          <Route index element={<IngresoInventario/>} />
        </Route>

        <Route path="/modificar-plancha" element={<RutaProtegida />}>
          <Route index element={<IngresoInventario/>} />
        </Route>
  */}
      </Routes>
    </AuthProvider>


  );
}

export default App;