import React, {PropTypes}                     from 'react';
import { MaskedInput }                        from 'react-text-mask';

// Libs
import moment from 'moment';

const FormMaskedInput = ({state_obj, addon, type, col = null, resource_name, attr_name, attr_label, placeholder, change_handler}) => {
  function capitalize(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const masks = {
    phone: ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
    cpf: [/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'-',/\d/,/\d/],
    cnpj: [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/],
    cep: [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
    date: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
  };
  const placeholders = {
    phone: "ex: (62) 99112-5566",
    cpf: "ex: 012.034.045-56",
    cnpj: "ex: 12.234.456/0001-22",
    cep: "ex: 75.080-090",
    date: "ex: 15/10/1990"
  }

  placeholder = !!placeholder ? placeholder : placeholders[type];

  let resource = state_obj[resource_name];
  return (
    <div className={`form-group ${col || ''} ` + (state_obj.formErrors[attr_name] ? 'has-danger has-feedback' : '') }>
      <label htmlFor={attr_name}>{attr_label || capitalize(attr_name)} <small className="form-error">{state_obj.formErrors[attr_name]}</small></label>
      <div className="input-group">
        {addon && <div className="input-group-addon"><i className={addon}></i></div>}
        <MaskedInput
          id={attr_name}
          name={attr_name}
          placeholder={placeholder}
          onChange={change_handler}
          mask={masks[type]}
          className="form-control"
          value={type === 'date' ? (!!resource[attr_name] ? moment(resource[attr_name]).format('DD/MM/YYYY') : '') : (state_obj[resource_name][attr_name] || '')}
        />
      </div>
    </div>
  );
};

FormMaskedInput.propTypes = {
  state_obj: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired, // valid: 'phone', 'cpf', 'cnpj', 'date'
  addon: PropTypes.string,
  resource_name: PropTypes.string.isRequired,
  attr_name: PropTypes.string.isRequired,
  attr_label: PropTypes.string,
  placeholder: PropTypes.string,
  col: PropTypes.string,
  change_handler: PropTypes.func.isRequired
};

export default FormMaskedInput;
