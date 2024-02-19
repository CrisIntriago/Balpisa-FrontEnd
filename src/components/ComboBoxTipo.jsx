import Select from 'react-select';


const ComboBoxTipo = ({ onSelectTipo, ceramicas }) => {

    // Obtener tipos únicos de cerámica
    const tiposUnicos = [...new Set(ceramicas.map(ceramica => ceramica.postId))];

    // Convertir a opciones para el Select
    const opcionesTipos = [{ value: '', label: "Todos" }, ...tiposUnicos.map( (postId) => ({ value: postId, label: postId }))];

    const handleSelectChange = (selectedOption) => {
        onSelectTipo(selectedOption.value);
    };

    return (
        <div>
            <p>Tipo:</p>
            <Select 
                placeholder ='Seleccione un tipo'
                options = {opcionesTipos}
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

export default ComboBoxTipo;