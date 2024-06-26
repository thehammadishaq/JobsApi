const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
        // select: false,
    },
}
)

UserSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})


//JWT Token
UserSchema.methods.createJWT = function () {
    return jwt.sign({ id: this._id, name: this.name }, process.env.JWT_TOKEN, { expiresIn: process.env.JWT_LIFETIME })
}



UserSchema.methods.comparePassword = async function (canditatePassword) {
    const isMatch = await bcrypt.compare(String(canditatePassword), this.password)
    return isMatch
}






module.exports = mongoose.model('User', UserSchema)

