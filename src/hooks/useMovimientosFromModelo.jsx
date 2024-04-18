import { useEffect, useState } from 'react';
import obtenerMovimientosFromModelo from '../config/obtenerMovimientosFromModelo';

const useMovimientosFromModelo = (modeloId, offset) => {
    const [movimientos, setMovimientos] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cargarMovimientos = async () => {
            setCargando(true);
            try {
                const data = await obtenerMovimientosFromModelo(modeloId, offset);
                setMovimientos(data.data);
                setError(null);
            } catch (error) {
                setError(error);
            } finally {
                setCargando(false);
            }
        };

        cargarMovimientos();
    }, [modeloId, offset]);

    return { movimientos };
}

export default useMovimientosFromModelo;