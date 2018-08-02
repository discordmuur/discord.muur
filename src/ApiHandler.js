const fetch = require('node-fetch');
const endpoints = require('../endpoints');
const debug = require('./debugger');

class ApiHandler {

  async get_gateway(token) {
    const response = await fetch(`${endpoints.BASE_URL() + endpoints.GET_GATEWAY_BOT()}`, {
      method: 'GET',
      headers: {
        Authorization: token
      }
    })
    const json = await response.json();
    if (response.status == 401) return console.error('Invalid token. You can get a valid token from https://discordapp.com/developers/applications/');
    return await json.url;
  }

  async get_guilds(token) {
    const response = await fetch(`${endpoints.BASE_URL() + endpoints.GET_CURRENT_USER_GUILDS()}`, {
      method: 'GET',
      headers: {
        Authorization: "Bot " + token
      }
    })
    const json = await response.json();
    if (response.status == 401) return console.error('Invalid token. You can get a valid token from https://discordapp.com/developers/applications/');
    return await json;
  }

}

module.exports = new ApiHandler();
