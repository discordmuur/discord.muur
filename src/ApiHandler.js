const fetch = require('node-fetch');
const endpoints = require('../endpoints');
const debug = require('./debugger');

class ApiHandler {

  async request(method, url, token = null, headers = {}, body = {}) {
    if (token) headers['Authorization'] = token;
    var options = {};
    options['method'] = method;
    if (headers !== {}) options['headers'] = headers;
    if (method != 'GET' && body !== {}) options['body'] = JSON.stringify(body);
    const response = await fetch(`${endpoints.BASE_URL() + endpoints[url]()}`, options);
    const json = await response.json();
    if (response.status == 401) return new Error('Invalid token.');
    return await json;
  }

}

module.exports = new ApiHandler();
