'use strict';
const request = require('superagent');
const config = require('./config');

class Http {
  constructor(path) {
    this.path = path;
  }

  method(type) {
    const req = request[type](this.path).type('json').accept('json');
    config.headers.forEach(function (header) {
      req.set(...header);
    });
    return req;
  }
}

module.exports = Http;
