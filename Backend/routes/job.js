// routes/jobRouter.js
const express = require("express");
const jobRouter = express.Router();
const { userAuth } = require("../middleware/auth");  // Make sure the correct path is used
const { jobCreate, getAllJobStudent, getJobByIdStudent, getAllJobsForAdmin } = require('../controllers/jobController');

// Use middleware in routes
jobRouter.post('/create/job', userAuth, jobCreate);
jobRouter.get('/student/get/alljob', userAuth, getAllJobStudent);
jobRouter.get('/student/get/job/:jobId', userAuth, getJobByIdStudent);
jobRouter.get('/admin/get/alljob', userAuth, getAllJobsForAdmin);

module.exports = jobRouter;  // Export the router correctly
