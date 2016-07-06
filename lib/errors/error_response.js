'use strict';

class ErrorResponse extends Error {
  constructor(err) {
    this.name = 'ErrorResponse';
    this.err = err;
  }
}

module.exports = ErrorResponse;
