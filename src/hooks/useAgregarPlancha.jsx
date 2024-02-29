import { useState } from 'react';
import agregarPlancha from '../config/agregarPlancha';

const useAgregarPlancha = () => {
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);
    const [respuesta, setRespuesta] = useState(null);

    const enviarPlancha = async (datosPlancha) => {
        setCargando(true);
        try {
            const data = await agregarPlancha(datosPlancha);
            setRespuesta(data); // Esto actualiza el estado para uso futuro, pero no se necesita esperar para devolver el valor.
            setError(null);
            return data; // Devuelve el valor directamente.
        } catch (error) {
            setError("Error al guardar la plancha en la base de datos");
            setRespuesta(null);
            console.error(error);
            throw error; // Es buena práctica propagar el error para manejarlo en la función que llama.
        } finally {
            setCargando(false);
        }
    };

    return { enviarPlancha, cargando, error, respuesta };
};

export default useAgregarPlancha;