/* eslint-disable */
import Alert from 'react-s-alert';

/**
 * Clones object
 * @type {Object}
 */
export function clone(obj) {
  var copy;

  // Handle the 3 simple types, and null or undefined
  if (null === obj || "object" !== typeof obj) return obj;

  // Handle Date
  if (obj instanceof Date) {
      copy = new Date();
      copy.setTime(obj.getTime());
      return copy;
  }

  // Handle Array
  if (obj instanceof Array) {
      copy = [];
      for (var i = 0, len = obj.length; i < len; i++) {
          copy[i] = clone(obj[i]);
      }
      return copy;
  }

  // Handle Object
  if (obj instanceof Object) {
      copy = {};
      for (var attr in obj) {
          if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
      }
      return copy;
  }

  throw new Error("Unable to copy object! Its type isn't supported.");
}
export function formRequestSuccess(msg = "As modificações foram salvas com sucesso.", reload = true){
  Alert.success(`<p>${msg}</p>`, {
      position: 'top',
      effect: 'stackslide',
      beep: false,
      timeout: 2000
  });
  if(reload)
    history.back();
}
export function requestError(err, msg = "Erro") {
  console.error(err);
  if(!!err.error && msg === "Erro")
    msg = err.error;

  Alert.error(`<p>${msg}</p>`, {
      position: 'top',
      effect: 'stackslide',
      beep: false,
      timeout: 3000
  });
}
export function formRequestError(err, context = null, msg = "Erro! As modificações não puderam ser salvas.") {
  console.error(err);
  window.scrollTo(0, 0);
  Alert.error(`<p>${msg}</p>`, {
      position: 'top',
      effect: 'stackslide',
      beep: false,
      timeout: 2000
  });

  let formErrors = {};
  for(let error of err) {
    formErrors[error.field] = error.message;
  }

  if(!!context) {
    context.setState({formErrors: formErrors, disableSubmit: true, submittingForm: false });
    setTimeout(function() { context.setState({disableSubmit: false}); }, 1000);
  }

  return formErrors;
}
export function getBase64(file, callback) {
   var reader = new FileReader();
   reader.readAsDataURL(file);
   reader.onload = function () {
      callback(reader.result);
   };
   reader.onerror = function (error) {
     console.log('Error: ', error);
   };
}

export function typeaheadFilter(resource_plural_name, attr_name, str, context, has_surname = false, extra_queries = {}){
  if(str.length >= 3){
    let toSend = {};
    if(has_surname && str.indexOf(' ') !== -1){
      toSend['name'] = str.substring(0, str.indexOf(' '));
      toSend['surname'] = str.substr(str.indexOf(' ') + 1);
    } else {
      toSend[attr_name] = str;
    }

    
    for(let key in extra_queries){
      toSend[key] = extra_queries[key];
    }
    
    context[`load${resource_plural_name}`](1, toSend);
  } else if (str.length === 1)
    context[`load${resource_plural_name}`]();
}
/**
 * Transforms the json data into form data.
 *
 * Example:
 *
 * Input:
 * 
 * fd = new FormData();
 * dob = {
 *  name: 'phone',
 *  photos: ['myphoto.jpg', 'myotherphoto.png'],
 *  price: '615.99',
 *  color: {
 *      front: 'red',
 *      back: 'blue'
 *  },
 *  buttons: ['power', 'volup', 'voldown'],
 *  cameras: [{
 *      name: 'front',
 *      res: '5Mpx'
 *  },{
 *      name: 'back',
 *      res: '10Mpx'
 *  }]
 * };
 * Say we want to replace 'myotherphoto.png'. We'll have this 'fob'.
 * fob = {
 *  photos: [null, <File object>]
 * };
 * Say we want to wrap the object (Rails way):
 * p = 'product';
 *
 * Output:
 *
 * 'fd' object updated. Now it will have these key-values "<key>, <value>":
 *
 * product[name], phone
 * product[photos][], myphoto.jpg
 * product[photos][], <File object>
 * product[color][front], red
 * product[color][back], blue
 * product[buttons][], power
 * product[buttons][], volup
 * product[buttons][], voldown
 * product[cameras][][name], front
 * product[cameras][][res], 5Mpx
 * product[cameras][][name], back
 * product[cameras][][res], 10Mpx
 * 
 * @param {FormData}  fd  FormData object where items will be appended to.
 * @param {Object}    dob Data object where items will be read from.
 * @param {Object =   null} fob File object where items will override dob's.
 * @param {string =   ''} p Prefix. Useful for wrapping objects and necessary for internal use (as this is a recursive method).
 */
export function append(fd, dob, fob = null, p = ''){
  let apnd = append;

  function isObj(dob, fob, p){
    if(typeof dob == "object" && fob == null){
      if(!!dob && dob.constructor === Array){
        p += '[]';
        for(let i = 0; i < dob.length; i++){
          let aux_fob = !!fob ? fob[i] : fob;
          isObj(dob[i], aux_fob, p);
        }
      } else {
        apnd(fd, dob, fob, p);
      }
    } else {
      let value = !!fob ? fob : dob;
      fd.append(p, value);
    }
  }

  for(let prop in dob){
    let aux_p = p == '' ? prop : `${p}[${prop}]`;
    let aux_fob = !!fob ? fob[prop] : fob;
    isObj(dob[prop], aux_fob, aux_p);
  }
}