import clienteAxios from './clienteAxios';

const obtenerFilasMovimientos = async () => {
    try {
        const response = await clienteAxios.get('/movimientos/nFilas');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default obtenerFilasMovimientos;