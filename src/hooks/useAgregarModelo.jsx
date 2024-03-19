import { useState } from 'react';
import agregarModelo from '../config/agregarModelo';

const useAgregarModelo = () => {
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);
    const [respuesta, setRespuesta] = useState(null);

    const enviarModelo = async (datosModelo) => {
        setCargando(true);
        try {
            const data = await agregarModelo(datosModelo);
            setRespuesta(data);
            setError(null);
        } catch (error) {
            setError("Error al guardar el modelo en la base de datos");
            setRespuesta(null);
            console.error(error);
        } finally {
            setCargando(false);
        }
    };

    return { enviarModelo };
};

export default useAgregarModelo;