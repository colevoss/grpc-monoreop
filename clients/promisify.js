function promisify(client) {
  const prototype = Object.getPrototypeOf(client);

  const newClient = {};
  for (const fnName in prototype) {
    newClient[fnName] = (params) => {
      return new Promise((resolve, reject) => {
        client[fnName](params, (err, data) => {
          if (err) {
            reject(err);
            return;
          }

          resolve(data);
        });
      });
    };
  }

  newClient._client = client;

  return newClient;
}

module.exports = promisify;
