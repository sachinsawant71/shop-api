const express = require('express')
const router = express.Router()

const Profiles = require('../controllers/profiles')
const AuthMiddleware = require('../middlewares/auth')

router.get('', AuthMiddleware, Profiles.get)
router.put('', AuthMiddleware, Profiles.put)

module.exports = router