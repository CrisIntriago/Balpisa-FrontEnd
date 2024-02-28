import clienteAxios from "./clienteAxios";

const actualizarPlancha = async (planchaId, datosPlancha) => {
    try {
        console.log("haciendo fetch planchafromid");
        const response = await clienteAxios.put(`/planchas/${planchaId}`, datosPlancha);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default actualizarPlancha;