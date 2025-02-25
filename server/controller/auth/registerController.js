const bcrypt = require('bcrypt')
const User = require('../../models/User')

const register = async (req, res) => {
	try {
		const { name, email, password, role, phoneNumber } = req.body

		// Validate input (you can extend this as needed)
		if (!name || !email || !password || !role || !phoneNumber) {
			return res.status(400).json({ message: 'Please provide all required fields.' })
		}

		// Validate phone number format: +91 1234567890
		const phoneRegex = /^\+91\s\d{10}$/
		if (!phoneRegex.test(phoneNumber)) {
			return res
				.status(400)
				.json({ message: 'Phone number must be in the format +91 1234567890.' })
		}

		// Check if the user already exists
		const existingUser = await User.findOne({ email })
		if (existingUser) {
			return res.status(400).json({ message: 'User already exists with this email.' })
		}

		// Hash the password
		const saltRounds = 10
		const hashedPassword = await bcrypt.hash(password, saltRounds)

		// Create new user
		const newUser = new User({
			name,
			email,
			password: hashedPassword,
			role, // Ensure role is one of ['Customer', 'Vendor', 'Admin']
			phoneNumber,
		})

		// Save user to database
		await newUser.save()

		// Respond with success (omit sensitive details)
		res.status(201).json({ message: 'User registered successfully.' })
	} catch (error) {
		console.error('Registration error:', error)
		res.status(500).json({ message: 'Server error during registration.' })
	}
}

module.exports = { register }
