const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		role: { type: String, enum: ['Customer', 'Vendor', 'Admin'], required: true },
		phoneNumber: {
			type: String,
			required: true,
			match: [/^\+91\s\d{10}$/, 'Please use the format +91 1234567890'],
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model('User', userSchema)
