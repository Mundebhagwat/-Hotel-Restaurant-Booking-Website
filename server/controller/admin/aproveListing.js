const Listing = require('../../models/Listing')

const getPendingListings = async (req, res) => {
	try {
		// Query listings with status 'Pending'
		const listings = await Listing.find({ status: 'Pending' }).populate('vendorId')
		res.status(200).json({
			success: true,
			data: listings,
		})
	} catch (error) {
		console.error('Error fetching pending listings:', error)
		res.status(500).json({
			success: false,
			message: error.message,
		})
	}
}

const updateListingStatus = async (req, res) => {
	try {
		const { status, listingId } = req.body

		// Validate that the provided status is either 'Approved' or 'Rejected'
		if (!['Approved', 'Rejected'].includes(status)) {
			return res.status(400).json({ message: 'Invalid status provided.' })
		}

		// Find the listing by ID
		const listing = await Listing.findById(listingId)
		if (!listing) {
			return res.status(404).json({ message: 'Listing not found.' })
		}

		// Update the status
		listing.status = status
		await listing.save()

		res.status(200).json({
			message: `Listing ${status.toLowerCase()} successfully.`,
			listing,
		})
	} catch (error) {
		console.error('Error updating listing status:', error)
		res.status(500).json({ message: 'Server error while updating listing status.' })
	}
}

module.exports = { getPendingListings, updateListingStatus }
