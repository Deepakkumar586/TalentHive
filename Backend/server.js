const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({});
const connectDb = require("./utils/db");
const userRouter = require("./routes/user.js");
const companyRouter = require("./routes/company.js");
const jobRouter = require("./routes/job.js");
const applicationRouter = require("./routes/applications.js");
const path = require("path");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// path
const _dirname = path.resolve();

// all user api
app.use("/api/user", userRouter);

// all company api

app.use("/api/company", companyRouter);

// all job

app.use("/api/job", jobRouter);

// all application api

app.use("/api/application", applicationRouter);

// Serve static files
app.use(express.static(path.join(__dirname, "..", "Frontend", "dist")));

// Catch-all route to serve the index.html for single-page application (SPA)
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "Frontend", "dist", "index.html"));
});
console.log(path.join(__dirname, "..", "Frontend", "dist"));

const port = process.env.PORT;
app.listen(port, () => {
  connectDb();

  console.log(`Server running on port ${port}`);
});
