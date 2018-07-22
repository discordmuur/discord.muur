const WebSockets = require('ws');
const API = require('./ApiHandler');
const debug = require('./debugger');
const OPCodes = require('../opcodes');


class WebSocket {

  /**
  * Connecting to the discord gateway
  * We connect and send the Opcode 2 Identify
  * Discord will use this to identify your application
  * @param {String} token, this is the bot token
  */
  async login(token) {

    var parent = this;
    var session_id = null;

    /*
    * We make a API request to discordapp
    * this will return the gateway url
    * by doing this we can be sure our gateway url is always up-to-date
    * Then we make a websocket connection to the gateway using that URL
    * We save this websocket connection in a variable as item of the WebSocket class
    */
    debug.emit(`[WS] Connecting to ${await API.get_gateway(token) + '/?v=6&encoding=json'}`);
    this.ws = await new WebSockets(`${await API.get_gateway(token) + '/?v=6&encoding=json'}`);

    /*
    * We are logging to our debugger if the socket connection is
    * established
    */
    this.ws.on('open', async function open() {
      debug.emit('[WS] Connected to Discord Gateway');
      setTimeout(function(gateway) {
      const d = Object.assign({
        token: token,
        properties: {
          $os: 'windows',
          $browser: 'disco',
          $device: 'disco'
        }
      });
      gateway.send(JSON.stringify({ op: OPCodes.IDENTIFY, d }));
      debug.emit('[WS] [IDENTIFY] ->');
    }, 500, this)
    });

    this.ws.on('message', function incoming(data) {
      if (JSON.parse(data).op == 10) {
        debug.emit('[WS] [HELLO] Heartbeating @ ' + JSON.parse(data).d.heartbeat_interval + 'ms rate');

        /**
        * This will send a heartbeat to the discord Gateway
        * so they can make sure that the bot is running
        * the interval is specified by discord in the HELLO event.
        * -
        * We also specify when the last heartbeat and the last heartbeat ack was.
        * This is to check if we receive an heartbeat ack between every heartbeat
        * If we dont receive the heartbeat ack we should reconnect
        */

        this.last_heartbeat_ack = null;
        this.last_heartbeat = null;
        var date = new Date();
        setInterval(function(gateway) {
          /*
          * This is to check if we received a heartback ack between every heartbeat.
          * if not, we need to reconnect
          */
          if ((gateway.last_heartbeat && !gateway.last_heartbeat_ack) || (gateway.last_heartbeat_ack < gateway.last_heartbeat)) {
            debug.emit('[WS] [ERROR] Did not receive heartbeat ACK between heartbeats. reconnecting');
            // this is where we should code our reconnect
            return;
          }

          gateway.send(JSON.stringify({ op: OPCodes.HEARTBEAT }));
          debug.emit('[WS] [HEARTBEAT] ->');
          gateway.last_heartbeat = date.getTime();
        }, JSON.parse(data).d.heartbeat_interval, this);


      }
      if (JSON.parse(data).op == 1) {
        debug.emit('[WS] [HEARTBEART] <-');

        /*
        * Sometimes discordapp asks us to send a heartbeat for them to make sure
        * the bot is still running, in that case we use the forceHeartbeat function.
        */
        debug.emit('[WS] [HEARTBEAT] ->');
        this.send(JSON.stringify({ op: OPCodes.HEARTBEAT }));
      }
      if (JSON.parse(data).op == 7) {
        debug.emit('[WS] [RECONNECT] <-');

      }
      if (JSON.parse(data).op == 9) debug.emit('[WS] [INVALID SESSION] <-');
      if (JSON.parse(data).op == 11) {
        /*
        * We are also registering the latest heartbeat ACK
        * to make sure we get a heartbeat ack between every heartbeat
        * if not, we should reconnect to the gateway
        */
        var date = new Date();
        debug.emit('[WS] [HEARTBEAT ACK] <-');
        this.last_heartbeat_ack = date.getTime();
      }
      if (JSON.parse(data).op == 0) {
        debug.emit('[WS] [DISPATCH] <-');
        if (JSON.parse(data).t == "READY") {
          session_id = JSON.parse(data).d.session_id
          debug.emit('[WS] [READY] <-');
        }
      }
    });

  }

}

module.exports = new WebSocket();
