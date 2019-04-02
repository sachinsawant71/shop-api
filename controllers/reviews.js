const Product = require('../models/product')
const Review = require('../models/review')
const async = require('async')

exports.post = (req, res) => {
    async.waterfall([
        function (callback) {
            Product.findOne({
                _id: req.body.product
            }, (err, product) => {
                if (product) {
                    callback(err, product)
                }
            })
        },
        function (product) {
            const review = new Review()
            review.user = req.decoded.user._id
            if (req.body.title) review.title = req.body.title
            if (req.body.description) review.description = req.body.description
            review.rating = req.body.rating
            review.product = product._id

            product.reviews.push(review._id)
            product.save()
            review.save()

            return res.status(201).json({
                success: true,
                message: 'Reviewed successfully.'
            })
        }
    ])
}