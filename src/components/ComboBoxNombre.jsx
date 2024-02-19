import Select from 'react-select';

const ComboBoxNombre = ({ tipoSeleccionado, onSelectNombre, ceramicas }) => {

    // Filtrar nombres de cerámica basados en el tipo seleccionado
    const nombresFiltrados = [{ value: '', label: "Todos" }, ...ceramicas
        .filter(ceramica => ceramica.postId === tipoSeleccionado)
        .map(ceramica => ({ value: ceramica.id, label: ceramica.email }))];

    const handleSelectChange = (selectedOption) => {
        onSelectNombre(selectedOption.value);
    };

    return (
        <div>
            <p>Nombre:</p>
            <Select 
                placeholder ='Seleccione un nombre'
                options = {nombresFiltrados}
                onChange={ handleSelectChange }
                defaultInputValue=''
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