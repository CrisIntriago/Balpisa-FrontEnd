import clienteAxios from "./clienteAxios";

const movimientosPorPlancha = async (planchaId) => {
    try {
        const response = await clienteAxios.get(`/movimientos/plancha/${planchaId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default movimientosPorPlancha;