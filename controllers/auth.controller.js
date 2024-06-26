const User = require('../models/user.model')
const { signup, login } = require('../models/user.validation')
const { validator } = require('../helper')
const AppError = require('../helper/AppError')
const Config = require('../config')
const jwt = require('jsonwebtoken')

const { JWT_SECRET, JWT_EXPIRE } = Config
const validation = {}

validation.signup = validator(signup)
const signupController = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        const checkUserExists = await User.exists({ email: email });
        if (checkUserExists) {
            return next(new AppError("User already exists", 400))
        }

        const user = await User.create({ username, email, password });

        const accessToken = jwt.sign({
            id: user._id,
        }, JWT_SECRET, { expiresIn: JWT_EXPIRE })

        res.status(201).json({ success: true, message: "User registered successfully", user, accessToken });
    } catch (err) {
        next(err)
    }
}

validation.login = validator(login)
const loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email: email, deletedAt: false }).select('+password')
        if (!user) return next(new AppError('Incorrect email or password', 401));

        const checkPassword = await user.compare(password, user.password)
        if (!checkPassword) return next(new AppError('Incorrect email or password', 401));

        const accessToken = jwt.sign({
            id: user._id,
        }, JWT_SECRET, { expiresIn: JWT_EXPIRE })

        res.status(201).json({ success: true, message: "Login successfully", user, accessToken });
    } catch (err) {
        next(err)
    }
}


module.exports = {
    signupController,
    loginController,
    validation
};