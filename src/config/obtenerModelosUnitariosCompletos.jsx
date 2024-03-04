import clienteAxios from "./clienteAxios";

const obtenerModelosUnitariosCompletos = async (idFamilia) => {
    try {
        const json = {
            "familiaId": idFamilia
        };
        const response = await clienteAxios.post(`/modelos/unitarios/m2Disponibles/`,json);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default obtenerModelosUnitariosCompletos;