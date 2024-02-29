import { useState } from 'react';
import agregarMovimiento from '../config/agregarMovimiento';

const useAgregarMovimiento = () => {
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);
    const [respuesta, setRespuesta] = useState(null);

    const enviarMovimiento = async (datosMovimiento) => {
        setCargando(true);
        try {
            const data = await agregarMovimiento(datosMovimiento);
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

    return { enviarMovimiento };
};

export default useAgregarMovimiento;