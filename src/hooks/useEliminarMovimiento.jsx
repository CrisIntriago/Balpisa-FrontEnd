import { useState } from 'react';
import eliminarMovimiento from '../config/eliminarMovimiento';

const useEliminarMovimiento = () => {
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);
    const [respuesta, setRespuesta] = useState(null);

    const eliminarMov = async (idMov) => {
        setCargando(true);
        try {
            const data = await eliminarMovimiento(idMov);
            setRespuesta(data);
            setError(null);
        } catch (error) {
            setError("Error al eliminar el modelo en la base de datos");
            setRespuesta(null);
            console.error(error);
        } finally {
            setCargando(false);
        }
    };

    return { eliminarMov };
};

export default useEliminarMovimiento;