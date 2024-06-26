const Project = require('../models/project.model')
const { createProjectValidation, getProjectByIdValidation, udpateProjectValidation, udpateProjectStatusValidation, deleteProjectValidation } = require('../models/project.validation')
const { validator } = require('../helper')
const AppError = require('../helper/AppError')
const Config = require('../config')

const validation = {}

validation.createProjectValidation = validator(createProjectValidation)
const createProject = async (req, res, next) => {
    try {
        const { name, description, userId } = req.body

        const project = await Project.create({ name, description, userId })

        return res.status(200).json({
            success: true,
            message: `Project ${project.name} created successfully`,
            data: project
        })
    } catch (err) {
        next(err)
    }
}

validation.getProjectByIdValidation = validator(getProjectByIdValidation)
const getProjectById = async (req, res, next) => {
    try {
        const { id } = req.params
        const project = await Project.findById(id).populate('userId')
        if (!project) {
            return next(new AppError('No Project found with this id', 404))
        }

        res.status(200).json({
            success: true,
            message: "Project retrieved successfully",
            data: project
        })
    } catch (err) {
        next(err)
    }
}

const getAllProject = async (req, res, next) => {
    try {
        const page = parseInt(req.body.page) || 1;
        const limit = 5;

        let query = {};

        if (req.body.search) {
            const search = req.body.search;
            query = {
                $or: [
                    { name: { $regex: search, $options: 'i' } },
                    { status: { $regex: search, $options: 'i' } }
                ]
            }
        }


        const totalProjects = await Project.countDocuments(query);
        const totalPages = Math.ceil(totalProjects / limit);
        const nextPage = page < totalPages ? page + 1 : null;
        const prevPage = page > 1 ? page - 1 : null;

        const project = await Project.find(query).skip((page - 1) * limit).limit(limit)

        res.status(200).json({
            success: true,
            message: "Projects retrieved successfully",
            data: project,
            page,
            nextPage,
            prevPage,
            totalPages,
            totalProjects,

        })
    } catch (err) {
        next(err)
    }
}


validation.udpateProjectStatusValidation = validator(udpateProjectStatusValidation)
const updateProjectStatus = async (req, res, next) => {
    try {
        const { id } = req.params
        const project = await Project.findById({ _id: id })
        if (!project) {
            return next(new AppError('No Project found with this id', 404))
        }

        const updatedData = await Project.findOneAndUpdate(
            { _id: id },
            { status: req.body.status },
            { new: true }
        )

        res.status(200).json({ success: true, message: "Update Successfully", data: updatedData })
    } catch (err) {
        next(err)
    }
}

validation.udpateProjectValidation = validator(udpateProjectValidation)
const updateProject = async (req, res, next) => {
    try {
        const { id } = req.params
        const project = await Project.findById(id)
        if (!project) {
            return next(new AppError('No Project found with this id', 404))
        }

        const updatedData = await Project.findOneAndUpdate(
            { _id: id },
            req.body,
            { new: true }
        )

        res.status(200).json({ success: true, message: "Update Successfully", data: updatedData })
    } catch (err) {
        next(err)
    }
}

validation.deleteProjectValidation = validator(deleteProjectValidation)
const deleteProject = async (req, res, next) => {
    try {
        const { id } = req.params
        const project = await Project.findById(id)
        if (!project) {
            return next(new AppError('No Project found with this id', 404))
        }

        const deleteData = await Project.findOneAndDelete(
            { _id: id }
        )

        res.status(200).json({ success: true, message: "Deleted Successfully" })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    createProject,
    updateProject,
    updateProjectStatus,
    deleteProject,
    getProjectById,
    getAllProject,
    validation
};