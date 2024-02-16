import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout';
import Login from './paginas/Login';
import { AuthProvider } from "./context/AuthProvider.jsx";
import Home from './paginas/Home';


function App() {

  return (

    <AuthProvider>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Login/>} />
        </Route>

        <Route path="/home" element={<AuthLayout />}>
          <Route index element={<Home/>} />
        </Route>

      </Routes>
    </AuthProvider>


  );
}

export default App;