const mongoose = require('mongoose')

const unitSchema = new mongoose.Schema(
	{
		listingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true },
		unitType: { type: String, required: true }, // Example: 'Deluxe Room' or 'VIP Table'
		capacity: { type: Number, required: true }, // Number of people it accommodates
		price: { type: Number, required: true }, // Price per night or per booking
		availability: { type: Boolean, default: true },
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Unit', unitSchema)
