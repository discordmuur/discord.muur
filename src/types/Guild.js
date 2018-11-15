const storage = require('../storage');
const User = require("./User");

class Guild {

  constructor(options, push) {
    Object.keys(options).forEach(key => {
      this[key] = options[key];
    });

    return this;
  }

}

module.exports = Guild;
