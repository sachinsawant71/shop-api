const Category = require('../models/category')
const Product = require('../models/product')

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
    Product.find({
            category: req.params.id
        })
        .populate('category')
        .exec((err, products) => {
            Product.count({
                category: req.params.id
            }, (err, totalProducts) => {
                res.status(200).json({
                    success: true,
                    products: products,
                    category: products[0].category.name,
                    totalProducts: totalProducts,
                    pages: Math.ceil(totalProducts / perPage)
                })
            })
        })
}