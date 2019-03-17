const express = require('express')
const router = express.Router()

const Address = require('../controllers/addresses')
const AuthMiddleware = require('../middlewares/auth')

router.get('', AuthMiddleware, Address.get)
router.post('', AuthMiddleware, Address.update)

module.exports = router