const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../../models/User')

const login = async (req, res) => {
	try {
		const { email, password } = req.body

		// Validate input
		if (!email || !password) {
			return res.status(400).json({ message: 'Please provide email and password.' })
		}

		// Check if user exists
		const user = await User.findOne({ email })
		if (!user) {
			return res.status(401).json({ message: 'Invalid email or password.' })
		}

		// Compare provided password with stored hashed password
		const isPasswordValid = await bcrypt.compare(password, user.password)
		if (!isPasswordValid) {
			return res.status(401).json({ message: 'Invalid email or password.' })
		}

		// Generate JWT token
		const token = jwt.sign(
			{ userId: user._id, role: user.role }, // Payload
			process.env.JWT_SECRET, // Secret key (store this securely in .env)
			{ expiresIn: '7d' } // Token expiration
		)

		// Respond with token and user details (excluding password)
		res.status(200).json({
			message: 'Login successful',
			token,
			user: {
				id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
				phoneNumber: user.phoneNumber,
			},
		})
	} catch (error) {
		console.error('Login error:', error)
		res.status(500).json({ message: 'Server error during login.' })
	}
}

module.exports = { login }
