// Libs
import moment from 'moment';

export function handleCPFInputChange(evt, state_obj){
  // exits if cpf is not fully typed
  if(evt.target.value.replace(/_/g, '').length !== 14)
    return;

  const field         = evt.target.name;
  state_obj[field]  = evt.target.value.replace(/\.|-|_/g, '');

  return state_obj;
}
export function handleDateInputChange(evt, state_obj){

  // exits if date is not fully typed
  if(evt.target.value.replace(/_/g, '').length !== 10)
    return;

  const date = moment(evt.target.value, 'DD/MM/YYYY');
  const field = evt.target.name;
  if(date.isValid()) {
    state_obj[field] = date.format('YYYY-MM-DD');
  } else {
    evt.target.value = "";
    state_obj[field] = "";
  }

  return state_obj;
}

export function helperPhoneChange(evt, state_obj){
  const field = evt.target.name;

  state_obj[field] = evt.target.value.replace(/-|\(|\)|_|\s/g, '');
  return state_obj;
}

export function helperMonetaryChange(evt, state_obj){
  if(evt.target.value === ',')
    return;
  
  const name = evt.target.name;
  let field_value = evt.target.value.replace(',', '.');
  const regex = /^[0-9]*(\.[0-9]{0,2}){0,1}$/;
  
  if(regex.test(field_value))
    state_obj[name] = field_value;
  
  return state_obj;
}