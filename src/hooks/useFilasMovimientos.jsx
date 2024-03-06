import { useEffect, useState } from 'react';
import obtenerFilasMovimientos from '../config/obtenerFilasMovimientos';

const useFilasMovimientos = (fechaInicio, fechaFin) => {
    const [totalFilas, setFilas] = useState(0);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cargarFilas = async () => {
            setCargando(true);
            try {
                const data = await obtenerFilasMovimientos(fechaInicio, fechaFin);
                setFilas(data[0][total]);
                console.log("mostrando"+ data)
                setError(null); // Limpia errores previos si la petición es exitosa
            } catch (error) {
                setError(error);
            } finally {
                setCargando(false);
            }
        };
        cargarFilas();
    }, [fechaInicio,fechaFin]); 

    return { totalFilas };
};

export default useFilasMovimientos;