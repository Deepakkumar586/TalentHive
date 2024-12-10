const express = require("express");
const {
  registerCompany,
  getCompany,
  getCompanyById,
  updateCompany,
} = require("../controllers/companyRegister");
const { userAuth } = require("../middleware/auth");
const companyRouter = express.Router();

companyRouter.post('/register/company',userAuth,registerCompany);
companyRouter.get('/find/user/allCompany', userAuth, getCompany);
companyRouter.get('/find/Company/:id', userAuth, getCompanyById);
companyRouter.patch('/update/company/:id', userAuth, updateCompany);

module.exports = companyRouter;
