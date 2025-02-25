const Listing = require('../../models/Listing')

const cerateListing = async (req, res) => {
	try {
		if (typeof req.body.facilities === 'string') {
			req.body.facilities = req.body.facilities.split(',').map(item => item.trim())
		}

		if (typeof req.body.availableTypes === 'string') {
			req.body.availableTypes = req.body.availableTypes.split(',').map(item => item.trim())
		}

		// Destructure fields from the request body
		const {
			type,
			name,
			address,
			description,
			facilities,
			pricing,
			images,
			contactInfo,
			availableTypes,
		} = req.body
		const { userId } = req.user

		if (
			!type ||
			!name ||
			!address ||
			!address.areaStreet ||
			!address.district ||
			!address.city ||
			!address.state ||
			!address.zip ||
			!pricing ||
			!availableTypes ||
			!contactInfo
		) {
			return res.status(400).json({ message: 'Missing required fields.' })
		}

		// Create new listing document
		const newListing = new Listing({
			vendorId: userId,
			type,
			name,
			address,
			description,
			facilities,
			pricing,
			images,
			contactInfo,
			availableTypes,
		})

		// Save the listing to the database
		await newListing.save()

		res.status(201).json({ message: 'Listing created successfully', listing: newListing })
	} catch (error) {
		console.error('Error creating listing:', error)
		res.status(500).json({ message: 'Server error while creating listing.' })
	}
}

const getAllListings = async (req, res) => {
	try {
		const listings = await Listing.find()
		res.status(200).json({
			success: true,
			data: listings,
		})
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		})
	}
}

module.exports = { cerateListing, getAllListings }
