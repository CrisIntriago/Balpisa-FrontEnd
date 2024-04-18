import { useEffect, useState } from 'react';
import filasFromMovPorModelo from '../config/filasFromMovPorModelo';
const useFilasFromMovPorModelo = (modeloId) => {
    const [totalFilas, setFilas] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cargarFilas = async () => {
            setCargando(true);
            try {
                const data = await filasFromMovPorModelo(modeloId);
                setFilas(data.data[0].total);
                setError(null); // Limpia errores previos si la petición es exitosa
            } catch (error) {
                setError(error);
            } finally {
                setCargando(false);
            }
        };

        cargarFilas();
    }, [modeloId]); 

    return { totalFilas };
}

export default useFilasFromMovPorModelo;
