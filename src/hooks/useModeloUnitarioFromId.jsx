import { useState, useEffect } from 'react';
import obtenerModeloUnitarioFromId from '../config/obtenerModeloUnitarioFromId';

const useModeloUnitarioFromId = (modeloId) => {
    const [modelo, setModelo] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!modeloId) return;
            setCargando(true);
            try {
                // Llamada a la API o función para obtener los modelos
                const response = await obtenerModeloUnitarioFromId(modeloId);
                // Acceder al arreglo dentro del objeto 'data' de la respuesta
                const modelo = response.data[0];
                // Actualizar el estado con el arreglo de modelos
                setModelo(modelo);
                setError(null);
            } catch (error) {
                // Manejar el error
                setError("Error al obtener modelo unitario de la base de datos");
                console.error(error);
            } finally {
                // Finalizar la indicación de carga, independientemente del resultado
                setCargando(false);
            }
        };

        fetchData();
    }, [modeloId]);

    return { modelo };
};

export default useModeloUnitarioFromId;