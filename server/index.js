require('dotenv').config()
const express = require('express')
// const routes = require('./routes')
const connectDB = require('./config/db')
const cors = require('cors')
const app = express()
// import routes
//auth
const registerRoute = require('./routes/auth/register')
const loginRoute = require('./routes/auth/login')

//vendor
const listingRoute = require('./routes/vendor/listings')
const unitRoute = require('./routes/vendor/unit')

//Admin
const adminRoute = require('./routes/admin/adminRoutes')

app.use(cors())
connectDB()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//auth
app.use('/api', registerRoute)
app.use('/api', loginRoute)

//vendor
app.use('/api/vendor', [listingRoute, unitRoute])

//admin
app.use('/api/admin', adminRoute)

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`))
