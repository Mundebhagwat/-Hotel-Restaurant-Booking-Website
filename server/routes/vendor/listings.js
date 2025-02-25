const express = require('express')
const { cerateListing, getAllListings } = require('../../controller/vendor/listingController')
const { verifyToken, verifyVendor } = require('../../middleware/jwtMiddleware')
const router = express.Router()

router.post('/listing', verifyToken, verifyVendor, cerateListing)
router.get('/listing', verifyToken, verifyVendor, getAllListings)

module.exports = router
