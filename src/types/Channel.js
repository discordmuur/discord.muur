const storage = require('../storage');

const API = require('../ApiHandler');

class Channel {

  /*
  * GUILD_TEXT      0
  * DM              1
  * GUILD_VOICE     2
  * GROUP_DM        3
  * GUILD_CATEGORY  4
  */

  constructor(options, push) {
    Object.keys(options).forEach(key => {
      this[key] = options[key];
    });

    return this;
  }

  async send(content) {
    var response = await API.request('POST', {url: 'CREATE_MESSAGE', params: [this.id]}, true, {
      content: content
    });
    return response;
  }

  save(push = true) {
    var data = {
      id: this.id,
      type: this.type,
      guild_id: this.guild_id,
      position: this.position,
      permission_overwrites: this.permission_overwrites,
      name: this.name,
      topic: this.topic,
      nsfw: this.nsfw,
      last_message_id: this.last_message_id,
      bitrate: this.bitrate,
      user_limit: this.user_limit,
      rate_limit_per_user: this.rate_limit_per_user,
      recipients: this.recipients,
      icon: this.icon,
      owner_id: this.owner_id,
      application_id: this.application_id,
      parent_id: this.parent_id,
      last_pin_timestamp: this.last_pin_timestamp
    };
    storage.channels[data.id] = this;

    if (push) {
      API.request('PATCH', {url: 'MODIFY_CHANNEL', params: [data.id]}, true, data);
    }
    return this;
  }

}

module.exports = Channel;
