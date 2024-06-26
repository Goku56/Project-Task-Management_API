const User = require("../models/user.model")

const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params

        const user = await User.findById({ _id: id })
        if (!user) {
            return next(new AppError('No User found with this id', 404))
        }

        const updatedData = await Task.findOneAndUpdate(
            { _id: id },
            req.body,
            { new: true }
        )

        res.status(200).json({ success: true, message: "User updated successfully", data: updatedData })
    } catch (err) {
        next(err)
    }
}

const updatePassword = async (req, res, next) => {
    try {
        const { id } = req.params
        const { password, newPassword } = req.body;
        const user = await User.findById({ _id: id }).select('+password');
        if (!user) {
            return next(new AppError('No User found with this id', 404))
        }

        const checkPass = await user.compare(password, user.password)
        if (!checkPass) {
            return next(new AppError('Password is incorrect', 400))
        }

        const newPass = await user.compare(newPassword, user.password)
        if (newPass) return next(new AppError("Can't use the same password, Provide new Password", 400))

        user.password = newPassword
        user.save()

        res.status(200).json({ success: true, message: "User password updated successfully", data: updatedData })
    } catch (err) {
        next(err)
    }
}


    
module.exports = updateUser