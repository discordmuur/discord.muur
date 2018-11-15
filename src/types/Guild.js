const storage = require('../storage');

class Guild {

  constructor(data) {
    this.d = data;
  }

  save() {
    storage.guilds[this.d.id] = this;
  }

}

module.exports = Guild;
