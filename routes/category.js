const express = require('express')
const router = express.Router()

const Categories = require('../controllers/categories')
const AuthMiddleware = require('../middlewares/auth')

router.get('', Categories.get)
router.post('', AuthMiddleware, Categories.post)
router.get('/:id', Categories.getSingle)

module.exports = router