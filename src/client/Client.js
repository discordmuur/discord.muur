const WebSocket = require('../WebSocket')

class Client {

  /*
  * This endpoint is used to log the client into the gateway of discord
  * @param token is the Bot Token
  * @param debug, states if the package will log debug messages to console. defaults to false
  */
  login(token, debug = false) {
    WebSocket.login(token);
  }

}

module.exports = new Client();
