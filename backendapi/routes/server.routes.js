const express = require('express')
const router = express.Router()

router.use('/api/v1/posts', require('./orders.routes.js'))

module.exports = router