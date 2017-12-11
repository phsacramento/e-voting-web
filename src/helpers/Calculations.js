
export function calculateValue(base_value, auxiliaries_qty = 0, has_instrumentator = false, anesthetist_value = 0){
  base_value = Number(base_value);
  let value = base_value;
  value += calculateAuxiliaries(base_value, auxiliaries_qty);
  if(has_instrumentator)
    value += calculateInstrumentator(base_value);
  return value + Number(anesthetist_value);
}
export function calculateAuxiliaries(value, auxiliaries_qty){
  value = Number(value);
  auxiliaries_qty = Number(auxiliaries_qty);

  let base = value;
  let auxiliaries_value = 0;
  for(let i = 1; i <= auxiliaries_qty; i++){
    if(i === 1)
      auxiliaries_value += 0.3*base;
    else
      auxiliaries_value += 0.2*base;
  }

  return auxiliaries_value;
}
export function calculateInstrumentator(value){
  value = Number(value);
  return value*0.1;
}