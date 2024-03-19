import clienteAxios from "./clienteAxios";

const agregarModeloUnitario = async (datosModelo) => {
    try {
        const response = await clienteAxios.post(`/modelos/unitarios/`, datosModelo);
        alert('El modelo ha sido guardado con éxito.');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default agregarModeloUnitario;