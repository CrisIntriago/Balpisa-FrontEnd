import Select from 'react-select';

const ComboBox = ({ etiqueta, placeholder, opciones, valorSeleccionado, onChange, ancho = 250 }) => {
    const opcionesFormateadas = opciones.map(({ value, label }) => ({ value, label }));

    const handleChange = (selectedOption) => {
        onChange(selectedOption ? selectedOption.value : null);
    };

    return (
        <div>
            <p>{etiqueta}:</p>
            <Select
                placeholder={placeholder}
                options={opcionesFormateadas}
                onChange={handleChange}
                value={opcionesFormateadas.find(option => option.value === valorSeleccionado)}
                isClearable={true}
                styles={{
                    control: (provided) => ({
                        ...provided,
                        width: ancho,
                    }),
                }}
            />
        </div>
    );
};

export default ComboBox;