const fetch = require('node-fetch');
const endpoints = require('../endpoints');
const debug = require('./debugger');
const storage = require('./storage');

class ApiHandler {

  /**
  * The main function to make an API call to Discord's API.
  * @param {String} method the HTTP method (GET, POST, PUT, PATCH, DELETE)
  * @param {String} url the url string code, defined in endpoints.js
  * @param {Boolean} auth if we include the token in the request
  * @param {Object} body The body of the request
  * @param {Object} headers The headers of the request
  */
  async request(method, url, auth = false, body = {}, headers = {}) {
    /* Here we are defining the URL with the possible parameters */
    var url_endpoint;
    if (typeof(url) === 'object') {
      url_endpoint = endpoints[url.url](url.params.join(', '));
    } else {
      url_endpoint = endpoints[url]();
    }
    /* Add the token to the Authorization header */
    if (auth) headers['Authorization'] = 'Bot ' + storage.token;
    /* create the options object that node-fetch requires */
    var options = {};
    options['method'] = method;
    if (method != 'GET' && body !== {}) {
      options['body'] = JSON.stringify(body);
      headers['Content-Type'] = 'application/json';
    }
    if (headers !== {}) options['headers'] = headers;

    /* Make the actual request */
    const response = await fetch(`${endpoints.BASE_URL() + url_endpoint}`, options);
    const json = await response.json();
    if (response.status == 401) return new Error('Invalid token.');
    return await json;
  }

}

module.exports = new ApiHandler();
