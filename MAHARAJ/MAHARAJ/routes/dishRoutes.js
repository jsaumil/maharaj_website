const express = require("express");
const router = express.Router();
const { addDish, getAllDishes } = require("../controllers/dishCtrl");

router.post("/", addDish);
router.get("/", getAllDishes);

module.exports = router;