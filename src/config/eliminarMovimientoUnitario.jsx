import clienteAxios from "./clienteAxios";

const eliminarMovimientoUnitario = async (movId) => {
    try {
        const response = await clienteAxios.post(`/movimientos/unitarios/${movId}`);
        alert('Movimiento eliminado con éxito.');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default eliminarMovimientoUnitario;