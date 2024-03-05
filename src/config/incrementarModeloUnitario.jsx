import clienteAxios from "./clienteAxios";

const IncrementarModeloUnitario = async (modeloId, cantidad) => {
    try {
        const response = await clienteAxios.patch(`/modelos/unitarios/operacion/${modeloId}/incrementar/${cantidad}`);
        alert('La cantidad ha sido aumentada con éxito');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default IncrementarModeloUnitario;