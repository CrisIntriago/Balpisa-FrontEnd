import { useState, useEffect } from 'react';
import movimientosPorPlancha from '../config/movimientosPorPlancha';

const useMovimientosPorPlancha = (planchaId) => {
    const [movimientos, setMovimientos] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!planchaId) return;
            setCargando(true);
            try {
                // Llamada a la API o función para obtener los modelos
                const response = await movimientosPorPlancha(planchaId);
                // Acceder al arreglo dentro del objeto 'data' de la respuesta
                const movimientos = response.data;
                // Actualizar el estado con el arreglo de modelos
                setMovimientos(movimientos);
                setError(null);
            } catch (error) {
                // Manejar el error
                setError("Error al obtener los movimientos de la base de datos");
                console.error(error);
            } finally {
                // Finalizar la indicación de carga, independientemente del resultado
                setCargando(false);
            }
        };

        fetchData();
    }, [planchaId]);

    return { movimientos };
};

export default useMovimientosPorPlancha;