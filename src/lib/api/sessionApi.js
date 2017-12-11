import {Constants} from '../../constants';
const baseUrl = `${Constants.SERVER_URL}/${Constants.API_URL}/login`
function parseJSON(response) {
  return new Promise((resolve) => response.json()
    .then((json) => resolve({
      status: response.status,
      ok: response.ok,
      json,
    })));
}
class SessionApi {
  static login(credentials) {
    return new Promise((resolve, reject) => {
      fetch(baseUrl, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({auth: credentials})
      })
      .then(parseJSON)
      .then((response) => {
        if (response.ok) {
          return resolve(response.json);
        } else {
          return reject(response.json.error);
        }
      })
      .catch((error) => reject("Falha na comunicação com o servidor: você está conectado à Internet?"));
    });
  }
}
export default SessionApi;