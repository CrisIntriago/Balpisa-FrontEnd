import clienteAxios from "./clienteAxios";

export const obtenerModelosFromFamilia = async (idFamilia) => {
    try {
        console.log("obteniendoModelos")
        const response = await clienteAxios.get(`/modelos?FamiliaId=${idFamilia}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default obtenerModelosFromFamilia;