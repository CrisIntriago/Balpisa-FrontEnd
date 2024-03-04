import clienteAxios from './clienteAxios';

const obtenerFamilias = async () => {
    try {
        const response = await clienteAxios.get('/familias');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default obtenerFamilias;