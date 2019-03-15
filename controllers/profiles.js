const User = require('../models/user')

exports.get = (req, res, next) => {
    User.findOne({
        _id: req.decoded.user._id
    }, (err, user) => {
        if (err) return next(err)

        return res.status(200).json({
            success: true,
            user: user
        })
    })
}

exports.put = (req, res, next) => {
    User.findOne({
        _id: req.decoded.user._id
    }, (err, user) => {
        if (err) return next(err)

        user.set(req.body)
        user.save()

        return res.status(201).json({
            success: true,
            message: 'Profile edited successfully.'
        })
    })

}