const storage = require('../storage');

const Guild = require('../types/Guild');

class GuildSave {

    constructor() {
        this.guilds = storage.guilds;
    }

    get(id) {
        return storage.guilds[id];
    }

    create(options, push = true) {
        var guild = new Guild(options, push);
        storage.guilds[guild.id] = guild;
        return guild;
    }

}

module.exports = new GuildSave();
