const storage = require('../storage');

const Channel = require('../types/Channel');

class ChannelSave {

    constructor() {
        this.channels = storage.channels;
    }

    get(id) {
        return storage.channels[id];
    }

    create(options, push = true) {
        var channel = new Channel(options, push);
        storage.channels[channel.id] = channel;
        return channel;
    }

}

module.exports = new ChannelSave();
