import {Constants} from '../../constants';
const baseUrl = `${Constants.SERVER_URL}/${Constants.API_URL}/users/profile.json`
function parseJSON(response) {
  return new Promise((resolve) => response.json()
    .then((json) => resolve({
      status: response.status,
      ok: response.ok,
      json,
    })));
}
class Profile {
  static getUser(token) {
    return new Promise((resolve, reject) => {
      fetch(baseUrl, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({token: token})
      })
      .then(parseJSON)
      .then((response) => {
        if (response.ok) {
          return resolve(response.json);
        } else {
          return reject(response.json.error);
        }
      })
      .catch((error) => reject({
        networkError: error.message,
      }));
    });
  }
}
export default Profile;