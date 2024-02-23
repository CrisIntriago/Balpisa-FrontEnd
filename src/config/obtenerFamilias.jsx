import clienteAxios from './clienteAxios';

const obtenerFamilias = async () => {
    try {
        console.log("Haciendo fetch familias")
        const response = await clienteAxios.get('/familias');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default obtenerFamilias;