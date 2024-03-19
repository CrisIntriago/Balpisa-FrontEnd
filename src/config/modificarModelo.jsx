import clienteAxios from "./clienteAxios";

const modificarModelo = async (modeloId, datosModelo) => {
    try {
        const response = await clienteAxios.put(`/modelos/${modeloId}`, datosModelo);
        alert('Modelo Modificado Con Éxito');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default modificarModelo;