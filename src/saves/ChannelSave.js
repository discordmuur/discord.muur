const Saver = require("./Saver");
const API = require('../ApiHandler');

/**
* Saves channels in the cache.
* @extends Saver
*/
class ChannelSave extends Saver {

  constructor(client) {
    super(client);
    var channels = [];
    API.get_all_channels(client.token)
  }


}

module.exports = ChannelSave;
