import clienteAxios from "./clienteAxios";

const eliminarMovimiento = async (movId) => {
    try {
        const response = await clienteAxios.post(`/movimientos/eliminar/${movId}`);
        alert('Movimiento eliminado con éxito.');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default eliminarMovimiento;