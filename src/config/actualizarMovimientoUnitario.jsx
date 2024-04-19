import clienteAxios from "./clienteAxios";

const actualizarMovimientoUnitario = async (movimientoId, datosMovimiento) => {
    try {
        const response = await clienteAxios.put(`/movimientos/unitarios/${movimientoId}`, datosMovimiento);
        alert('El movimiento ha sido modificado con éxito.');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default actualizarMovimientoUnitario;