const jwt = require("jsonwebtoken");
const User = require("../models/bookingeModel");

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log("Token from header:", token);

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      console.error("JWT verification failed:", error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
};

module.exports = { protect };