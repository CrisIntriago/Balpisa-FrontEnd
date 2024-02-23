import Select from 'react-select';

const ComboBox = ({ placeholder, value, onChange, options, width = 250 }) => {
    return (
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
    );
};

export default ComboBox;