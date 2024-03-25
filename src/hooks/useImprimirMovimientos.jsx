import { useEffect, useState } from 'react';
import imprimirMovimientos from '../config/imprimirMovimientos';

const useImprimirMovimientos = (fechaInicio, fechaFin) => {
    const [movimientos, setMovimientos] = useState({});
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cargarMovimientos = async () => {
            setCargando(true);
            try {
                const data = await imprimirMovimientos(fechaInicio, fechaFin);
                setMovimientos(data);
                setError(null); // Limpia errores previos si la petición es exitosa
            } catch (error) {
                setError(error);
            } finally {
                setCargando(false);
            }
        };

        cargarMovimientos();
    }, [fechaInicio,fechaFin]); 

    return { movimientos };
}

export default useImprimirMovimientos;

