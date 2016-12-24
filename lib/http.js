'use strict';
const request = require('superagent');
const config = require('./config');

class Http {
  constructor(path) {
    this.path = path;
  }

  upload(action) {
    return request.post(this.path + `/${path}`);
  }

  method(type) {
    const req = request[type](config.namespace + this.path).type('json').accept('json');
    config.headers.forEach(function (header) {
      req.set(...header);
    });
    return req;
  }
}

module.exports = Http;
