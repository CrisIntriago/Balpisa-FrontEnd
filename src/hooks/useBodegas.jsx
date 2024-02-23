import { useEffect, useState } from 'react';
import obtenerBodegas from '../config/obtenerBodegas';

const useBodegas = () => {
    const [bodegas, setBodegas] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cargarBodegas = async () => {
            setCargando(true);
            try {
                const data = await obtenerBodegas();
                setBodegas(data);
                setError(null); // Limpia errores previos si la petición es exitosa
            } catch (error) {
                setError(error);
            } finally {
                setCargando(false);
            }
        };

        cargarBodegas();
    }, []); // El arreglo vacío asegura que este efecto se ejecute solo una vez al montar el componente

    return { bodegas };
};

export default useBodegas;