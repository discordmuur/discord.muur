const storage = require('../storage');

const User = require('../types/User');

class UserSave {

    constructor() {
        this.users = storage.users;
    }

    get(id) {
        return storage.users[id];
    }

    create(options) {
        var user = new User(options);
        storage.users[user.id] = user;
        return user;
    }

}

module.exports = new UserSave();
