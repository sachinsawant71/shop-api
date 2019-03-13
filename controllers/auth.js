const jwt = require('jsonwebtoken')
const User = require('../models/user')
const config = require('../config')

exports.login = (req, res) => {

}

exports.register = (req, res) => {
    const user = new User()
    user.name = req.body.name
    user.email = req.body.email
    user.password = req.body.password
    user.picture = user.gravatar()
    user.isSeller = req.body.isSeller

    User.findOne({
        email: req.body.email
    }, (err, existingUser) => {
        if (existingUser) {
            return res.json({
                success: false,
                message: 'Account with given Email already exists.'
            })
        } else {
            user.save()

            const token = jwt.sign({
                user: user,
            }, config.secret, {
                expiresIn: '1d'
            })

            return res.json({
                success: true,
                message: 'Successfully registered.',
                token: token
            })
        }
    })
}