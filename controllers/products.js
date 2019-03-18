const Product = require('../models/product')
const cloudinary = require('cloudinary')

cloudinary.config({
    cloud_name: 'bkichob',
    api_key: '865124178133637',
    api_secret: '5iQvSq93CEqNH-_jOj61jGK2zhU'
});

exports.getSellerProducts = (req, res) => {

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