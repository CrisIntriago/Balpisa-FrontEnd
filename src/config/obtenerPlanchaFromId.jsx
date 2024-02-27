import clienteAxios from "./clienteAxios";

const obtenerPlanchaFromId = async (planchaId) => {
    try {
        console.log("haciendo fetch planchafromid");
        const response = await clienteAxios.get(`/planchas/${planchaId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default obtenerPlanchaFromId;