import { useEffect, useState } from 'react';
import obtenerMovimientosFromModeloUnitario from '../config/obtenerMovimientosFromModeloUnitario';

const useMovimientosFromModeloUnitario = (modeloId, offset) => {
    const [movimientos, setMovimientos] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cargarMovimientos = async () => {
            setCargando(true);
            try {
                const data = await obtenerMovimientosFromModeloUnitario(modeloId, offset);
                setMovimientos(data.data);
                setError(null);
            } catch (error) {
                setError(error);
            } finally {
                setCargando(false);
            }
        };

        cargarMovimientos();
    }, [modeloId]);

    return { movimientos };
}

export default useMovimientosFromModeloUnitario;