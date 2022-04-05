const CustomError = require('./customError');

class RequestValidationError extends CustomError {

    statusCode = 400;
    errors = []

    constructor(error) {
        super();
        this.errors = error
    }

    serializeErrors() {
        return this.errors.map(error => {
            return {message: error.message,}
        })
    }
}

module.exports = RequestValidationError;