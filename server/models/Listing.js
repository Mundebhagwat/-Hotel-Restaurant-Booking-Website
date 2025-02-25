const mongoose = require('mongoose')

const listingSchema = new mongoose.Schema(
	{
		vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
		type: { type: String, enum: ['Hotel', 'Restaurant'], required: true },
		name: { type: String, required: true },
		contactInfo: { type: String, required: true },
		availableTypes: [String],
		address: {
			areaStreet: { type: String, required: true },
			district: { type: String, required: true },
			city: { type: String, required: true },
			state: { type: String, required: true },
			zip: { type: String, required: true },
		},
		description: { type: String },
		facilities: [String], // Example: ['WiFi', 'Parking', 'Swimming Pool']
		pricing: { type: Number, required: true }, // Base pricing per unit
		images: [String], // Store image URLs
		status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' }, // Admin approval status
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Listing', listingSchema)
