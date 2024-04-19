import clienteAxios from "./clienteAxios";

const obtenerMovimientosFromModeloUnitario = async (modeloId, offset) => {
    try {
        const json = {
            "modeloId": modeloId,
            "offset": offset
        }
        const response = await clienteAxios.post(`/movimientos/unitarios/movimientosPorModelo`, json);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default obtenerMovimientosFromModeloUnitario;