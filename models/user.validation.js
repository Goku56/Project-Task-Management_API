const Joi = require("joi");

exports.signup = {
    body: Joi.object({
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(20).required()
    })
}

exports.login = {
    body: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(20).required()
    })
}

exports.updateUserValidation = {
    body: Joi.object({
        name: Joi.string(),
        password: Joi.string().min(6).max(20)
    })
}