import clienteAxios from "./clienteAxios";

const obtenerModeloFromId = async (modeloId) => {
    try {
        const response = await clienteAxios.get(`/modelos/obtenerById/${modeloId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default obtenerModeloFromId;