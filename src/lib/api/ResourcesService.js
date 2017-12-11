import {Constants}                            from '../../constants';
import {append}                               from '../../helpers/Utils';

const networkErrorMsg = "Falha na comunicação com o servidor: você está conectado à Internet?";

const axios = require('axios');

function parseJSON(response) {
  return new Promise((resolve, reject) => response.json()
    .then((json) => resolve({
      status: response.status,
      ok: response.ok,
      json,
    })));
}
const apiUrl = `${Constants.SERVER_URL}/${Constants.API_URL}`;
class ResourcesService {

  setResourcePluralName(str){
    this.resource_plural_name = str;
    if(!!this.container_name)
      this.setContainer(this.container_name, this.container_id);
    else
      this.baseUrl = `${apiUrl}/${str}`;
  }
  setResourceName(str){
    this.resource_name = str;
  }
  setContainer(name, id){
    this.container_name = name;
    this.container_id = id;
    if(!!name && !!id){
      let rp = !!this.resource_plural_name ? `/${this.resource_plural_name}` : '';
      this.baseUrl = `${apiUrl}/${name}/${id}` + rp;
    }
  }

  customHeaders(headers){
    this._customHeaders = headers;
  }

  constructor(resource_plural_name, resource_name = null, container_name = null, container_id = null){

    this.setContainer(container_name, container_id);
    this.setResourceName(resource_name);
    this.setResourcePluralName(resource_plural_name);

    this._requireParams('resource_plural_name');
  }

  load(page = 1, query = null) {
    let headers = this._getHeaders();
    let url = this.baseUrl + this._getURLParams(page, query);

    return new Promise((resolve, reject) => {
      fetch(`${url}`, {
        method: 'GET',
        headers: headers
      })
      .then(parseJSON)
      .then((response) => {
        if (response.ok) {
          return resolve(response.json);
        } else {
          if(response.json.errors)
            return reject(response.json.errors);
          else
            return reject(response.json);
        }
      })
      .catch((error) => reject(networkErrorMsg));
    });
  }
  get(id) {
    let headers = this._getHeaders();

    return new Promise((resolve, reject) => {
      fetch(`${this.baseUrl}/${id}`, {
        method: 'GET',
        headers: headers
      })
      .then(parseJSON)
      .then((response) => {
        if (response.ok) {
          return resolve(response.json);
        } else {
          return reject(response.json.errors);
        }
      })
      .catch((error) => reject(networkErrorMsg));
    });
  }
  put(obj, fob = null){
    this._requireParams('resource_name');

    let headers = this._getHeaders();

    return new Promise((resolve, reject) => {
      fetch(`${this.baseUrl}/${obj.id}`, {
        method: 'PUT',
        headers: headers,
        body: this._prepareToSend(obj, headers['Content-Type'], fob)
      })
      .then(parseJSON)
      .then((response) => {
        if (response.ok) {
          return resolve(response.json);
        } else {
          return reject(response.json.errors);
        }
      })
      .catch((error) => reject(networkErrorMsg));
    });
  }

  post(obj, fob = null){
    this._requireParams('resource_name');

    let headers = this._getHeaders();

    return new Promise((resolve, reject) => {
      fetch(this.baseUrl, {
        method: 'POST',
        headers: headers,
        body: this._prepareToSend(obj, headers['Content-Type'], fob)
      })
      .then(parseJSON)
      .then((response) => {
        if (response.ok) {
          return resolve(response.json);
        } else {
          return reject(response.json.errors);
        }
      })
      .catch((error) => reject(networkErrorMsg));
    });
  }
  destroy(id) {
    let headers = this._getHeaders();

    // return new Promise((resolve, reject) => {
    //   fetch(`${this.baseUrl}/${id}`, {
    //     method: 'DELETE',
    //     headers: headers
    //   })
    //   .then(parseJSON)
    //   .then((response) => {
    //     if (response.ok) {
    //       return resolve(response.json);
    //     } else {
    //       return reject(response.json.errors);
    //     }
    //   })
    //   .catch((error) => reject(networkErrorMsg));
    // });

    return new Promise((resolve, reject) => {
      axios.delete(`${this.baseUrl}/${id}`, {id: id}, {headers: headers})
        .then((response) => {
          resolve(response);
        }).catch((error) => {
          reject(networkErrorMsg);
        });
    });
  }

  _getURLParams(page = 1, query = {}){

    let query_url = `?page=${page}`;
    for(let key in query) {
      query_url += `&q[${key}]=${query[key]}`;
    }
    return query_url;
  }
  _authHeaders(){
    return JSON.parse(sessionStorage['auth']);
  }
  _getHeaders() {
    let common = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    // include auth headers
    let auth_headers = this._authHeaders();
    for(let key in auth_headers){
      common[key] = auth_headers[key];
    }

    // override or add headers
    for(let key in this._customHeaders){
      common[key] = this._customHeaders[key];
      if(common[key] == null)
        delete common[key];
    }

    return common;
  }
  _requireParams(...params){
    for(let param of params){
      if(this[param] == null){
        throw new Error(`Parameter ${param} is not defined within ResourcesService`);
      }
    }
  }
  _prepareToSend(obj, content_type, fob = null){
    this._requireParams('resource_name');
    switch(content_type){
      case "application/json": {
        let to_send = {};
        to_send[this.resource_name] = obj;
        return JSON.stringify(to_send);
      }
      case "multipart/form-data":
      case "application/x-www-form-urlencoded":
      default: {
        let fd = new FormData();
        append(fd, obj, fob, this.resource_name);

        return fd;
      }
    }
  }
}

export default ResourcesService
