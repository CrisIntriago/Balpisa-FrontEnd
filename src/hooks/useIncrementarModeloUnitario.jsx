import { useState } from 'react';
import IncrementarModeloUnitario from '../config/IncrementarModeloUnitario';

const useIncrementarModeloUnitario = () => {
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);
    const [respuesta, setRespuesta] = useState(null);

    const incrementarUnitario = async (modeloId, bodegaSeleccionada, cantidad) => {
        setCargando(true);
        try {
            const data = await IncrementarModeloUnitario(modeloId, bodegaSeleccionada, cantidad);
            setRespuesta(data);
            setError(null);
        } catch (error) {
            setError("Error al guardar el incremento en la base de datos");
            setRespuesta(null);
            console.error(error);
        } finally {
            setCargando(false);
        }
    };

    return { incrementarUnitario };
};

export default useIncrementarModeloUnitario;