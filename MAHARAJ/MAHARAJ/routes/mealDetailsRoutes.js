const express = require("express");
const router = express.Router();
const { createMealDetails } = require("../controllers/mealDetailsCtrl");

router.post("/add-meal-details", createMealDetails);

module.exports = router;
