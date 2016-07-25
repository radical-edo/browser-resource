'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var request = require('superagent');
var config = require('./config');

var Http = function () {
  function Http(path) {
    _classCallCheck(this, Http);

    this.path = path;
  }

  _createClass(Http, [{
    key: 'upload',
    value: function upload(action) {
      return request.post(this.path + ('/' + path));
    }
  }, {
    key: 'method',
    value: function method(type) {
      var req = request[type](this.path).type('json').accept('json');
      config.headers.forEach(function (header) {
        req.set.apply(req, _toConsumableArray(header));
      });
      return req;
    }
  }]);

  return Http;
}();

module.exports = Http;