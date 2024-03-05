import clienteAxios from "./clienteAxios";

const agregarMovimientoUnitario = async (datosMovimiento) => {
    try {
        const response = await clienteAxios.post(`/movimientos/unitarios/`, datosMovimiento);
        alert('El movimiento ha sido guardado con éxito.');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default agregarMovimientoUnitario;