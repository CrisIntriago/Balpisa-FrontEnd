import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

const RutaProtegida = () => {

    const { auth, cargando } = useAuth();

    if (cargando) return "Cargando ...";

    return (
        <>
            <Navbar />
            {auth.id ? <Outlet /> : <Navigate to="/" />}
        </>
    )
}

export default RutaProtegida;
