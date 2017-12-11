function parseJSON(response) {
  return new Promise((resolve) => response.json()
    .then((json) => resolve({
      status: response.status,
      ok: response.ok,
      json,
    })));
}
export default function Request(url, options) {
  return new Promise((resolve, reject) => {
    fetch(endpoint  + url, options)
      .then(parseJSON)
      .then((response) => {
        if (response.ok) {
          return resolve(response.json);
        }
        // extract the error from the server's json
        return reject(response.json.meta.error);
      })
      .catch((error) => reject({
        networkError: error.message,
      }));
  });
}