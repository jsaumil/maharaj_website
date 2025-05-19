const User=require ("../models/userModel");
const asyncHandler = require("express-async-handler");

const createUser = asyncHandler(async (req, res) => {
    const { email } = req.body;
    
    //create new user
    const finduser = await User.findOne({ email: email });
    if (!finduser) { 
      const newUser = await User.create({
        ...req.body,
        bookings: [] // Initialize empty bookings array
      });
      res.json(newUser);
    } else {
      res.status(400);
      throw new Error("User Already Exists");
    }
  });
  
 const loginUserCtrl = asyncHandler(async (req, res) => { 
    const { email, password } = req.body;
    //check if user exists or not
    const findUser =await User.findOne({ email });
    if (findUser && await findUser.isPasswordMatched(password)) {
        res.json(findUser);
    }else {
        throw new Error("Invalid Credentials");
    }
 });

 // Get all users

const getallUser = asyncHandler(async (req, res) => {
try {
    const getUsers = await User.find();
    res.json(getUsers);
    } catch (error) {
    throw new Error(error);
    }
});

module.exports = { createUser, loginUserCtrl, getallUser };