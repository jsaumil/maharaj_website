const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      firstname: user.firstname,
      email: user.email,
      token: generateToken(user._id),  
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

module.exports = { loginUser };