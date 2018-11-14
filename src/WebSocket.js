const WebSockets = require('ws');
const API = require('./ApiHandler');
const debug = require('./debugger');
const opcodes = require('../opcodes');

var main_this;

class WebSocket {

  constructor() {
    main_this = this;
    this.sequence_number = null;
  }

  async get_gateway(token) {
    var response = await API.request('GET', 'GET_GATEWAY_BOT', token);
    return response['url'];
  }

  async connect(token) {
    var gateway_url = await this.get_gateway(token);

    debug.emit('[WebSocket] Connecting to ' + gateway_url + '?v=6&encoding=json');
    const ws = new WebSockets(gateway_url + '?v=6&encoding=json', {
      perMessageDeflate: false
    });

    this.ws = ws;
    this.token = token;

    ws.on('open', this.ws_open);
    ws.on('message', this.ws_message);
  }

  ws_open() {
    debug.emit('[WebSocket] Connection established.');
  }

  ws_message(data) {
    var json = JSON.parse(data);

    switch (json.op) {
      case opcodes.DISPATCH:
          debug.emit('[WebSocket] DISPATCH <-');
          main_this.handle_dispatch(json);
        break;
      case opcodes.HEARTBEAT:
          debug.emit('[WebSocket] HEARTBEAT <-');
        break;
      case opcodes.RECONNECT:
          debug.emit('[WebSocket] RECONNECT <-');
        break;
      case opcodes.INVALID_SESSION:
          debug.emit('[WebSocket] INVALID_SESSION <-');
        break;
      case opcodes.HELLO:
          debug.emit('[WebSocket] HELLO <-');
          main_this.identify();
          main_this.start_heartbeating(json['d']['heartbeat_interval']);
        break;
      case opcodes.HEARTBEAT_ACK:
          debug.emit('[WebSocket] HEARTBEAT_ACK <-');
        break;
    }
  }

  identify() {
    debug.emit('[WebSocket] IDENTIFY ->');
    var data = {
      op: opcodes.IDENTIFY,
      d: {
          token: "Bot " + this.token,
          properties: {
            $os: 'windows',
            $browser: 'disco',
            $device: 'disco'
          }
        }
    }
    this.ws.send(JSON.stringify(data));
  }

  start_heartbeating(interval) {
    this.send_heartbeat();
    setInterval(this.send_heartbeat, interval - 1000);
  }

  send_heartbeat() {
    debug.emit('[WebSocket] HEARTBEAT ->');
    var data = {
      op: opcodes.HEARTBEAT,
      d: this.sequence_number
    };
    main_this.ws.send(JSON.stringify(data));
  }

  handle_dispatch(data) {
    switch (data.t) {
      case 'READY':

        break;
      default:

    }
  }

  dispatch_ready(data) {

  }

}

module.exports = new WebSocket();
