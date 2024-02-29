import clienteAxios from "./clienteAxios";

const obtenerMovimientos = async (fechaInicio, fechaFin) => {
    try {
        console.log("Mostrando modelos from familia")
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