const express = require('express')
const router = express.Router()

const Products = require('../controllers/products')
const AuthMiddleware = require('../middlewares/auth')

router.get('', AuthMiddleware, Products.get)
router.post('', AuthMiddleware, Products.post)

module.exports = router