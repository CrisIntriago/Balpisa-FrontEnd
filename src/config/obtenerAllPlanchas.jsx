import clienteAxios from "./clienteAxios";

const obtenerAllPlanchas = async (modeloId, bodegaId) => {
    try {
        const response = await clienteAxios.get(`/modelos/allPlanchas/?modeloId=${modeloId}&bodegaId=${bodegaId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default obtenerAllPlanchas;