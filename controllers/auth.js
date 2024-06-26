const StatusCode = require('http-status-codes');
const User = require('../models/User');

const register = async (req, res) => {
    const user = await User.create({ ...req.body })
    res.send(user)
}
const login = async (req, res) => {
    res.send("login user")
}

module.exports = {
    register,
    login
}