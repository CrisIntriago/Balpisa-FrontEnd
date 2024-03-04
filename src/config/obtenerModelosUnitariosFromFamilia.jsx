import clienteAxios from "./clienteAxios";

const obtenerModelosUnitariosFromFamilia = async (idFamilia) => {
    try {
        const json = {
            "familiaId": idFamilia
        };
        const response = await clienteAxios.post(`/modelos/unitarios/deFamilia/`,json);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default obtenerModelosUnitariosFromFamilia;