import React, {PropTypes} from 'react';

const FormInput = ({state_obj, col = null, resource_name, attr_name, attr_label, placeholder = "", change_handler}) => {
  function capitalize(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <div className={`form-group ${col || ''} ` + (state_obj.formErrors[attr_name] ? 'has-danger has-feedback' : '') }>
      <label htmlFor={attr_name}>{attr_label || capitalize(attr_name)} <small className="form-error">{state_obj.formErrors[attr_name]}</small></label>
      <input name={attr_name} onChange={change_handler} type="text" className="form-control" id={attr_name} placeholder={placeholder} value={state_obj[resource_name][attr_name] || ''}/>
    </div>
  );
};

FormInput.propTypes = {
  state_obj: PropTypes.object.isRequired,
  resource_name: PropTypes.string.isRequired,
  attr_name: PropTypes.string.isRequired,
  attr_label: PropTypes.string,
  placeholder: PropTypes.string,
  col: PropTypes.string,
  change_handler: PropTypes.func.isRequired
};

export default FormInput;
