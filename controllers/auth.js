const jwt = require('jsonwebtoken')
const User = require('../models/user')
const config = require('../config')

exports.login = (req, res) => {
    User.findOne({
        email: req.body.email
    }, (err, user) => {
        if (err) return res.json(err)

        if (!user) {
            return res.json({
                success: false,
                message: 'Authentication failed. User not found.'
            })
        } else if (user) {
            const validPassword = user.comparePassword(req.body.password)
            if (!validPassword) {
                return res.json({
                    success: false,
                    message: 'Authentication failed. Wrong password.'
                })
            } else {
                const token = jwt.sign({
                    user: user
                }, config.secret, {
                    expiresIn: '1d'
                })

                return res.json({
                    success: true,
                    message: 'Successfully logged in.',
                    token: token
                })
            }
        }
    })
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