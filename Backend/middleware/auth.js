// middleware/auth.js
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log("Token:", token); // Log the token to see if it's being sent
    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }
    const decode = await jwt.verify(token, process.env.SECRET_KEY);
    if (!decode) {
      return res.status(401).json({
        message: "Invalid token",
        success: false,
      });
    }
    console.log("Decoded token:", decode); // Log the decoded token for debugging
    req.id = decode.userId;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", success: false });
  }
};

module.exports = { userAuth }; // Make sure this is exported correctly
