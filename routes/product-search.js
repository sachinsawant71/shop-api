const express = require('express')
const router = express.Router()

const ProductSearch = require('../controllers/product-search')

router.get('', ProductSearch.search)

module.exports = router