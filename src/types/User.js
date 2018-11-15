const storage = require('../storage');
class User {


  save(push = true) {
    storage.users[this.id] = {
      id: this.id,
      username: this.username,
      discriminator: this.discriminator,
      tag: `${this.username}#${this.discriminator}`,
      avatar: this.avatar,
      bot: this.bot
    }
  }

}

module.exports = User;