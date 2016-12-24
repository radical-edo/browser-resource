'use strict';
const BPromise = require('bluebird');

const Http = require('./http');
const config = require('./config');
const ErrorResponse = require('./errors/error_response');
const { omit } = require('./helpers');

class Resource {
  constructor(path) {
    this.http = new Http(path);
  }

  upload(path, file, params = {}) {
    const req = this.http.upload(path).attach(file.name, file.file);
    Object.keys(params).forEach(function (key) {
      req.field(key, params[key]);
    });
    return this.__makeRequest(req);
  }

  action(name, params, method = 'post') {
    const req = this.http.method(method)
    if ('get' === method) {
      req.query(params);
    } else {
      req.send(params);
    }
    this.addPath(req, name);
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


  addPath(req, path) {
    if (path) {
      req.url += `/${path}`;
    }
  }

  list(params) {
    const req = this.http.method('get').query(params);
    return this.__makeRequest(req);
  }

  create(params) {
    const req = this.http.method('post').send(params);
    return this.__makeRequest(req);
  }

  get(params) {
    params = params || {};
    const req = this.http.method('get').query(omit(params, 'id'));
    this.addPath(req, params.id);
    req.url += `/${params.id}`;
    return this.__makeRequest(req);
  }

  insert(params) {
    params = params || {};
    const req = this.http.method('put').send(params);
    this.addPath(req, params.id);
    return this.__makeRequest(req);
  }

  update(params) {
    params = params || {};
    const req = this.http.method('patch').send(omit(params, 'id'));
    this.addPath(req, params.id);
    return this.__makeRequest(req);
  }

  destroy(params) {
    params = params || {};
    const req = this.http.method('delete').send(omit(params, 'id'));
    this.addPath(req, params.id);
    return this.__makeRequest(req);
  }
}

module.exports = Resource;
