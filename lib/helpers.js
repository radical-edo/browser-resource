'use strict';

const helpers = {
  omit(object, ...keys) {
    object = object || {};
    return Object.keys(object).filter(k => -1 == keys.indexOf(k)).reduce(function (result, key) {
      result[key] = object[key];
      return result
    }, {});
  }
};

module.exports = helpers;
