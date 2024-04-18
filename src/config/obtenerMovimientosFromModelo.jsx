import clienteAxios from "./clienteAxios";

const obtenerMovimientosFromModelo = async (modeloId, offset) => {
    try {
        const json = {
            "modeloId": modeloId,
            "offset": offset
        }
        const response = await clienteAxios.post(`/movimientos/movimientosPorModelo`, json);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default obtenerMovimientosFromModelo;