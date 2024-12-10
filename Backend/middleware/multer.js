const multer = require("multer");

// create a memory
const storage = multer.memoryStorage();

exports.singleUpload = multer({ storage }).single("file");
