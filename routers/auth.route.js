const routes = require('express').Router()

const { signupController, validation, loginController } = require('../controllers/auth.controller')

routes.post('/signup', validation.signup, signupController)
routes.post('/login', validation.login, loginController)

module.exports = routes