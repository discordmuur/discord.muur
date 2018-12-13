const storage = require('../storage');

const Guild = require('../types/Guild');

class GuildSave {

    /**
    * This function gets triggered by default.
    */
    constructor() {
         /* To access the storage directly */
        this.guilds = storage.guilds;
    }

    /**
    * Find a Guild
    * @param {String} id A Discord snowflake
    */
    get(id) {
        return storage.guilds[id];
    }

    /**
    * If we want to create a guild
    * This can be in our cache only, or also on Discord
    * @param {Object} options The data on the guild
    * @param {Boolean} push If we want to push a new Guild to Discord.
    */
    create(options, push = true) {
        var guild = new Guild(options, push);
        storage.guilds[guild.id] = guild;
        return guild;
    }

}

module.exports = new GuildSave();
