import clienteAxios from "./clienteAxios";

const actualizarPlancha = async (planchaId, datosPlancha) => {
    try {
        console.log("haciendo fetch planchafromid");
        const response = await clienteAxios.put(`/planchas/${planchaId}`, datosPlancha);
        alert('La plancha ha sido actualizada con éxito.');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default actualizarPlancha;