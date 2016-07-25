'use strict';

var ErrorResponse = function () {
  function ErrorResponse(err) {
    Error.call(this);
    this.name = 'ErrorResponse';
    this.err = err;
  }
  ErrorResponse.prototype = Object.create(Error.prototype);

  return ErrorResponse;
}();

module.exports = ErrorResponse;