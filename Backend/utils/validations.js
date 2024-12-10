const validator = require('validator');

const signupValidator = (req,res)=>{



  const {firstName,lastName,email,password} = req.body;

  if(!firstName || !lastName){
  throw new Error("FirstName and LastName must be required");
  }

  else if(!validator.isEmail(email)){
    throw new Error("Invalid Email");
  }
  else if(!validator.isStrongPassword(password)){
    throw new Error("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character");
  }

  
}
module.exports = {signupValidator}