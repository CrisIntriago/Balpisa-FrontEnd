import clienteAxios from "./clienteAxios";

const obtenerPlanchasSimple = async (modeloId, bodegaId) => {
    try {
        const response = await clienteAxios.get(`/planchas/idNombres/todos/?modeloId=${modeloId}&bodegaId=${bodegaId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default obtenerPlanchasSimple;