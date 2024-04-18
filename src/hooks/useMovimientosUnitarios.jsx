import { useEffect, useState } from 'react';
import obtenerMovimientosUnitarios from '../config/obtenerMovimientosUnitarios';

const useMovimientosUnitarios = (fechaInicio, fechaFin, offset) => {
    const [movimientos, setMovimientos] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cargarMovimientos = async () => {
            setCargando(true);
            try {
                const data = await obtenerMovimientosUnitarios(fechaInicio, fechaFin, offset);
                setMovimientos(data.data);
                setError(null); // Limpia errores previos si la petición es exitosa
            } catch (error) {
                setError(error);
            } finally {
                setCargando(false);
            }
        };

        cargarMovimientos();
    }, [fechaInicio,fechaFin, offset]); 

    return { movimientos, setMovimientos };
}

export default useMovimientosUnitarios;

