const route = require('express').Router();
const protectedRoute = require('../middleware/auth.js')

route.get('/health-check', (req, res) => {
    res.status(200).send('App is Healthy...');
})

route.use('/auth', require('./auth.route.js'))
route.use(protectedRoute)
route.use('/project',require('./project.route.js'))
route.use('/task',require('./task.route.js'))
// route.use('/user',require('./user.route.js'))
module.exports = route