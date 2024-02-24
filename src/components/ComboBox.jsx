import Select from 'react-select';

const ComboBox = ({ placeholder, value, onChange, options, label, width = 250 }) => {
    return (
        <div>
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
                        width: width,
                        marginRight: 10,
                    }),
                }}
            />
        </div>
    );
};

export default ComboBox;