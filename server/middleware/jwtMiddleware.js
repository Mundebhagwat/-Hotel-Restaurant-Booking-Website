const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
	const authHeader = req.header('Authorization')
	const token = authHeader && authHeader.split(' ')[1]

	if (!token) {
		return res.status(401).json({ message: 'Access Denied' })
	}

	try {
		const verified = jwt.verify(token, process.env.JWT_SECRET)
		req.user = verified // Attach user payload to the request object
		next()
	} catch (error) {
		res.status(400).json({ message: 'Invalid Token' })
	}
}

module.exports = { verifyToken }
