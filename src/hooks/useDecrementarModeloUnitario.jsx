import { useState } from 'react';
import DecrementarModeloUnitario from '../config/DecrementarModeloUnitario';

const useDecrementarModeloUnitario = () => {
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);
    const [respuesta, setRespuesta] = useState(null);

    const decrementarUnitario = async (modeloId, cantidad) => {
        setCargando(true);
        try {
            const data = await DecrementarModeloUnitario(modeloId, cantidad);
            setRespuesta(data);
            setError(null);
        } catch (error) {
            setError("Error al guardar el decremento en la base de datos");
            setRespuesta(null);
            console.error(error);
        } finally {
            setCargando(false);
        }
    };

    return { decrementarUnitario };
};

export default useDecrementarModeloUnitario;