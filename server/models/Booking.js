const bookingSchema = new mongoose.Schema(
	{
		customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
		listingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true },
		unitId: { type: mongoose.Schema.Types.ObjectId, ref: 'Unit', required: true },
		bookingDate: { type: Date, required: true },
		status: { type: String, enum: ['Pending', 'Confirmed', 'Cancelled'], default: 'Pending' },
		paymentDetails: {
			amount: { type: Number, required: true },
			method: {
				type: String,
				enum: ['Credit Card', 'Debit Card', 'UPI', 'Net Banking'],
				required: true,
			},
			transactionId: { type: String, unique: true },
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Booking', bookingSchema)
