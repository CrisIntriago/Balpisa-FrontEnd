import clienteAxios from "./clienteAxios";

const cantidadesPorBodega = async (modeloId) => {
    try {
        const response = await clienteAxios.get(`/modelos/unitarios/cantidadXBodega/${modeloId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default cantidadesPorBodega;