const express = require('express')
const router = express.Router()

const Reviews = require('../controllers/reviews')
const AuthMiddleware = require('../middlewares/auth')

//router.get('', AuthMiddleware, Reviews.get)
router.post('', AuthMiddleware, Reviews.post)

module.exports = router