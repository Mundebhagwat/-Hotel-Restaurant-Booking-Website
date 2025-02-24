const reviewSchema = new mongoose.Schema(
	{
		bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
		customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
		rating: { type: Number, min: 1, max: 5, required: true },
		comments: { type: String },
		timestamp: { type: Date, default: Date.now },
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Review', reviewSchema)
