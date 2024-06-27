const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');

const authenticateUser = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnauthenticatedError('Authentication invalid')
    }
    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN)

        req.user = { userId: decoded.id, name: decoded.name }
        next()
    } catch (error) {
        throw new UnauthenticatedError('Authentication invalid')
    }

}
module.exports = { authenticateUser }