import clienteAxios from "./clienteAxios";

const DecrementarModeloUnitario = async (modeloId, bodegaId, cantidad) => {
    try {
        const response = await clienteAxios.put(`/modelos/unitarios/operacion/decrementar/${modeloId}/${bodegaId}/${cantidad}`);
        alert('La cantidad ha sido reducida con éxito');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default DecrementarModeloUnitario;