import Select from 'react-select';
import useModelosPorFamilia from '../hooks/useModeloPorFamilia';

const ComboBoxNombre = ({ familiaSeleccionada, onSelectModelo, modeloSeleccionado }) => {
    const { modelos } = useModelosPorFamilia(familiaSeleccionada);

    const modelosFiltrados = [{ value: '', label: "Todos" }, ...modelos
        .filter(modelo => modelo.FamiliaId === familiaSeleccionada)
        .map(modelo => ({ value: modelo.id, label: modelo.nombre }))];

    const handleSelectChange = (selectedOption) => {
        onSelectModelo(selectedOption ? selectedOption.value : null);
    };

    return (
        <div>
            <p>Modelo:</p>
            <Select 
                placeholder ='Seleccione un modelo'
                options = {modelosFiltrados}
                onChange={handleSelectChange}
                value={modelosFiltrados.find(option => option.value === modeloSeleccionado)}
                defaultInputValue=''
                isClearable={true} // Permite un ícono para limpiar la selección
                styles={{
                    control: (provided, state) => ({
                        ...provided,
                        width: 250, // Establece el ancho fijo del Select en 200px
                    }),
                }}
            />
        </div>
    );
};

export default ComboBoxNombre;