import { useEffect, useState } from 'react';
import obtenerFamilias from '../config/obtenerFamilias';

const useFamilias = () => {
    const [familias, setFamilias] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cargarFamilias = async () => {
            setCargando(true);
            try {
                const data = await obtenerFamilias();
                setFamilias(data);
                setError(null); // Limpia errores previos si la petición es exitosa
            } catch (error) {
                setError(error);
            } finally {
                setCargando(false);
            }
        };

        cargarFamilias();
    }, []); // El arreglo vacío asegura que este efecto se ejecute solo una vez al montar el componente

    return { familias };
};

export default useFamilias;