import clienteAxios from './clienteAxios';

const filasFromMovPorModelo = async (modeloId) => {
    try {
        const json = {
            "modeloId": modeloId,
            "offset": 0
        }
        const response = await clienteAxios.post('/movimientos/movimientosPorModelo/nFilas',json);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default filasFromMovPorModelo;