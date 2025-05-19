const mongoose = require("mongoose");

const mealDetailsSchema = new mongoose.Schema({
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  numberOfPeople: {
    type: Number,
    min: 1,
    max: 10, 
    required: true,
  },
  cuisines: {
    type: [String],
    enum: ["North Indian", "Chinese", "South Indian", "Thai"],
    required: true,
  },
  dishes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Dish"
  }] 
//   dishes: {
//     mainCourse: [String],
//     breads: [String],
//     riceAndRaita: [String],
//     desserts: [String],
//     soupsAndBeverages: [String],
//   },
});

module.exports = mongoose.model("MealDetails", mealDetailsSchema);