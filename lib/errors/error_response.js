'use strict';

class ErrorResponse extends Error {
  constructor(err) {
    super();
    this.name = 'ErrorResponse';
    this.err = err;
  }
}

module.exports = ErrorResponse;
