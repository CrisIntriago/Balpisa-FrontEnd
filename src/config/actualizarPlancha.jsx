import clienteAxios from "./clienteAxios";

const actualizarPlancha = async (planchaId, datosPlancha) => {
    try {
        const response = await clienteAxios.put(`/planchas/${planchaId}`, datosPlancha);
        alert('La plancha ha sido modificada con éxito.');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default actualizarPlancha;