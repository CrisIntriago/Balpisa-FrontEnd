import clienteAxios from "./clienteAxios";

const imprimirMovimientos = async (fechaInicio, fechaFin) => {
    try {
        const json = {
            "fechaInicio": fechaInicio,
            "fechaFin": fechaFin
        }
        const response = await clienteAxios.post(`/movimientos/imprimir`, json);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default imprimirMovimientos;