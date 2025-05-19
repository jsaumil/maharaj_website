const mongoose = require("mongoose");

const dishSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: {
    type: String,
    enum: ["Main Course", "Breads", "Rice and Raita", "Desserts", "Soups and Beverages"],
    //  required: true,
  },
  cuisine: { type: String, required: true }, //ex.North Indian
  price: { type: Number, required: true },
});

module.exports = mongoose.model("Dish", dishSchema);