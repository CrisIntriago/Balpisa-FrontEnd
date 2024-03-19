import { useState } from 'react';
import modificarModelo from '../config/modificarModelo';

const useModificarModelo = () => {
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);
    const [respuesta, setRespuesta] = useState(null);

    const modificarModel = async (modeloId, datosModelo) => {
        setCargando(true);
        try {
            const data = await modificarModelo(modeloId, datosModelo);
            setRespuesta(data);
            setError(null);
        } catch (error) {
            setError("Error al modificar modelo en la base de datos");
            setRespuesta(null);
            console.error(error);
        } finally {
            setCargando(false);
        }
    };

    return { modificarModel };
};

export default useModificarModelo;