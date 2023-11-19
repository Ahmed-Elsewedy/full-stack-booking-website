const express = require('express')
require('dotenv').config()
require('./config/db')
const cors = require('cors')
const app = express()
const path = require('path')
const port = process.env.PORT || 3000
const httpStatusText = require('./utils/httpStatusText')

const userRouter = require('./routes/user.routes')
const placeRouter = require('./routes/place.routes')
const bookingRouter = require('./routes/booking.routes')

app.use(express.json())

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use(cors({
    credentials: true,
    origin: 'http://127.0.0.1:5173'
}))

app.get('/api', (req, res) => {
    res.json('Test Response')
})

app.use('/api/user', userRouter)
app.use('/api/place', placeRouter)
app.use('/api/booking', bookingRouter)


app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({ status: error.statusText || httpStatusText.ERROR, message: error.message, code: error.statusCode || 500, data: null });
})

app.listen(port, () => {
    console.log(`Your app listening on port ${port}`)
})