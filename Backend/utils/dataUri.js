const datauriParser = require("datauri/parser");

const path = require("path");

const getDataUri = (file) => {
  const parser = new datauriParser();

  const filePath = path.extname(file.originalname.toString());

  return parser.format(filePath, file.buffer);
};

// exports

module.exports = getDataUri;
