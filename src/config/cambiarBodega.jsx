import clienteAxios from "./clienteAxios";

const cambiarBodega = async (planchaId, bodegaId) => {
    try {
        const response = await clienteAxios.put(`/planchas/cambioBodega/datos/?idPlancha=${planchaId}&idBodega=${bodegaId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default cambiarBodega;