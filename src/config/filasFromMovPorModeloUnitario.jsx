import clienteAxios from './clienteAxios';

const filasFromMovPorModeloUnitario = async (modeloId) => {
    try {
        const json = {
            "modeloId": modeloId
        }
        const response = await clienteAxios.post('/movimientos/unitarios/movimientosPorModelo/nFilas',json);
        console.log(response.data)
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default filasFromMovPorModeloUnitario;