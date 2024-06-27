const mongoose = require('mongoose');

const JobSchema = mongoose.Schema({
    company: {
        type: String,
        required: [true, 'Please provide company name'],
        maxlength: [50, 'Name should be less than 50 letters'],
    },
    position: {
        type: String,
        required: [true, 'Please provide position name'],
        maxlength: [100, 'Name should be less than 100 letters'],
    },
    status: {
        type: String,
        enum: ['interview', 'declined', 'pending'],
        default: 'pending'
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user']
    }

}, { timestamps: true })

module.exports = mongoose.model('Job', JobSchema)