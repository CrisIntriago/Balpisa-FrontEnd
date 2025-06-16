import { useState, useEffect } from 'react';
import obtenerAllPlanchas from '../config/obtenerAllPlanchas';

const UseAllPlanchas = (modeloId, bodegaId) => {
    const [planchas, setPlanchas] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!modeloId || !bodegaId) return;
            setCargando(true);
            try {
                // Llamada a la API o función para obtener los modelos
                const response = await obtenerAllPlanchas(modeloId, bodegaId);
                console.log(response)
                // Acceder al arreglo dentro del objeto 'data' de la respuesta
                const planchas = response.data;
                // Actualizar el estado con el arreglo de modelos
                setPlanchas(planchas);
                setError(null);
            } catch (error) {
                // Manejar el error
                setError("Error al obtener los modelos de la base de datos");
                console.error(error);
            } finally {
                // Finalizar la indicación de carga, independientemente del resultado
                setCargando(false);
            }
        };

        fetchData();
    }, [modeloId, bodegaId]);

    return { planchas };
};

export default UseAllPlanchas;