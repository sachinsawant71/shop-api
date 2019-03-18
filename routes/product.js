const express = require('express')
const router = express.Router()

const Products = require('../controllers/products')
const AuthMiddleware = require('../middlewares/auth')

router.get('seller', AuthMiddleware, Products.getSellerProducts)
router.post('', AuthMiddleware, Products.post)

module.exports = router