import { useState, useEffect } from 'react';
import gastarPlancha from '../config/gastarPlancha';

const useGastarPlancha = () => {
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);
    const [respuesta, setRespuesta] = useState(null);

    const gastarPlanchaPorId = async (planchaId) => {
        setCargando(true);
        try {
            const data = await gastarPlancha(planchaId);
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

    return { gastarPlanchaPorId };
};

export default useGastarPlancha;