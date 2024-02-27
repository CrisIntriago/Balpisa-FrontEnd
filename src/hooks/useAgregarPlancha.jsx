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
            setRespuesta(data);
            setError(null);
        } catch (error) {
            setError("Error al guardar la plancha en la base de datos");
            setRespuesta(null);
            console.error(error);
        } finally {
            setCargando(false);
        }
    };

    return { enviarPlancha };
};

export default useAgregarPlancha;