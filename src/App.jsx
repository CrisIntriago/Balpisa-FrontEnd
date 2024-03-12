import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout';
import Login from './paginas/Login';
import { AuthProvider } from "./context/AuthProvider.jsx";
import Home from './paginas/Home';
import RutaProtegida from './layouts/RutaProtegida';
import Reportes from './paginas/Reportes.jsx';
import Movimientos from './paginas/Movimientos.jsx';
import Admin from './paginas/Admin.jsx';


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
          <Route index element={<Movimientos 
          opcion={"Ingreso Inventario"}/>}
          />
        </Route>

        
        <Route path="/salida-inventario" element={<RutaProtegida />}>
          <Route index element={<Movimientos 
          opcion={"Salida Inventario"}/>}
          />
        </Route>

        <Route path="/salida-multiple" element={<RutaProtegida />}>
          <Route index element={<Movimientos
          opcion={"Salida Múltiple"}/>} 
          />
        </Route>
    
        <Route path="/cambio-bodega" element={<RutaProtegida />}>
          <Route index element={<Movimientos
          opcion={"Cambio Bodega"}/>} 
          />
        </Route>

        <Route path="/modificar-plancha" element={<RutaProtegida />}>
          <Route index element={<Movimientos 
          opcion={"Modificar Plancha"}/>} 
          />
        </Route>

        <Route path="/agregar-modelo" element={<RutaProtegida />}>
          <Route index element={<Admin
          opcion={"Agregar Modelo"}/>} 
          />
        </Route>

        <Route path="/modificar-modelo" element={<RutaProtegida />}>
          <Route index element={<Admin
          opcion={"Modificar Modelo"}/>} 
          />
        </Route>
      </Routes>
    </AuthProvider>


  );
}

export default App;