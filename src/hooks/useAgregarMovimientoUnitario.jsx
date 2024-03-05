import { useState } from 'react';
import agregarMovimientoUnitario from '../config/agregarMovimientoUnitario';

const useAgregarMovimientoUnitario = () => {
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);
    const [respuesta, setRespuesta] = useState(null);

    const enviarMovimientoUnitario = async (datosMovimiento) => {
        setCargando(true);
        try {
            const data = await agregarMovimientoUnitario(datosMovimiento);
            setRespuesta(data);
            setError(null);
        } catch (error) {
            setError("Error al guardar el movimiento en la base de datos");
            setRespuesta(null);
            console.error(error);
        } finally {
            setCargando(false);
        }
    };

    return { enviarMovimientoUnitario };
};

export default useAgregarMovimientoUnitario;