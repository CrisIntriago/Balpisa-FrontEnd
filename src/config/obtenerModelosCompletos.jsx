import clienteAxios from "./clienteAxios";

const obtenerModelosCompletos = async (idFamilia) => {
    try {
        const json = {
            "familiaId": idFamilia
        };
        const response = await clienteAxios.post(`/modelos/m2Disponibles/`,json);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default obtenerModelosCompletos;