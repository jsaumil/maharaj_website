const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true, 
  },
  selectedDate: {
    type: Date,
    required: true,
  },
  meals: {
    type: [String], //ex.'Breakfast' 'Lunch'
    required: true,
  },
  servingTime: {
    type: String, //e.x.'11 am onwards'
    required: true,
  },
});

//Export the model
module.exports = mongoose.model("Booking", bookingSchema);