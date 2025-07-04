import clienteAxios from "./clienteAxios";

const obtenerModelosFromFamilia = async (idFamilia) => {
    try {
        const json = {
            "familiaId": idFamilia
        };
        const response = await clienteAxios.post(`/modelos/deFamilia/`,json);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default obtenerModelosFromFamilia;