const Category = require('../models/category')

exports.get = (req, res) => {

}

exports.post = (req, res) => {
    const category = new Category()
    category.name = req.body.category
    category.save()

    return res.status(201).json({
        success: true,
        message: "Category successfully added."
    })
}