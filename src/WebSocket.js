const WebSockets = require('ws');
const API = require('./ApiHandler');
const debug = require('./debugger');
const opcodes = require('../opcodes');

/* Our Types */
const Guild = require('./types/Guild');
const Message = require('./types/Message');
const Channel = require('./types/Channel');

/* Our Saves */
const ChannelSave = require('./saves/ChannelSave');

const types = require('../types');

const storage = require('./storage');

var main_this;

class WebSocket {

  constructor(client_instance) {
    this.client = client_instance;
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

          main_this.client.id = data['d']['user']['id'];
          main_this.client.username = data['d']['user']['username'];
          main_this.client.discriminator = data['d']['user']['discriminator'];
          main_this.client.avatar = data['d']['user']['avatar'];
          main_this.client.bot = data['d']['user']['avatar'];
          main_this.client.save(false);

          main_this.client.events.emit('ready');
        break;
      case 'CHANNEL_CREATE':
          debug.emit('[WebSocket] CHANNEL_CREATE <-');
        break;
      case 'CHANNEL_UPDATE':
          debug.emit('[WebSocket] CHANNEL_UPDATE <-');

        break;
      case 'CHANNEL_DELETE':
          debug.emit('[WebSocket] CHANNEL_DELETE <-');

        break;
      case 'CHANNEL_PINS_UPDATE':
          debug.emit('[WebSocket] CHANNEL_PINS_UPDATE <-');

        break;
      case 'GUILD_CREATE':
          debug.emit('[WebSocket] GUILD_CREATE <-');
          var guild = new Guild();
          Object.keys(data['d']).forEach(function(key) {
            guild[key] = data['d'][key]
          });
          guild.save();

          guild.channels.forEach(function(chnl) {           
            ChannelSave.create({
              id: chnl.id,
              type: chnl.type,
              topic: chnl.topic,
              rate_limit_per_user: chnl.rate_limit_per_user,
              position: chnl.position,
              permission_overwrites: chnl.permission_overwrites,
              parent_id: chnl.parent_id,
              nsfw: chnl.nsfw,
              name: chnl.name,
              last_pin_timestamp: chnl.last_pin_timestamp,
              last_message_id: chnl.last_message_id
            }, false);
          });
        break;
      case 'GUILD_UPDATE':
          debug.emit('[WebSocket] GUILD_UPDATE <-');

        break;
      case 'GUILD_DELETE':
          debug.emit('[WebSocket] GUILD_DELETE <-');

        break;
      case 'GUILD_BAN_ADD':
          debug.emit('[WebSocket] GUILD_BAN_ADD <-');

        break;
      case 'GUILD_BAN_REMOVE':
          debug.emit('[WebSocket] GUILD_BAN_REMOVE <-');

        break;
      case 'GUILD_EMOJIS_UPDATE':
          debug.emit('[WebSocket] GUILD_EMOJIS_UPDATE <-');

        break;
      case 'GUILD_INTEGRATIONS_UPDATE':
          debug.emit('[WebSocket] GUILD_INTEGRATIONS_UPDATE <-');

        break;
      case 'GUILD_MEMBER_ADD':
          debug.emit('[WebSocket] GUILD_MEMBER_ADD <-');

        break;
      case 'GUILD_MEMBER_REMOVE':
          debug.emit('[WebSocket] GUILD_MEMBER_REMOVE <-');

        break;
      case 'GUILD_MEMBER_CHUNK':
          debug.emit('[WebSocket] GUILD_MEMBER_CHUNK <-');

        break;
      case 'GUILD_ROLE_CREATE':
          debug.emit('[WebSocket] GUILD_ROLE_CREATE <-');

        break;
      case 'GUILD_ROLE_UPDATE':
          debug.emit('[WebSocket] GUILD_ROLE_UPDATE <-');

        break;
      case 'GUILD_ROLE_DELETE':
          debug.emit('[WebSocket] GUILD_ROLE_DELETE <-');

        break;
      case 'MESSAGE_CREATE':
          debug.emit('[WebSocket] MESSAGE_CREATE <-');
          var message = new Message();
          Object.keys(data['d']).forEach(function(key) {
            message[key] = data['d'][key]
          });
          message.save(false);
          main_this.client.events.emit('message', message);
        break;
      case 'MESSAGE_UPDATE':
          debug.emit('[WebSocket] MESSAGE_UPDATE <-');

        break;
      case 'MESSAGE_DELETE':
          debug.emit('[WebSocket] MESSAGE_DELETE <-');

        break;
      case 'MESSAGE_DELETE_BULK':
          debug.emit('[WebSocket] MESSAGE_DELETE_BULK <-');

        break;
      case 'MESSAGE_REACTION_ADD':
          debug.emit('[WebSocket] MESSAGE_REACTION_ADD <-');

        break;
      case 'MESSAGE_REACTION_REMOVE':
          debug.emit('[WebSocket] MESSAGE_REACTION_REMOVE <-');

        break;
      case 'MESSAGE_REACTION_REMOVE_ALL':
          debug.emit('[WebSocket] MESSAGE_REACTION_REMOVE_ALL <-');

        break;
      case 'PRESENCE_UPDATE':
          debug.emit('[WebSocket] PRESENCE_UPDATE <-');

        break;
      case 'TYPING_START':
          debug.emit('[WebSocket] TYPING_START <-');

        break;
      case 'USER_UPDATE':
          debug.emit('[WebSocket] USER_UPDATE <-');

        break;
      case 'VOICE_STATE_UPDATE':
          debug.emit('[WebSocket] VOICE_STATE_UPDATE <-');

        break;
      case 'VOICE_SERVER_UPDATE':
          debug.emit('[WebSocket] VOICE_SERVER_UPDATE <-');

        break;
      case 'WEBHOOKS_UPDATE':
          debug.emit('[WebSocket] WEBHOOKS_UPDATE <-');

        break;
      default:

    }
  }

}

module.exports = WebSocket;
