
class CustomError extends Error {

    constructor(message) {
        super(message);
    }

    serializeErrors() {
        throw new Error('Must be implemented in child'); 
    }
}

module.exports = CustomError;