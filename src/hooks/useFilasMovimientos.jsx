import { useEffect, useState } from 'react';
import obtenerFilasMovimientos from '../config/obtenerFilasMovimientos';

const useFilasMovimientos = () => {
    const [totalFilas, setFilas] = useState('');
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cargarFilas = async () => {
            setCargando(true);
            try {
                const data = await obtenerFilasMovimientos();
                setFilas(data.nFilas);
                setError(null); // Limpia errores previos si la petición es exitosa
            } catch (error) {
                setError(error);
            } finally {
                setCargando(false);
            }
        };

        cargarFilas();
    }, []); // El arreglo vacío asegura que este efecto se ejecute solo una vez al montar el componente

    return { totalFilas };
};

export default useFilasMovimientos;