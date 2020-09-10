class Client {
  constructor(dsClient) {
    this.dsClient = dsClient;
  }

  incrID(idName) {
    return new Promise((resolve) => {
      this.dsClient.incr(idName, (err, incrementedID) => {
        resolve(incrementedID);
      });
    });
  }

  getValue(key) {
    return new Promise((resolve) => {
      this.dsClient.GET(key, (err, result) => resolve(result));
    });
  }

  setValue(key, value) {
    return new Promise((resolve) => {
      this.dsClient.SET(key, value, resolve);
    });
  }
}

module.exports = { Client };
