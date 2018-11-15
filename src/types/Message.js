const storage = require('../storage');

class Message {

  constructor(options, push) {
    Object.keys(options).forEach(key => {
      this[key] = options[key];
    });

    return this;
  }

}

module.exports = Message;
