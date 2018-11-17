const storage = require('../storage');

const Message = require('../types/Message');

class MessageSave {

    /**
    * This function gets triggered by default.
    */
    constructor() {
        /** To access the storage directly */
        this.messages = storage.messages;
    }

    /**
    * Find a Message
    * @param {String} id A Discord snowflake
    */
    get(id) {
        return storage.messages[id];
    }
    /**
     * If we want to create a message
     * This can be in our cache only, or also on Discord
     * @param {Object} options The data on the message
     * @param {Boolean} push If we want to push a new Message to Discord.
    */
    create(options, push = true) {
        var message = new Message(options, push);
        storage.messages[message.id] = message;
        return message;
    }

}

module.exports = new MessageSave();
