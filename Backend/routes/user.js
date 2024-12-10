const express = require('express');
const { signup, login, logout, updateProfile } = require('../controllers/userController');
const { userAuth } = require('../middleware/auth');
const { singleUpload } = require('../middleware/multer');
const userRouter = express.Router();

userRouter.post('/signup',singleUpload,signup)
userRouter.post('/login',login)
userRouter.post('/logout',logout)
userRouter.patch('/updateProfile',userAuth,updateProfile)

module.exports = userRouter;