const storage = require('../storage');

class Client {

  constructor(data) {
    this.user = data;
  }

  save() {
    storage.client = this;
  }

}

module.exports = Client;
