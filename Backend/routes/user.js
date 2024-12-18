const express = require("express");
const {
  signup,
  login,
  logout,
  updateProfile,
  forgotPassword,
  resetPassword,
} = require("../controllers/userController");
const { userAuth } = require("../middleware/auth");
const { singleUpload } = require("../middleware/multer");

const userRouter = express.Router();

userRouter.post("/signup", singleUpload, signup);
userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.post("/forgotPassword", forgotPassword);
userRouter.post("/resetPassword", resetPassword);
userRouter.patch("/updateProfile", userAuth, singleUpload, updateProfile);

module.exports = userRouter;
