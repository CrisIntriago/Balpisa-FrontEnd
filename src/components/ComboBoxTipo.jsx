import Select from 'react-select';

const ComboBoxTipo = ({ onSelectFamilia, familias }) => {

    const opcionesFamilias = familias.map(({ id, nombre }) => ({ value: id, label: nombre }));

    const handleSelectChange = (selectedOption) => {
        onSelectFamilia(selectedOption ? selectedOption.value : '');
    };

    return (
        <div>
            <p>Familia:</p>
            <Select 
                placeholder ='Seleccione una familia'
                options = {opcionesFamilias}
                onChange={ handleSelectChange }
                defaultInputValue=''
                isClearable={true}
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