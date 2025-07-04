import { useEffect, useState } from 'react';
import obtenerMovimientos from '../config/obtenerMovimientos';
const useMovimientos = (fechaInicio, fechaFin, offset) => {
    const [movimientos, setMovimientos] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cargarMovimientos = async () => {
            setCargando(true);
            try {
                const data = await obtenerMovimientos(fechaInicio, fechaFin, offset);
                setMovimientos(data.data);
                setError(null);
            } catch (error) {
                setError(error);
            } finally {
                setCargando(false);
            }
        };

        cargarMovimientos();
    }, [fechaInicio, fechaFin, offset]);

    return { movimientos, setMovimientos };
}

export default useMovimientos;