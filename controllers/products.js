const Product = require('../models/product')
const cloudinary = require('cloudinary')
const async = require('async')

cloudinary.config({
    cloud_name: 'bkichob',
    api_key: '865124178133637',
    api_secret: '5iQvSq93CEqNH-_jOj61jGK2zhU'
});

exports.getSellerProducts = (req, res) => {
    Product.find({
            user: req.decoded.user._id
        })
        .populate('user')
        .populate('category')
        .exec((err, products) => {
            if (products) {
                return res.status(200).json({
                    success: true,
                    products
                })
            }

            return res.status(422).json({
                success: false,
                err,
                message: 'No products found.'
            })
        })
}

exports.post = (req, res) => {

    const product = new Product()
    product.user = req.decoded.user._id
    product.category = req.body.categoryId
    product.title = req.body.title
    product.description = req.body.description
    product.price = req.body.price

    if (req.body.image) {
        cloudinary.uploader.upload(req.body.image, (result) => {
            if (result === 'undefined') {
                return res.status(422).json({
                    success: false,
                    message: 'Image upload failed.'
                })
            }

            product.imageId = result.public_id
            product.imageVersion = result.version
            product.save()

            return res.status(201).json({
                success: true,
                message: 'Product successfully created.'
            })
        })
    }

    product.save()

    return res.status(201).json({
        success: true,
        message: 'Product successfully created.'
    })
}

exports.getSingle = (req, res) => {
    Product.findById({
            _id: req.params.id
        })
        .populate('category')
        .populate('user')
        .exec((err, product) => {
            if (err) {
                return res.status(404).json({
                    success: false,
                    message: 'Product not found.'
                })
            } else {
                return res.status(200).json({
                    success: true,
                    product: product
                })
            }
        })
}

exports.getAll = (req, res) => {
    const perPage = 10
    const page = req.query.page

    async.waterfall([
        function (callback) {
            Product.countDocuments({}, (err, count) => {
                const totalProducts = count
                callback(err, totalProducts)
            })
        },
        function (totalProducts, callback) {
            Product.find({})
                .skip(perPage * page)
                .limit(perPage)
                .populate('category')
                .populate('user')
                .exec((err, products) => {
                    if (err) return err
                    return res.status(200).json({
                        success: true,
                        products: products,
                        totalProducts: totalProducts,
                        pages: Math.ceil(totalProducts / perPage)
                    })
                })
        }
    ])
}