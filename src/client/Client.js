const WebSocket = require('../WebSocket');

const { EventEmitter } = require('events')

const storage = require('../storage');

/* Saves */
const ChannelSave = require('../saves/ChannelSave');

/**
 * The main interaction for the bot, this is THE bot.
 */
class Client {
  /**
   * The constructor, here we will set most of the default settings for the client.
   */
  constructor(options = {}) {
    /**
     * Here we will make a events attribute, we will emit events through this.
     * Accessable for client as "client.events"
     */
    this.events = new EventEmitter();

    this.ws = new WebSocket(this);
    /**
     * Here we set a default for the token.
     * @type {string}
     */
    this.token = null;

    /* Creating our saves */
    this.channels = ChannelSave;
  }


  /*
  * Used to save the changes that have been made to the client.
  * @param {Boolean} push Do we want to push these changes to Discord's API?
  */
  save(push = true) {
    var data = {
      id: this.id,
      username: this.username,
      discriminator: this.discriminator,
      avatar: this.avatar,
      bot: this.bot
    }
    storage.client = data;
  }

  /**
   * This endpoint is used to log the client into the gateway of discord
   * @param {String} token This is the token of your bot
   * @param {Boolean} debug This states if the package will log debug messages to console. defaults to false
   */
  login(token, debug = false) {
    storage.debug = debug;
    this.token = token;
    storage.token = token;
    this.ws.connect(token, this);

    /*
    * Here we will define all properties of the client.
    */

  }

}

module.exports = Client;
