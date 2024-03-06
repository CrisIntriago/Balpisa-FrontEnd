import clienteAxios from './clienteAxios';

const obtenerFilasMovimientos = async (fechaInicio, fechaFin) => {
    try {
        const json = {
            "fechaInicio": fechaInicio,
            "fechaFin": fechaFin
        }
        const response = await clienteAxios.post('/movimientos/nFilas',json);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default obtenerFilasMovimientos;