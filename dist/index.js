'use strict';

var config = require('./lib/config');

module.exports = {
  ErrorResponse: require('./lib/errors/error_response'),
  Config: function Config(yielder) {
    yielder(config);
  },
  Resource: require('./lib/resource')
};