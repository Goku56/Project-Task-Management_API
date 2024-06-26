class AppError extends Error {

    static getMessage = message => {
        if (message instanceof Function) return message();
        return Array.isArray(message) ? message[0] : message;
    }

    constructor(message, statusCode, extraFields = {}) {
        super(message, statusCode);
        this.message = AppError.getMessage(message);
        this.messages = Array.isArray(message) ? message : undefined;
        this.statusCode = statusCode;
        this.extraFields = extraFields;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;