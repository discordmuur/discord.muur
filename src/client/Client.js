const WebSocket = require('../WebSocket');
const BaseClient = require("./BaseClient");
const ChannelStore = require('../stores/Channel');

/**
 * The main hub for interacting with the Discord API, and the starting point for any bot.
 * @extends {BaseClient}
 */
class Client extends BaseClient {
  /**
   * @param {ClientOptions} [options] Options for the client
   */
  constructor(options = {}) {
    super(Object.assign({ _tokenType: 'Bot' }, options));

    this.channels = Channel(this);
  }
  /**
   * This endpoint is used to log the client into the gateway of discord
   * @param {String} token is the Bot Token
   * @param {Boolean} debug, states if the package will log debug messages to console. defaults to false
   */
  login(token, debug = false) {
    WebSocket.login(token);
  }

}

module.exports = Client;
