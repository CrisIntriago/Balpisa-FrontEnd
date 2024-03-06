import { useEffect, useState } from 'react';
import filasFromMovimientosUnitarios from '../config/filasFromMovimientosUnitarios';

const useFilasFromMovimientosUnitarios = (fechaInicio, fechaFin) => {
    const [totalFilas, setFilas] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cargarFilas = async () => {
            setCargando(true);
            try {
                const data = await filasFromMovimientosUnitarios(fechaInicio, fechaFin);
                setFilas(data.data[0].total);
                setError(null); // Limpia errores previos si la petición es exitosa
            } catch (error) {
                setError(error);
            } finally {
                setCargando(false);
            }
        };

        cargarFilas();
    }, [fechaInicio,fechaFin]); 

    return { totalFilas };
}

export default useFilasFromMovimientosUnitarios;
