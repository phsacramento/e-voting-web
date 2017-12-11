import React                                  from 'react';
import PropTypes                              from 'prop-types';

const TextInput = ({name, label, onChange, placeholder, value, error, disabled, type="text"}) => {

  return (
        <input
          type={type}
          name={name}
          className="form-control"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}/>
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string
};

export default TextInput;
