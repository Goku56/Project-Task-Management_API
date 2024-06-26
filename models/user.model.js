const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    mobile: {
        type: String
    },
    deletedAt: {
        type: String,
        default: false
    },
}, {
    timestamps: true
})


//hash password if not modifiedby
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next()
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
    next();
})


//Compare Password logic
userSchema.methods.compare = async (user, hash) => bcrypt.compare(user, hash)

const User = mongoose.model('User', userSchema);

module.exports = User

