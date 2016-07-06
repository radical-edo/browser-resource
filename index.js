'use strict';
const config = require('./lib/config');

module.exports = {
  ErrorResponse: require('./lib/errors/error_response'),
  Config: function (yielder) {
    yielder(config);
  },
  Resource: require('./lib/resource')
};
