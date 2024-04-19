import { useEffect, useState } from 'react';
import filasFromMovPorModeloUnitario from '../config/filasFromMovPorModeloUnitario';
const useFilasFromMovPorModeloUnitario = (modeloId) => {
    const [totalFilas, setFilas] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cargarFilas = async () => {
            setCargando(true);
            try {
                const data = await filasFromMovPorModeloUnitario(modeloId);
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

export default useFilasFromMovPorModeloUnitario;
