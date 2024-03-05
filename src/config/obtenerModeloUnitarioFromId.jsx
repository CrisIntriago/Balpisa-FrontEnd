import clienteAxios from "./clienteAxios";

const obtenerModeloUnitarioFromId = async (modeloId) => {
    try {
        const response = await clienteAxios.get(`/modelos/unitarios/${modeloId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default obtenerModeloUnitarioFromId;