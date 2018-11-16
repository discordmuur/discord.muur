const fetch = require('node-fetch');
const endpoints = require('../endpoints');
const debug = require('./debugger');
const storage = require('./storage');

class ApiHandler {

  async request(method, url, auth = false, body = {}, headers = {}) {
    var url_endpoint;
    if (typeof(url) === 'object') {
      url_endpoint = endpoints[url.url](url.params.join(', '));
    } else {
      url_endpoint = endpoints[url]();
    }
    if (auth) headers['Authorization'] = 'Bot ' + storage.token;
    var options = {};
    options['method'] = method;
    if (method != 'GET' && body !== {}) {
      options['body'] = JSON.stringify(body);
      headers['Content-Type'] = 'application/json';
    }
    if (headers !== {}) options['headers'] = headers;

    const response = await fetch(`${endpoints.BASE_URL() + url_endpoint}`, options);
    const json = await response.json();
    if (response.status == 401) return new Error('Invalid token.');
    return await json;
  }

}

module.exports = new ApiHandler();
