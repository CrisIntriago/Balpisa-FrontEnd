import { useState, useEffect } from 'react';
import obtenerModelosUnitariosFromFamilia from '../config/obtenerModelosUnitariosFromFamilia';

const useModelosUnitariosPorFamilia = (idFamilia) => {
    const [modelosUnitarios, setModelosUnitarios] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!idFamilia) return;
            setCargando(true);
            try {
                // Llamada a la API o función para obtener los modelos
                const response = await obtenerModelosUnitariosFromFamilia(idFamilia);
                // Acceder al arreglo dentro del objeto 'data' de la respuesta
                const modelosUnitarios = response.data;
                // Actualizar el estado con el arreglo de modelos
                setModelosUnitarios(modelosUnitarios);
                setError(null);
            } catch (error) {
                // Manejar el error
                setError("Error al obtener los modelos unitarios de la base de datos");
                console.error(error);
            } finally {
                // Finalizar la indicación de carga, independientemente del resultado
                setCargando(false);
            }
        };

        fetchData();
    }, [idFamilia]);

    return { modelosUnitarios };
};

export default useModelosUnitariosPorFamilia;