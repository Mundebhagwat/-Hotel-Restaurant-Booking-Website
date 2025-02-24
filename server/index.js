require('dotenv').config()
const express = require('express')
// const routes = require('./routes')
const connectDB = require('./config/db')
const cors = require('cors')
const app = express()
// import routes

const registerRoute = require('./routes/auth/register')
const loginRoute = require('./routes/auth/login')

app.use(cors())
connectDB()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', registerRoute)
app.use('/api', loginRoute)

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`))
