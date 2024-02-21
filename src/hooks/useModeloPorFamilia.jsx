import { useState, useEffect } from 'react';
import obtenerModelosFromFamilia from '../config/obtenerModelosFromFamilia';

const useModelosPorFamilia = (idFamilia) => {
    const [modelos, setModelos] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!idFamilia) return;
            setCargando(true);
            try {
                const data = await obtenerModelosFromFamilia(idFamilia);
                setModelos(data);
                setError(null);
            } catch (error) {
                setError("Error al obtener los modelos de la base de datos");
                console.error(error);
            } finally {
                setCargando(false);
            }
        };

        fetchData();
    }, [idFamilia]);

    return { modelos };
};

export default useModelosPorFamilia;