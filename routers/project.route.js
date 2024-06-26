const { createProject, getProjectById, updateProject, deleteProject, validation, updateProjectStatus, getAllProject } = require('../controllers/project.controller')

const routes = require('express').Router()

routes.post('/create-project', validation.createProjectValidation, createProject)
routes.get('/:id', validation.getProjectByIdValidation, getProjectById)
routes.post('/all-projects', getAllProject);
routes.put('/update-project/:id', validation.udpateProjectValidation, updateProject)
routes.patch('/update-project-status/:id', validation.udpateProjectStatusValidation, updateProjectStatus)
routes.delete('/delete-project/:id', validation.deleteProjectValidation, deleteProject)

module.exports = routes