import clienteAxios from './clienteAxios';

const obtenerBodegas = async () => {
    try {
        const response = await clienteAxios.get('/bodegas/');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default obtenerBodegas;