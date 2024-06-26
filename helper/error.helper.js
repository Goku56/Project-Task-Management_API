const errorController = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;

    err.status = err.status || "Error";

    return res.status(err.statusCode).json({
        status: err.status,
        error: err?.details?.body,
        message: err.message,
        stack: err.stack
    })
}

module.exports = errorController