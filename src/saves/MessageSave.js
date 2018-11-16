const storage = require('../storage');

const Message = require('../types/Message');

class MessageSave {

    constructor() {
        this.messages = storage.messages;
    }

    get(id) {
        return storage.messages[id];
    }

    create(options, push = true) {
        var message = new Message(options, push);
        storage.messages[message.id] = message;
        return message;
    }

}

module.exports = new MessageSave();
