const Company = require("../models/company");

// const Company = require("../models/company"); // Ensure the correct model import

exports.registerCompany = async (req, res) => {
  try {
    console.log("Request Body:", req.body); // Debug incoming data

    const { companyName, description, website, location } = req.body;

    // Validate request payload
    if (!companyName || !description || !website || !location) {
      return res.status(400).json({
        message:
          "Missing required fields: companyName, description, website, location",
        success: false,
      });
    }

    // Check if company already exists
    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        message: "You can't register the same company.",
        success: false,
      });
    }

    // Create new company
    company = await Company.create({
      name: companyName,
      description,
      website,
      location,
      userId: req.id,
    });

    return res.status(201).json({
      message: "Company registered successfully.",
      company,
      success: true,
    });
  } catch (error) {
    console.error("Error registering company:", error);
    return res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};

exports.getCompany = async (req, res) => {
  try {
    const userId = req.id; // logged in user id
    console.log(userId);
    const company = await Company.find({ userId });
    console.log("company : ", company);
    if (company.length == 0) {
      return res.status(404).json({
        message: "Companies not found.",
        success: false,
      });
    }
    res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//get company by id
exports.getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
        success: false,
      });
    }
    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// update company info
exports.updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    console.log(name, description, website, location);

    // const file = req.file;
    // idhar cloudinary ayega
    // const fileUri = getDataUri(file);
    // const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    // const logo = cloudResponse.secure_url;

    const updateData = { name, description, website, location };

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Company information updated.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
