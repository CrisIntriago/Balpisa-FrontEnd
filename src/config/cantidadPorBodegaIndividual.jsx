import clienteAxios from "./clienteAxios";

const cantidadPorBodegaIndividual = async (modeloId, bodegaId) => {
    try {
        const response = await clienteAxios.get(`/modelos/unitarios/cantidadXBodega/${modeloId}/${bodegaId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default cantidadPorBodegaIndividual;