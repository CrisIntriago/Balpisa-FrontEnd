import clienteAxios from "./clienteAxios";

const agregarPlancha = async (datosPlancha) => {
    try {
        const response = await clienteAxios.post(`/planchas/`, datosPlancha);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default agregarPlancha;