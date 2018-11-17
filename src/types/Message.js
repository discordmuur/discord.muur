const storage = require('../storage');
const ChannelSave = require('../saves/ChannelSave');
const GuildSave = require('../saves/GuildSave');

const UserSave = require('../saves/UserSave');

const API = require('../ApiHandler');

class Message {

  /**
  * This function gets triggered by default
  * when creating the Message instance.
  * @param {Object} options the options on the message.
  * @param {Boolean} push If we will push this message to Discord
  */
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

    if (push) {
      API.request('POST', 'CREATE_MESSAGE', true, options);
    }
  }

  /**
  * Save the changes that we made to the Discord Message
  * @param {Boolean} push If we want to push these changes to Discord.
  */
  save(push = true) {
    var data = {
      attachments: this.attachments,
      tts: this.tts,
      embeds: this.embeds,
      timestamp: this.timestamp,
      mention_everyone: this.mention_everyone,
      id: this.id,
      pinned: this.pinned,
      edited_timestamp: this.edited_timestamp,
      author: this.author,
      mention_roles: this.mention_roles,
      content: this.content,
      channel_id: this.channel_id,
      mentions: this.mentions,
      type: this.type
    };
    storage.messages[data.id] = this;

    if (push) {
      API.request('PATCH', {url: 'EDIT_MESSAGE', params: [data.id]}, true, data);
    }
    return this;
  }

}

module.exports = Message;
