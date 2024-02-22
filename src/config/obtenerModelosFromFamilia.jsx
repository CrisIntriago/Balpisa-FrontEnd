import clienteAxios from "./clienteAxios";

export const obtenerModelosFromFamilia = async (idFamilia) => {
    try {
        console.log("obteniendoModelos")
        const json = {
            "familiaId": idFamilia
        };
        const response = await clienteAxios.post(`/modelos/familia/modelos/`,json);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default obtenerModelosFromFamilia;