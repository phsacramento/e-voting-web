import React, {PropTypes} from 'react';

const ArrayInput = ({state_obj, col = 'col-md-11', resource_name, attr_name, attr_label, placeholder = "", change_handler = null, set_state_func}) => {
  function capitalize(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function arrayValueChange(evt){
    console.log(evt.target.value, evt.target.name);
    
    if(!!change_handler){
      change_handler(evt);
    } else {
      let index = Number(evt.target.name.split('[')[1].split(']')[0]);
      state_obj[resource_name][attr_name][index] = evt.target.value;
      set_state_func(state_obj);
    }
  }
  function handleRemoval(evt){
    evt.preventDefault();
    state_obj[resource_name][attr_name].splice(Number(evt.target.name), 1);
    set_state_func(state_obj);
  }
  function addItem(evt){
    evt.preventDefault();

    if(!!state_obj[resource_name][attr_name])
      state_obj[resource_name][attr_name].push("");
    else
      state_obj[resource_name][attr_name] = [""];

    set_state_func(state_obj);
  }

  function itemToRender(item, index){
    return (
      <div className="row array-input-item" key={index}>
        <div className={`form-group ${col} ` + (state_obj.formErrors[attr_name] ? 'has-danger has-feedback' : '') }>
          <input className="form-control" type="text" name={`${attr_name}[${index}]`} onChange={arrayValueChange} value={state_obj[resource_name][attr_name][index] || ''}/>
        </div>
        <div className="col-md-1">
          <button className="btn btn-danger" name={index} onClick={handleRemoval}>X</button>
        </div>
      </div>
    )
  }

  return (
    <div className="array-input">
      <label>{attr_label || capitalize(attr_name)} <small className="form-error">{state_obj.formErrors[attr_name]}</small></label>
      {state_obj[resource_name][attr_name].map((item, index) => {
        return itemToRender(item, index);
      })}
      <br/>
      <button className="btn btn-primary" onClick={addItem}>Adicionar</button>&nbsp;&nbsp;
      <br/>
      <br/>
    </div>
  );
};

ArrayInput.propTypes = {
  state_obj: PropTypes.object.isRequired,
  resource_name: PropTypes.string.isRequired,
  attr_name: PropTypes.string.isRequired,
  attr_label: PropTypes.string,
  placeholder: PropTypes.string,
  col: PropTypes.string,
  change_handler: PropTypes.func,
  set_state_func: PropTypes.func.isRequired
};

export default ArrayInput;
