const express = require("express");
const router = express.Router();
const { createBooking, getUserBookings } = require("../controllers/bookingCtrl");

router.post("/book",  createBooking);
router.post("/user-bookings", getUserBookings);

module.exports = router;