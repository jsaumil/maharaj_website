const Dish = require("../models/dishModel");
const asyncHandler = require("express-async-handler");

const addDish = asyncHandler(async (req, res) => {
  const { name, category, cuisine, price } = req.body;

  if (!name || !category || !cuisine || !price) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const dish = await Dish.create({ name, category, cuisine, price });
  res.status(201).json(dish);
});

const getAllDishes = asyncHandler(async (req, res) => {
  const dishes = await Dish.find();
  res.status(200).json(dishes);
});

module.exports = { addDish, getAllDishes };