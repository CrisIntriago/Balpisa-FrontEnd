import clienteAxios from "./clienteAxios";

const obtenerPlanchaDisponibleSimple = async (modeloId, bodegaId) => {
    try {
        const response = await clienteAxios.get(`/planchas/idNombres/disponibles/?modeloId=${modeloId}&bodegaId=${bodegaId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default obtenerPlanchaDisponibleSimple;