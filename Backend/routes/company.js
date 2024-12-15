const express = require("express");
const {
  registerCompany,
  getCompany,
  getCompanyById,
  updateCompany,
} = require("../controllers/companyRegister");
const { userAuth } = require("../middleware/auth");
const companyRouter = express.Router();
const { singleUpload } = require("../middleware/multer");


companyRouter.post("/register/company", userAuth, registerCompany);
companyRouter.get("/find/user/allCompany", userAuth, getCompany);
companyRouter.get("/find/Company/:id", singleUpload, userAuth, getCompanyById);
companyRouter.patch(
  "/update/company/:id",
  singleUpload,
  userAuth,
  updateCompany
);

module.exports = companyRouter;
