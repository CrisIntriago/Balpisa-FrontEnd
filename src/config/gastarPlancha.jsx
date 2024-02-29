import clienteAxios from "./clienteAxios";

const gastarPlancha = async (planchaId) => {
    try {
        console.log("haciendo fetch gastarplancha");
        const response = await clienteAxios.put(`/planchas/gastarPlancha/${planchaId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default gastarPlancha;