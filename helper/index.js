const { validate } = require('express-validation')

exports.validator = (schema, options = {}) => validate(schema, options, { abortEarly: false })
