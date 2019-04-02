const Category = require('../models/category')
const Product = require('../models/product')
const async = require('async')

exports.get = (req, res) => {
    Category.find({}, (err, categories) => {
        if (err) throw err

        return res.status(200).json({
            success: true,
            categories
        })
    })
}

exports.post = (req, res) => {
    const category = new Category()
    category.name = req.body.name
    category.save()

    return res.status(201).json({
        success: true,
        message: "Category successfully added."
    })
}

exports.getSingle = (req, res) => {
    const perPage = 10
    const page = req.query.page

    async.waterfall([
        function (callback) {
            Product.countDocuments({
                category: req.params.id
            }, (err, count) => {
                const totalProducts = count
                callback(err, totalProducts)
            })
        },
        function (totalProducts, callback) {
            Product.find({
                    category: req.params.id
                })
                .skip(perPage * page)
                .limit(perPage)
                .populate('category')
                .populate('user')
                .exec((err, products) => {
                    if (err) return err
                    callback(err, products, totalProducts)
                })
        },
        function (products, totalProducts, callback) {
            Category.findOne({
                _id: req.params.id
            }, (err, category) => {
                if (err) return err

                return res.status(200).json({
                    success: true,
                    products: products,
                    category: category.name,
                    totalProducts: totalProducts,
                    pages: Math.ceil(totalProducts / perPage)
                })
            })
        }
    ])

}