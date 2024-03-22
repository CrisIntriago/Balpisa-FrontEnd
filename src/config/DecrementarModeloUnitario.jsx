import clienteAxios from "./clienteAxios";

const DecrementarModeloUnitario = async (modeloId, cantidad) => {
    try {
        const response = await clienteAxios.put(`/modelos/unitarios/operacion/${modeloId}/decrementar/${cantidad}`);
        alert('La cantidad ha sido reducida con éxito');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default DecrementarModeloUnitario;