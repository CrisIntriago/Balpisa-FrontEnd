import clienteAxios from "./clienteAxios";

const obtenerMovimientos = async (fechaInicio, fechaFin, offset) => {
    try {
        const json = {
            "fechaInicio": fechaInicio,
            "fechaFin": fechaFin,
            "offset": offset
        }
        const response = await clienteAxios.post(`/movimientos/movimientosEnFecha`, json);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default obtenerMovimientos;