const express = require('express')
const router = express.Router()
const faker = require('faker')
const Product = require('../models/product')

const Products = require('../controllers/products')
const AuthMiddleware = require('../middlewares/auth')

router.get('', Products.getAll)
router.get('/seller', AuthMiddleware, Products.getSellerProducts)
router.get('/:id', Products.getSingle)
router.post('', AuthMiddleware, Products.post)

router.get('/faker/test', (req, res, next) => {
    for (let i = 0; i < 20; i++) {
        const product = new Product()
        product.category = '5c8f5b06ec212a08b6e9448e'
        product.user = '5c89388b536729669ad5b81f'
        product.title = faker.commerce.productName()
        product.description = faker.lorem.words()
        product.price = faker.commerce.price()
        product.save()
    }
    res.json({
        message: 'Successfully added 20 products'
    })
})

module.exports = router