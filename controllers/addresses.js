const User = require('../models/user')

exports.get = (req, res, next) => {
    User.findOne({
        _id: req.decoded.user._id
    }, (err, user) => {
        if (err) return next(err)

        return res.status(200).json({
            success: true,
            address: user.address
        })
    })
}

exports.update = (req, res, next) => {
    User.findOne({
        _id: req.decoded.user._id
    }, (err, user) => {
        if (err) return next(err)

        address = user.address
        if (req.body.addr1) address.addr1 = req.body.addr1
        if (req.body.addr2) address.addr2 = req.body.addr2
        if (req.body.city) address.city = req.body.city
        if (req.body.country) address.country = req.body.country
        if (req.body.state) address.state = req.body.state
        if (req.body.postalCode) address.postalCode = req.body.postalCode
        user.save()

        return res.status(201).json({
            success: true,
            message: 'Address edited successfully.'
        })
    })
}