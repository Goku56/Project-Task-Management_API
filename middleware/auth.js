const jwt = require('jsonwebtoken');
const AppError = require('../helper/AppError');
const { JWT_SECRET } = require('../config');

const protectedRoute = async (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
        return next(new AppError('Access Denied', 401));
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return next(new AppError('Invalid Token', 401));
    }
}

module.exports = protectedRoute;