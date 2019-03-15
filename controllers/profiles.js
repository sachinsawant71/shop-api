const User = require('../models/user')

exports.get = (req, res) => {
    User.findOne({
        _id: req.decoded.user._id
    }, (err, user) => {
        if (err) {
            return res.json({
                success: false,
                message: err
            })
        }
        return res.status(200).json({
            success: true,
            user: user
        })
    })
}

exports.post = (req, res) => {
    console.log(req.body);

}