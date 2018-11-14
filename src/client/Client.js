const WebSocket = require('../WebSocket');

var events = require('events');
var eventEmitter = new events.EventEmitter();

/**
 * The main interaction for the bot, this is THE bot.
 */
class Client {
  /**
   * The constructor, here we will set most of the default settings for the client.
   */
  constructor(options = {}) {
    this.events = eventEmitter;
  }

  /**
   * This endpoint is used to log the client into the gateway of discord
   * @param {String} token is the Bot Token
   * @param {Boolean} debug, states if the package will log debug messages to console. defaults to false
   */
  login(token, debug = false) {
    this.token = token;
    WebSocket.connect(token);

    /*
    * Here we will define all properties on the client.
    */

  }

}

module.exports = Client;
