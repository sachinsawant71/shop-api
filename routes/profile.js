const express = require('express')
const router = express.Router()

const Profiles = require('../controllers/profiles')
const AuthMiddleware = require('../middlewares/auth')

router.get('', AuthMiddleware, Profiles.get)
router.post('', AuthMiddleware, Profiles.post)

module.exports = router