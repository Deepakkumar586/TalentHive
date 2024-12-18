const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
  } catch (err) {
    console.error("Database connection failed", err);
    process.exit(1);
  }
};

module.exports = connectDb;
