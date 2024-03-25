import { useEffect, useState } from 'react';
import imprimirMovimientos from '../config/imprimirMovimientos';

const useImprimirMovimientos = (fechaInicio, fechaFin) => {
    const [movimientos, setMovimientos] = useState(null); 
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cargarMovimientos = async () => {
            setCargando(true);
            try {
                const data = await imprimirMovimientos(fechaInicio, fechaFin);
                setMovimientos(data);
                setError(null); 
            } catch (error) {
                setError(error);
                setMovimientos(null); 
            } finally {
                setCargando(false); 
            }
        };

        cargarMovimientos();
    }, [fechaInicio, fechaFin]); 

    return { movimientos, cargando, error }; 
}

export default useImprimirMovimientos;