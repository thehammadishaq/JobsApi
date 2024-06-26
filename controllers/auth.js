const StatusCode = require('http-status-codes');
const User = require('../models/User');

const register = async (req, res) => {
    const user = await User.create({ ...req.body })
    console.log(user);
    const token = user.createJWT();
    res.send({ name: { userId: user._id, name: user.name }, token })
}
const login = async (req, res) => {
    res.send("login user")
}

module.exports = {
    register,
    login
}