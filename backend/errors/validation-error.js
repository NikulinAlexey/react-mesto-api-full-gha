class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
    this.name = 'Validation Error';
  }
}

module.exports = ValidationError;
