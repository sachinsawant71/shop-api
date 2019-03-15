const jwt = require('jsonwebtoken')
const config = require('../config.js')

module.exports = (req, res, next) => {
    let token = req.headers.authorization

    if (token) {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                return res.status(422).json({
                    success: false,
                    message: 'Failed to authenticate.'
                })
            } else {
                req.decoded = decoded
                next()
            }
        })
    } else {
        return res.status(403).json({
            success: false,
            message: 'Access forbidden. No token provided.'
        })
    }
}