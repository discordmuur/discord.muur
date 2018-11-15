const WebSockets = require('ws');
const API = require('./ApiHandler');
const debug = require('./debugger');
const opcodes = require('../opcodes');
const ClientSave = require('./types/Client');
const GuildSave = require('./types/Guild');
const types = require('../types');

const storage = require('./storage');

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
    debug.emit('[WebSocket] Start heartbeating @ ' + interval + 'ms rate.');
    this.send_heartbeat();
    setInterval(this.send_heartbeat, interval);
  }

  send_heartbeat() {
    debug.emit('[WebSocket] HEARTBEAT ->');
    var data = {
      op: opcodes.HEARTBEAT,
      d: main_this.sequence_number
    };
    main_this.ws.send(JSON.stringify(data));
  }

  handle_dispatch(data) {
    main_this.sequence_number = data.s;
      switch (data.t) {
      case 'READY':
          debug.emit('[WebSocket] READY <-');
          var client = new ClientSave(data['d']['user']);
          client.save();
        break;
      case 'CHANNEL_CREATE':

        break;
      case 'CHANNEL_UPDATE':

        break;
      case 'CHANNEL_DELETE':

        break;
      case 'CHANNEL_PINS_UPDATE':

        break;
      case 'GUILD_CREATE':
          debug.emit('[WebSocket] GUILD_CREATE <-');
          var guild = new GuildSave(data['d']);
          guild.save();
        break;
      case 'GUILD_UPDATE':

        break;
      case 'GUILD_DELETE':

        break;
      case 'GUILD_BAN_ADD':

        break;
      case 'GUILD_BAN_REMOVE':

        break;
      case 'GUILD_EMOJIS_UPDATE':

        break;
      case 'GUILD_INTEGRATIONS_UPDATE':

        break;
      case 'GUILD_MEMBER_ADD':

        break;
      case 'GUILD_MEMBER_REMOVE':

        break;
      case 'GUILD_MEMBER_CHUNK':

        break;
      case 'GUILD_ROLE_CREATE':

        break;
      case 'GUILD_ROLE_UPDATE':

        break;
      case 'GUILD_ROLE_DELETE':

        break;
      case 'MESSAGE_CREATE':

        break;
      case 'MESSAGE_UPDATE':

        break;
      case 'MESSAGE_DELETE':

        break;
      case 'MESSAGE_DELETE_BULK':

        break;
      case 'MESSAGE_REACTION_ADD':

        break;
      case 'MESSAGE_REACTION_REMOVE':

        break;
      case 'MESSAGE_REACTION_REMOVE_ALL':

        break;
      case 'PRESENCE_UPDATE':

        break;
      case 'TYPING_START':

        break;
      case 'USER_UPDATE':

        break;
      case 'VOICE_STATE_UPDATE':

        break;
      case 'VOICE_SERVER_UPDATE':

        break;
      case 'WEBHOOKS_UPDATE':

        break;
      default:

    }
  }

  dispatch_ready(data) {

  }

}

module.exports = new WebSocket();
