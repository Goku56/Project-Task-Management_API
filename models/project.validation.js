const Joi = require("joi");
const REGEX = {
    MONGO_OBJECT_ID: /^[a-f\d]{24}$/i
}

const objectId = Joi.string()
    .pattern(REGEX.MONGO_OBJECT_ID)
    .trim()
    .strict(true)
    .required()
    .messages({
        'string.pattern.base': 'Provide valid object ID'
    })


exports.createProjectValidation = {
    body: Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        userId: objectId
    })
}

exports.getProjectByIdValidation = {
    params: Joi.object({
        id: objectId
    })
}

exports.deleteProjectValidation = {
    params: Joi.object({
        id: objectId
    })
}

exports.udpateProjectValidation = {
    body: Joi.object({
        name: Joi.string().required(),
        description: Joi.string(),
    }),
    params: Joi.object({
        id: objectId
    })
}

exports.udpateProjectStatusValidation = {
    body: Joi.object({
        status: Joi.string().required()
    }),
    params: Joi.object({
        id: objectId
    })
}
