const { updateSearchIndex } = require("../models/bookingeModel");
const MealDetails = require("../models/mealDetailsModel");
const asyncHandler = require("express-async-handler");

const createMealDetails = asyncHandler(async (req, res) => {
   let { userId, bookingId, numberOfPeople, cuisines } = req.body; //, dishes

  bookingId = bookingId.trim();

  if (!userId  || !bookingId || !numberOfPeople || !cuisines || cuisines.length === 0) {
    res.status(400);
    throw new Error("Please provide: userId, bookingId, numberOfPeople, and at least one cuisine");
  }

  const mealDetails = await MealDetails.create({
    user: userId,
    booking: bookingId.trim(),
    numberOfPeople,
    cuisines,
    // dishes,
  });

  res.status(201).json(mealDetails);
});

module.exports = { createMealDetails };
