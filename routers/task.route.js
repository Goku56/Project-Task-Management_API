const { createTask, getTaskById, updateTask, deleteTask, updateTaskStatus, validation, getAllTask } = require('../controllers/task.controller')

const routes = require('express').Router()

routes.post('/create-task', validation.createTaskValidation, createTask)
routes.get('/:id', validation.getTaskByIdValidation, getTaskById)
routes.post('/all-tasks', getAllTask)
routes.put('/update-task/:id', validation.udpateTaskValidation, updateTask)
routes.patch('/update-task-status/:id', validation.udpateTaskStatusValidation, updateTaskStatus)
routes.delete('/delete-task/:id', validation.deleteTaskValidation, deleteTask)

module.exports = routes