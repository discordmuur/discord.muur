const storage = require('../storage');
class User {


  constructor(options) {
    Object.keys(options).forEach(key => {
      this[key] = options[key];
    });

    this.tag = this.username + '#' + this.discriminator;
    this.mention = '<@' + this.id + '>';
  }

}

module.exports = User;
