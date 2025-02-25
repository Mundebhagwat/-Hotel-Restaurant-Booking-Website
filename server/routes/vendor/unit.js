const express = require('express')
const { createUnit, getAllUnits } = require('../../controller/vendor/unitController')
const { verifyToken, verifyVendor } = require('../../middleware/jwtMiddleware')
const router = express.Router()

router.post('/unit', verifyToken, verifyVendor, createUnit)
router.get('/unit', verifyToken, verifyVendor, getAllUnits)

module.exports = router
