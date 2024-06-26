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


exports.createTaskValidation = {
    body: Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        projectId: objectId,
        assigneeId: objectId
    })
}

exports.getTaskByIdValidation = {
    params: Joi.object({
        id: objectId
    })
}

exports.deleteTaskValidation = {
    params: Joi.object({
        id: objectId
    })
}

exports.udpateTaskValidation = {
    body: Joi.object({
        name: Joi.string().required(),
        description: Joi.string(),
        assigneeId: Joi.string(),
        projectId: Joi.string()
    }),
    params: Joi.object({
        id: objectId
    })
}

exports.udpateTaskStatusValidation = {
    body: Joi.object({
        status: Joi.string().required()
    }),
    params: Joi.object({
        id: objectId
    })
}
