'use strict';
const BPromise = require('bluebird');

const config = require('./config');
const ErrorResponse = require('./errors/error_response');


class Resource {
  constructor(path) {
    this.http = new Http(config.namespace + path);
  }

  list(params) {
    const req = this.http.method('get').query(params);
    return BPromise(function (resolve, reject) {
      req.send(function (err, res) {
        if (err) {
          reject(new ErrorResponse(err));
        } else {
          resolve(res);
        }
      });
    }).catch(function (err) {
      throw err;
    });
  }
}

module.exports = Resource;
