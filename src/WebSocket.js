const WebSockets = require('ws');
const API = require('./ApiHandler');
const debug = require('./debugger');
const OPCodes = require('../opcodes');

class WebSocket {

  /*
  * Connecting to the discord gateway
  * We connect and send the Opcode 2 Identify
  * Discord will use this to identify your application
  * @param token, this is the bot token
  */
  async login(token) {
    /*
    * We make a API request to discordapp
    * this will return the gateway url
    * by doing this we can be sure our gateway url is always up-to-date
    * Then we make a websocket connection to the gateway using that URL
    * We save this websocket connection in a variable as item of the WebSocket class
    */
    this.ws = new WebSockets(API.get_gateway(token));

    /*
    * We are logging to our debugger if the socket connection is
    * established
    */
    this.ws.on('open', async function open() {
      debug.emit('[WS] Connected to Discord Gateway');

      const d = Object.assign({token: token});

      var response = await this.ws.send({ op: OPCodes.IDENTIFY, d });

      debug.emit(response)
    });


  }


}

module.exports = new WebSocket();
