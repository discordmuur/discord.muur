const storage = require('../storage');
const ChannelSave = require('../saves/ChannelSave');

class Message {

  constructor(options, push) {
    Object.keys(options).forEach(key => {
      this[key] = options[key];
    });

    this.self = this.author.id === storage.client.id;

    this.channel = ChannelSave.get(options.channel_id, push);

    return this;
  }

}

module.exports = Message;
