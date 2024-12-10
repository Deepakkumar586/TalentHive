const express = require('express');
const { userAuth } = require('../middleware/auth');
const { applyJob, getAllApplications, getApplicants, updateApplicationStatus } = require('../controllers/applications');
const applicationRouter = express.Router();

// Import routes
applicationRouter.post('/applyJobs/:jobId',userAuth,applyJob);
applicationRouter.get('/getAllApplications',userAuth,getAllApplications);
applicationRouter.get('/getApplicants/:id',userAuth,getApplicants);
applicationRouter.post('/updateStatus/:applicationId',userAuth,updateApplicationStatus)

module.exports = applicationRouter;