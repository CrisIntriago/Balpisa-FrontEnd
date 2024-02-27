import clienteAxios from "./clienteAxios";

const obtenerPlanchasSimple = async (modeloId, bodegaId) => {
    try {
        console.log("haciendo fetch planchas"+modeloId + bodegaId);
        const json = {
            "modeloId": modeloId,
            "bodegaId" : bodegaId
        };
        const response = await clienteAxios.get(`/planchas/idNombres/todos/?modeloId=${modeloId}&bodegaId=${bodegaId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default obtenerPlanchasSimple;