import clienteAxios from "./clienteAxios";

const IncrementarModeloUnitario = async (modeloId, bodegaId, cantidad) => {
    try {
        const response = await clienteAxios.put(`/modelos/unitarios/operacion/incrementar/${modeloId}/${bodegaId}/${cantidad}`);
        alert('La cantidad ha sido aumentada con éxito');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default IncrementarModeloUnitario;
