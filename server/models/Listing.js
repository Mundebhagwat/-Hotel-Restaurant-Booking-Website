const listingSchema = new mongoose.Schema(
	{
		vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
		type: { type: String, enum: ['Hotel', 'Restaurant'], required: true },
		name: { type: String, required: true },
		address: { type: String, required: true },
		description: { type: String },
		facilities: [String], // Example: ['WiFi', 'Parking', 'Swimming Pool']
		pricing: { type: Number, required: true }, // Base pricing per unit
		images: [String], // Store image URLs
		status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' }, // Admin approval status
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Listing', listingSchema)
