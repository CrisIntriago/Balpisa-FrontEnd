import clienteAxios from "./clienteAxios";

const obtenerMovimientos = async (fechaInicio, fechaFin) => {
    try {
        const json = {
            "fechaInicio": fechaInicio,
            "fechaFin": fechaFin
        }
        const response = await clienteAxios.post(`/movimientos/movimientosEnFecha`, json);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default obtenerMovimientos;