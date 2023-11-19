const express = require("express")
const router = express.Router()
const bookingController = require('../controller/booking.controller')
const authMiddleware = require('../middlewares/auth.middleware')

router.post('/', authMiddleware, bookingController.bookingPlace)
router.get('/', authMiddleware, bookingController.getAllBookings)
router.get('/:id', authMiddleware, bookingController.getBooking)

module.exports = router
