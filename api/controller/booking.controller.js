const Booking = require('../models/booking.model')
const asyncWrapper = require('../middlewares/asyncWrapper')
const httpStatusText = require('../utils/httpStatusText')
const appError = require('../utils/appError')
const checkPermission = require('../utils/checkPermission')

bookingPlace = asyncWrapper(async (req, res) => {
    const user = req.currentUser
    const booking = new Booking({ ...req.body, user: user.id })
    await booking.save()
    res.status(200).json({ status: httpStatusText.SUCCESS, data: { booking } })
})

getAllBookings = asyncWrapper(async (req, res) => {
    const user = req.currentUser.id
    const bookings = await Booking.find({ user }).populate('place')
    res.status(200).json({ status: httpStatusText.SUCCESS, data: { bookings } })
})

getBooking = asyncWrapper(async (req, res) => {
    const booking = await Booking.findById(req.params.id).populate('place')
    res.status(200).json({ status: httpStatusText.SUCCESS, data: { booking } })
})

module.exports = {
    bookingPlace,
    getAllBookings,
    getBooking
}