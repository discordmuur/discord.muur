const storage = require('../storage');
class User {


  constructor(options) {
    Object.keys(options).forEach(key => {
      this[key] = options[key];
    });

    return this;
  }

}

module.exports = User;
