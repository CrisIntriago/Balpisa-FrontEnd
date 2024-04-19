import { useState } from 'react';
import actualizarMovimientoUnitario from '../config/actualizarMovimientoUnitario';

const useActualizarMovimientoUnitario = () => {
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);
    const [respuesta, setRespuesta] = useState(null);

    const enviarMovActualizado = async (movimientoId, datosMovimiento) => {
        setCargando(true);
        try {
            const data = await actualizarMovimientoUnitario(movimientoId, datosMovimiento);
            setRespuesta(data);
            setError(null);
            return data;
        } catch (error) {
            setError("Error al guardar la plancha en la base de datos");
            setRespuesta(null);
            console.error(error);
        } finally {
            setCargando(false);
        }
    };

    return { enviarMovActualizado };
};

export default useActualizarMovimientoUnitario;