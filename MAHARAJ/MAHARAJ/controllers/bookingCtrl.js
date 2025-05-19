const Booking = require("../models/bookingeModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const createBooking = asyncHandler(async (req, res) => {
  const { userId, selectedDate, meals, servingTime } = req.body;

  if (!userId || !selectedDate || !meals || !servingTime) {
    res.status(400);
    throw new Error("All fields are required");
  }

   // Verify user exists
   const userExists = await User.findById(userId);
   if (!userExists) {
     res.status(404);
     throw new Error("User not found");
   }

  const booking = await Booking.create({
    user: userId,
    selectedDate,
    meals,
    servingTime,
  });

   // Update user's bookings array
   await User.findByIdAndUpdate(userId, {
    $push: { bookings: booking._id }
  });

  res.status(201).json(booking);
});

// Add this new function to get user bookings
const getUserBookings = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  
  if (!userId) {
    res.status(400);
    throw new Error("userId is required");
  }

  const bookings = await Booking.find({ user: userId });
  res.status(200).json(bookings);
});

module.exports = { createBooking, getUserBookings };// Export the new function;