import { useState } from 'react';
import actualizarPlancha from '../config/actualizarPlancha';

const useActualizarPlancha = () => {
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);
    const [respuesta, setRespuesta] = useState(null);

    const enviarPlanchaActualizada = async (planchaId, datosPlancha) => {
        setCargando(true);
        try {
            const data = await actualizarPlancha(planchaId, datosPlancha);
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

    return { enviarPlanchaActualizada };
};

export default useActualizarPlancha;