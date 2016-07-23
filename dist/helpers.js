'use strict';

var helpers = {
  omit: function omit(object) {
    for (var _len = arguments.length, keys = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      keys[_key - 1] = arguments[_key];
    }

    object = object || {};
    return Object.keys(object).filter(function (k) {
      return -1 == keys.indexOf(k);
    }).reduce(function (result, key) {
      result[key] = object[key];
      return result;
    }, {});
  }
};

module.exports = helpers;