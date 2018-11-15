const storage = require('../storage');

class Guild {

  constructor(data) {
    this.guild = data;
  }

  save() {
    storage.guilds[this.guild.id] = this;
  }

}

module.exports = Guild;
