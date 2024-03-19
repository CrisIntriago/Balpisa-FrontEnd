import clienteAxios from "./clienteAxios";

const agregarModelo = async (datosModelo) => {
    try {
        const response = await clienteAxios.post(`/modelos/`, datosModelo);
        alert('El modelo ha sido guardado con éxito.');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default agregarModelo;