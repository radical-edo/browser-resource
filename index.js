'use strict';
const config = require('./lib/config');

module.exports = {
  Config: function (yielder) {
    yielder(config);
  },
  Resource: require('./lib/resource')
};
