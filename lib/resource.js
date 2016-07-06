'use strict';
const BPromise = require('bluebird');

const Http = require('./http');
const config = require('./config');
const ErrorResponse = require('./errors/error_response');
const { omit } = require('./helpers');

class Resource {
  constructor(path) {
    this.http = new Http(config.namespace + path);
  }

  list(params) {
    const req = this.http.method('get').query(params);
    return this.__makeRequest(req);
  }

  __makeRequest(req) {
    return new BPromise(function (resolve, reject) {
      req.end(function (err, res) {
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

  create(params) {
    const req = this.http.method('post').send(params);
    return this.__makeRequest(req);
  }

  get(params) {
    const req = this.http.method('get').query(omit(params, 'id'));
    req.url += `/${params.id}`;
    return this.__makeRequest(req);
  }

  update(params) {
    const req = this.http.method('put').send(params);
    req.url += `/${params.id}`;
    return this.__makeRequest(req);
  }

  destroy(params) {
    const req = this.http.method('delete').send(omit(params, 'id'));
    req.url += `/${params.id}`;
    return this.__makeRequest(req);
  }
}

module.exports = Resource;
