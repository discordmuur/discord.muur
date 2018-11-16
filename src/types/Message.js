const storage = require('../storage');
const ChannelSave = require('../saves/ChannelSave');
const GuildSave = require('../saves/GuildSave');

const UserSave = require('../saves/UserSave');

class Message {

  constructor(options, push) {
    Object.keys(options).forEach(key => {
      this[key] = options[key];
    });

    this.self = this.author.id === storage.client.id;

    if (!UserSave.get(this.author.id)) {
      this.author = UserSave.create(this.author);
    } else {
      this.author = UserSave.get(this.author.id);
    }

    this.channel = ChannelSave.get(options.channel_id, push);

    this.guild = GuildSave.get(options.guild_id, push);

    return this;
  }

}

module.exports = Message;
