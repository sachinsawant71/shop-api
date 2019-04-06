const express = require('express')
const router = express.Router()

const Orders = require('../controllers/orders')
const AuthMiddleware = require('../middlewares/auth')

router.post('', AuthMiddleware, Orders.post)

module.exports = router