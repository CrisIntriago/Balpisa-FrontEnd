import { useState, useEffect } from 'react';
import obtenerPlanchaFromId from '../config/obtenerPlanchaFromId';

const usePlanchaFromId = (planchaId) => {
    const [plancha, setPlanchas] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!planchaId) return;
            setCargando(true);
            try {
                // Llamada a la API o función para obtener los modelos
                const response = await obtenerPlanchaFromId(planchaId);
                // Acceder al arreglo dentro del objeto 'data' de la respuesta
                const planchas = response.data;
                // Actualizar el estado con el arreglo de modelos
                setPlanchas(planchas[0]);
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
    }, [planchaId]);

    return { plancha };
};

export default usePlanchaFromId;