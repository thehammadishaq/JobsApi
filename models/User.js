const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Provide Name"],
        trim: true,
        maxlength: [20, "Name cannot be more than 20 characters"],
        minlength: [3, "Name cannot br less 3 characters"]
    },
    email: {
        type: String,
        required: [true, "Please Provide Email"],
        unique: true,
        trim: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',],
    },
    password: {
        type: String,
        required: [true, "Please Provide Password"],
        minlength: [6, "Password cannot be less than 6 characters"],
        select: false,
    },
}
)

module.exports = mongoose.model('User', UserSchema)