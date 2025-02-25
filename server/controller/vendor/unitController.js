const Unit = require('../../models/Unit')
const Listing = require('../../models/Listing')

const createUnit = async (req, res) => {
	try {
		const { listingId, unitType, capacity, price, availability } = req.body

		if (!listingId || !unitType || capacity === undefined || price === undefined) {
			return res.status(400).json({ message: 'Missing required fields.' })
		}

		const newUnit = new Unit({
			listingId,
			unitType,
			capacity,
			price,
			availability: availability !== undefined ? availability : true,
		})

		// Save the unit to the database
		await newUnit.save()

		res.status(201).json({
			message: 'Unit created successfully',
			unit: newUnit,
		})
	} catch (error) {
		console.error('Error creating unit:', error)
		res.status(500).json({ message: 'Server error while creating unit.' })
	}
}

const getAllUnits = async (req, res) => {
	try {
		const { userId } = req.user
		const listings = await Listing.find({ vendorId: userId })
		const listingIds = listings.map(listing => listing._id)

		const units = await Unit.find({ listingId: { $in: listingIds } }).populate('listingId')
		res.status(200).json({
			success: true,
			data: units,
		})
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		})
	}
}

module.exports = { createUnit, getAllUnits }
