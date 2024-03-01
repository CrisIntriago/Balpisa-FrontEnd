import { useState } from 'react';
import cambiarBodega from '../config/cambiarBodega';

const useCambiarBodega = () => {
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);
    const [respuesta, setRespuesta] = useState(null);

    const hacerCambioBodega = async (planchaId, bodegaId) => {
        setCargando(true);
        try {
            const data = await cambiarBodega(planchaId, bodegaId);
            setRespuesta(data);
            setError(null);
        } catch (error) {
            setError("Error al hacer cambio en la base de datos");
            setRespuesta(null);
            console.error(error);
        } finally {
            setCargando(false);
        }
    };

    return { hacerCambioBodega };
};

export default useCambiarBodega;