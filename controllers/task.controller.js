const Task = require('../models/task.model')
const { createTaskValidation, getTaskByIdValidation, udpateTaskValidation, deleteTaskValidation, udpateTaskStatusValidation } = require('../models/task.validation')
const { validator } = require('../helper')
const AppError = require('../helper/AppError')
const Config = require('../config')

const validation = {}

validation.createTaskValidation = validator(createTaskValidation)
const createTask = async (req, res, next) => {
    try {
        const { name, description, projectId, userId } = req.body

        const task = await Task.create({ name, description, userId, projectId })

        return res.status(200).json({
            success: true,
            message: `Task ${task.name} created successfully`,
            data: task
        })
    } catch (err) {
        next(err)
    }
}

validation.getTaskByIdValidation = validator(getTaskByIdValidation)
const getTaskById = async (req, res, next) => {
    try {
        const { id } = req.params
        const task = await Task.findById({ _id: id })
        if (!task) {
            return next(new AppError('No Task found with this id', 404))
        }

        res.status(200).json({
            success: true,
            message: "Task retrieved successfully",
            data: task
        })
    } catch (err) {
        next(err)
    }
}

validation.udpateTaskValidation = validator(udpateTaskValidation)
const updateTask = async (req, res, next) => {
    try {
        const { id } = req.params
        const task = await Task.findById({ _id: id })
        if (!task) {
            return next(new AppError('No Project found with this id', 404))
        }

        const updatedData = await Task.findOneAndUpdate(
            { _id: id },
            req.body,
            { new: true }
        )

        res.status(200).json({ success: true, message: "Update Successfully", data: updatedData })
    } catch (err) {
        next(err)
    }
}


const getAllTask = async (req, res, next) => {
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


        const totalTasks = await Task.countDocuments(query);
        const totalPages = Math.ceil(totalTasks / limit);
        const nextPage = page < totalPages ? page + 1 : null;
        const prevPage = page > 1 ? page - 1 : null;

        const task = await Task.find(query).skip((page - 1) * limit).limit(limit)

        res.status(200).json({
            success: true,
            message: "Tasks retrieved successfully",
            data: task,
            page,
            nextPage,
            prevPage,
            totalPages,
            totalTasks,
        })
    } catch (err) {
        next(err)
    }
}

validation.udpateTaskStatusValidation = validator(udpateTaskStatusValidation)
const updateTaskStatus = async (req, res, next) => {
    try {
        const { id } = req.params
        console.log(req.body)
        const task = await Task.findById({ _id: id })
        if (!task) {
            return next(new AppError('No Project found with this id', 404))
        }

        const updatedData = await Task.findOneAndUpdate(
            { _id: id },
            { status: req.body.status },
            { new: true }
        )


        res.status(200).json({ success: true, message: "Task status update successfully", data: updatedData })
    } catch (err) {
        next(err)
    }
}

validation.deleteTaskValidation = validator(deleteTaskValidation)
const deleteTask = async (req, res, next) => {
    try {
        const { id } = req.params
        const task = await Task.findById(id)
        if (!task) {
            return next(new AppError('No Project found with this id', 404))
        }

        const deleteData = await Task.findOneAndDelete(
            { _id: id }
        )

        res.status(200).json({ success: true, message: "Deleted Successfully" })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    createTask,
    updateTask,
    updateTaskStatus,
    deleteTask,
    getTaskById,
    getAllTask,
    validation
};