import clienteAxios from "./clienteAxios";

const modificarModeloUnitario = async (modeloId, datosModelo) => {
    try {
        const response = await clienteAxios.put(`/modelos/unitarios/${modeloId}`, datosModelo);
        alert('Modelo Modificado Con Éxito');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default modificarModeloUnitario;