const Category = require('../models/category')

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
    category.name = req.body.category
    category.save()

    return res.status(201).json({
        success: true,
        message: "Category successfully added."
    })
}