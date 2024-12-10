const Application = require("../models/application");
const Job = require("../models/job");
const User = require("../models/user");

// apply job
exports.applyJob = async (req, res) => {
    try {
      const userId = req.id;
      const { jobId } = req.params;
  
      if (!jobId) {
        return res.status(400).json({ message: "Job ID is required" });
      }
  
      // Check if the user has already applied for the job
      const existingApplication = await Application.findOne({
        job: jobId,
        applicant: userId,
      });
      if (existingApplication) {
        return res
          .status(400)
          .json({ message: "You have already applied for this job" });
      }
  
      // Check if the job exists
      const job = await Job.findById(jobId);
      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }
  
      // Create a new application
      const newApplication = new Application({
        job: jobId,
        applicant: userId,
      });
      await newApplication.save();
  
      // Update job's applications array
      job.applications.push(newApplication._id); // Push the ID of the new application
      await job.save();
  
      // Respond with success
      res.status(201).json({ message: "Application submitted successfully" });
    } catch (err) {
      res.status(500).json({ message: "Apply job failed" });
      console.error(err);
    }
  };
  

// student get all applications which apply
exports.getAllApplications = async (req, res) => {
  try {
    const userId = req.id;
    const applications = await Application.find({ applicant: userId })
      .sort({
        createdAt: -1, // sort by created at in descending order
      })
      .populate({
        path: "job",
        options: {
          sort: {
            createdAt: -1, // sort by created at in descending order
          },
        },
        // populate user who created the job
        populate: { path: "created_by", select: "fullname" },
        // populate company who created the job
        populate: {
          path: "company",
          select: "name",
          options: {
            sort: {
              createdAt: -1, // sort by created at in descending order
            },
          },
        },
      });
    if (!applications) {
      return res.status(404).json({ message: "No applications found" });
    }

    res.json({ message: "Applications fetched successfully", applications });
  } catch (err) {
    res.status(500).json({ message: "Fetch applications failed" });
    console.error(err);
  }
};

// get applications for a job how many students are applied the job end of admin

exports.getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    if (!jobId) {
      return res.status(400).json({ message: "Job id is required" });
    }

    const applications = await Job.findById(jobId).populate({
      path: "applications",
      options: {
        sort: {
          createdAt: -1, // sort by created at in descending order
        },
      },
      populate: { path: "applicant", select: "fullname" },
    });
    if (!applications) {
      return res.status(404).json({ message: "No applications found" });
    }

    res.json({
      message: `Applications for job with id ${jobId} fetched successfully`,
      applications,
    });
  } catch (err) {
    res.status(500).json({ message: "Fetch applications failed" });
    console.error(err);
  }
};

// admin  update the status

exports.updateApplicationStatus = async (req, res) => {
    try {
      const { status } = req.body;
      const { applicationId } = req.params;
  
      if (!status) {
        return res.status(400).json({ message: "Status is required" });
      }
  
      // Validate the status value
    //   const allowedStatuses = ["Pending", "Interviewing", "accepted","rejected"];
    //   if (!allowedStatuses.includes(status.toLowerCase())) {
    //     return res.status(400).json({
    //       message: `Invalid status. Allowed statuses are: ${allowedStatuses.join(", ")}`,
    //     });
    //   }
  
      // Find the application by ID
      const application = await Application.findById(applicationId);
      if (!application) {
        return res.status(404).json({ message: "Application not found" });
      }
  
      // Update the status
      application.status = status.toLowerCase();
      await application.save(); // Save the changes
  
      res.json({
        message: `Application with ID ${applicationId} updated successfully`,
        application,
      });
    } catch (err) {
      res.status(500).json({ message: "Update application status failed" });
      console.error(err);
    }
  };
  