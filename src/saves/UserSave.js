const storage = require('../storage');

const User = require('../types/User');

class UserSave {

    /**
    * This function gets triggered by default.
    */
    constructor() {
        /* To access the storage directly */
        this.users = storage.users;
    }

    /**
    * Find a User
    * @param {String} id A Discord snowflake
    */
    get(id) {
        return storage.users[id];
    }

    /**
    * If we want to create a user in our cache
    * @param {Object} options The data on the user
    */
    create(options) {
        var user = new User(options);
        storage.users[user.id] = user;
        return user;
    }

}

module.exports = new UserSave();
