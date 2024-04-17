import clienteAxios from "./clienteAxios";

const agregarMovimiento = async (datosMovimiento) => {
    try {
        const response = await clienteAxios.post(`/movimientos/`, datosMovimiento);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default agregarMovimiento;