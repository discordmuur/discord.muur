const storage = require('../storage');

const Channel = require('../types/Channel');

class ChannelSave {

    /*
    * This function gets triggered by default.
    */
    constructor() {
        /* To access the storage directly */
        this.channels = storage.channels;
    }

    /*
    * Find a channel
    * @param {String} id A Discord snowflake.
    */
    get(id) {
        return storage.channels[id];
    }

    /*
    * If we want to create a channel
    * This can be in our cache only, or also on Discord
    * @param {Object} options The data on the channels
    * @param {Boolean} push If we want to push a new Channel to Discord.
    */
    create(options, push = true) {
        var channel = new Channel(options, push);
        storage.channels[channel.id] = channel;
        return channel;
    }

}

module.exports = new ChannelSave();
