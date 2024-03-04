import { useState, useEffect } from 'react';
import obtenerModelosUnitariosCompletos from '../config/obtenerModelosUnitariosCompletos';

const useModelosUnitariosCompletos = (idFamilia) => {
    const [modelosCompletos, setModelosCompletos] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!idFamilia) return;
            setCargando(true);
            try {
                // Llamada a la API o función para obtener los modelos
                const response = await obtenerModelosUnitariosCompletos(idFamilia);
                // Acceder al arreglo dentro del objeto 'data' de la respuesta
                const modelosCompletos = response.data;
                // Actualizar el estado con el arreglo de modelos
                setModelosCompletos(modelosCompletos);
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
    }, [idFamilia]);

    return { modelosCompletos };
};

export default useModelosUnitariosCompletos;