const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const cloudinary = require("../utils/cloudinary");
const getDataUri = require("../utils/dataUri");
const generateOTP = require("../utils/generateOTP");
const nodemailer = require("nodemailer");

exports.signup = async (req, res) => {
  try {
    const { fullname, email, password, role } = req.body;

    if (!fullname || !email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    // Handle file with Cloudinary
    const file = req.file;
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    //  find user
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exist with this email.",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = await User.create({
      fullname,
      email,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: cloudResponse.secure_url,
      },
    });

    return res.status(201).json({
      message: "Account created successfully.",
      data: userData,
      success: true,
    });
  } catch (error) {
    console.error(error);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }
    // check role is correct or not
    if (role !== user.role) {
      return res.status(400).json({
        message: "Account doesn't exist with current role.",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phonenumber: user.phonenumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    console.error(error);
  }
};

exports.logout = async (req, res) => {
  try {
    // remove token from cookie
    // first method
    // res.clearCookie("token");

    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully.",
      success: true,
    });
  } catch (error) {
    console.error(error);
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { fullname, email, phonenumber, bio, skills } = req.body;

    // Handle file with Cloudinary
    const file = req.file;
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    // Handle skills in array
    let skillsArray;
    if (skills) {
      skillsArray = skills.split(","); // Convert string to array
    }

    // Check user
    const userId = req.id; // Middleware adds user ID to req
    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User not found.",
        success: false,
      });
    }

    // Update fields
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phonenumber) user.phonenumber = phonenumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    // Resume handler
    if (cloudResponse) {
      user.profile.resume = cloudResponse.secure_url; // Save the Cloudinary URL
      user.profile.resumeOriginalName = file.originalname; // Save the original file name
    }

    await user.save();

    // Return updated user details
    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phonenumber: user.phonenumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile updated successfully.",
      user,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while updating the profile.",
      success: false,
    });
  }
};

// Forgot Password

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const findUser = await User.findOne({ email });

    if (!findUser) {
      return res.status(404).json({
        message: "No account found with this email address.",
        success: false,
      });
    }

    // Check if the user recently requested a reset email
    const currentTime = new Date();
    const resetRequestCooldown = 10 * 60 * 1000; // 10 minutes in milliseconds

    if (findUser.lastPasswordResetRequest) {
      const timeSinceLastRequest =
        currentTime - new Date(findUser.lastPasswordResetRequest);

      if (timeSinceLastRequest < resetRequestCooldown) {
        const timeRemaining = Math.ceil(
          (resetRequestCooldown - timeSinceLastRequest) / 60000
        );
        return res.status(429).json({
          message: `You can request another reset email in ${timeRemaining} minutes.`,
          success: false,
        });
      }
    }

    // Generate a new OTP
    const otp = generateOTP();
    findUser.otp = otp;
    findUser.otpExpires = Date.now() + 60 * 1000; // OTP valid for 1 minute
    findUser.lastPasswordResetRequest = currentTime; // Update the request time
    await findUser.save();

    // Email Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email Content
    const emailContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #0056b3;">Password Reset Request</h2>
        <p>Hello <strong>${findUser.fullname || "User"}</strong>,</p>
        <p>You requested to reset your password. Use the OTP below to proceed. This OTP is valid for <strong>1 minute</strong>:</p>
        <h3 style="background-color: #f8f9fa; padding: 10px; border: 1px solid #ddd; display: inline-block; color: #0056b3;">
          ${otp}
        </h3>
        <p>If you did not request a password reset, please ignore this email or contact our support team.</p>
        <p>Thank you,<br />The Support Team</p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
        <small style="color: #888;">This is an automated email. Please do not reply.</small>
      </div>
    `;

    // Send OTP Email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP for Password Reset (Valid for 1 Minute)",
      html: emailContent,
    });

    res.json({
      message: "OTP has been sent to your registered email address.",
      success: true,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Failed to send OTP. Please try again later.",
      success: false,
    });
  }
};

// reset password

exports.resetPassword = async (req, res) => {
  const { email, otp, newPassword, confirmNewPassword } = req.body;

  try {
    if (!email || !otp || !newPassword || !confirmNewPassword) {
      return res.status(400).json({
        message: "All fields are required.",
        success: false,
      });
    }

    // matched new pasword and confirm new password
    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({
        message: "New password and confirm new password do not match.",
        success: false,
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "No account found with this email address.",
        success: false,
      });
    }

    // Validate OTP
    if (!user.otp || user.otpExpires < Date.now()) {
      user.otp = null; // Clear expired OTP
      user.otpExpires = null;
      await user.save();

      return res.status(401).json({
        message: "Your OTP has expired. Please request a new OTP.",
        success: false,
      });
    }

    if (user.otp !== otp) {
      return res.status(401).json({
        message: "The OTP you provided is incorrect. Please try again.",
        success: false,
      });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password and clear OTP data
    user.password = hashedPassword;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    // Email Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email Content
    const emailContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #0056b3;">Password Reset Successful</h2>
        <p>Hello <strong>${user.fullname || user}</strong>,</p>
        <p>This email confirms that your password has been successfully reset. If you did not request this change, please contact our support team immediately.</p>
        <p style="color: #d9534f; font-weight: bold;">If you suspect unauthorized access to your account, we recommend updating your password and enabling additional security measures.</p>
        <p>Thank you,<br />The Support Team</p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
        <small style="color: #888;">This is an automated email. Please do not reply.</small>
      </div>
    `;

    // Send Notification Email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Confirmation",
      html: emailContent,
    });

    res.json({
      message:
        "Your password has been reset successfully. You can now log in with your new password. A confirmation email has been sent to your registered email address.",
      success: true,
    });
  } catch (err) {
    console.error("Error during password reset:", err);

    return res.status(500).json({
      message:
        "An error occurred while resetting your password. Please try again later.",
      success: false,
    });
  }
};
