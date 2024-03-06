import clienteAxios from './clienteAxios';

const filasFromMovimientosUnitarios = async (fechaInicio, fechaFin) => {
    try {
        const json = {
            "fechaInicio": fechaInicio,
            "fechaFin": fechaFin
        }
        const response = await clienteAxios.post('/movimientos/unitarios/nFilas',json);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default filasFromMovimientosUnitarios;