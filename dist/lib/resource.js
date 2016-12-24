'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BPromise = require('bluebird');

var Http = require('./http');
var config = require('./config');
var ErrorResponse = require('./errors/error_response');

var _require = require('./helpers'),
    omit = _require.omit;

var Resource = function () {
  function Resource(path) {
    _classCallCheck(this, Resource);

    this.http = new Http(path);
  }

  _createClass(Resource, [{
    key: 'upload',
    value: function upload(path, file) {
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var req = this.http.upload(path).attach(file.name, file.file);
      Object.keys(params).forEach(function (key) {
        req.field(key, params[key]);
      });
      return this.__makeRequest(req);
    }
  }, {
    key: 'action',
    value: function action(name, params) {
      var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'post';

      var req = this.http.method(method);
      if ('get' === method) {
        req.query(params);
      } else {
        req.send(params);
      }
      this.addPath(req, name);
      return this.__makeRequest(req);
    }
  }, {
    key: '__makeRequest',
    value: function __makeRequest(req) {
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
  }, {
    key: 'addPath',
    value: function addPath(req, path) {
      if (path) {
        req.url += '/' + path;
      }
    }
  }, {
    key: 'list',
    value: function list(params) {
      var req = this.http.method('get').query(params);
      return this.__makeRequest(req);
    }
  }, {
    key: 'create',
    value: function create(params) {
      var req = this.http.method('post').send(params);
      return this.__makeRequest(req);
    }
  }, {
    key: 'get',
    value: function get(params) {
      params = params || {};
      var req = this.http.method('get').query(omit(params, 'id'));
      this.addPath(req, params.id);
      req.url += '/' + params.id;
      return this.__makeRequest(req);
    }
  }, {
    key: 'insert',
    value: function insert(params) {
      params = params || {};
      var req = this.http.method('put').send(params);
      this.addPath(req, params.id);
      return this.__makeRequest(req);
    }
  }, {
    key: 'update',
    value: function update(params) {
      params = params || {};
      var req = this.http.method('patch').send(omit(params, 'id'));
      this.addPath(req, params.id);
      return this.__makeRequest(req);
    }
  }, {
    key: 'destroy',
    value: function destroy(params) {
      params = params || {};
      var req = this.http.method('delete').send(omit(params, 'id'));
      this.addPath(req, params.id);
      return this.__makeRequest(req);
    }
  }]);

  return Resource;
}();

module.exports = Resource;