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
    var response = await API.request('POST', {url: 'CREATE_MESSAGE', params: [this.id]}, 'Bot ' + storage.token, {
      content: content
    });
    return response;
  }

}

module.exports = Channel;
