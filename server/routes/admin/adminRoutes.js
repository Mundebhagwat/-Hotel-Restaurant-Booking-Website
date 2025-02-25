const express = require('express')
const { verifyToken, verifyAdmin } = require('../../middleware/jwtMiddleware')
const { registerVendor } = require('../../controller/admin/resisterVendor')
const { getPendingListings, updateListingStatus } = require('../../controller/admin/aproveListing')
const router = express.Router()

router.get('/aprove-listing', verifyToken, verifyAdmin, getPendingListings)
router.put('/aprove-listing', verifyToken, verifyAdmin, updateListingStatus)
router.post('/register-vendor', verifyToken, verifyAdmin, registerVendor)

module.exports = router
