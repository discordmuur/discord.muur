const WebSocket = require('../WebSocket');

const { EventEmitter } = require('events')

/**
 * The main interaction for the bot, this is THE bot.
 */
class Client {
  /**
   * The constructor, here we will set most of the default settings for the client.
   */
  constructor(options = {}) {
    /**
     * 
     */
    this.events = new EventEmitter();
    /**
     * 
     */
    this.token = null;
  }

  /**
   * This endpoint is used to log the client into the gateway of discord
   * @param {String} token This is the token of your bot
   * @param {Boolean} debug This states if the package will log debug messages to console. defaults to false
   */
  login(token, debug = false) {
    this.token = token;
    WebSocket.connect(token);

    /*
    * Here we will define all properties of the client.
    */

  }

}

module.exports = Client;
