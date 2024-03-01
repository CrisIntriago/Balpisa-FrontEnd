import Select from 'react-select';

const ComboBox = ({ placeholder, value, onChange, options, label, width = 250 }) => {
    return (
        <div className='mx-10'>
            <p>{label}</p>
            <Select
                placeholder={placeholder}
                options={options}
                onChange={onChange}
                value={options.find(option => option.value === value)}
                isClearable={true}
                styles={{
                    control: (provided) => ({
                    ...provided,
                    width: width, // Usa un porcentaje para el ancho
                    maxWidth: 300, // Un máximo fijo para evitar que sea demasiado grande
                }),
                }}
            />
        </div>
    );
};

export default ComboBox;