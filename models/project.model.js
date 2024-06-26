const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['to-do', 'in-progress', 'complete'],
        default: 'to-do'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    }
}, {
    timestamps: true
})


const Project = mongoose.model('Project', projectSchema);

module.exports = Project;

