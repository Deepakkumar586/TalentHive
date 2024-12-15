const Job = require("../models/job");

exports.jobCreate = async (req, res) => {
  try {
    const userId = req.id;
    // console.log("job create :" + userId);
    // console.log("job create :" + userId.fullname);
    const {
      title,
      description,
      location,
      requirements,
      salary,
      jobType,
      position,
      experience,
      companyId,
    } = req.body;

    // missing required fields
    if (
      !title ||
      !description ||
      !location ||
      !requirements ||
      !salary ||
      !jobType ||
      !position ||
      !experience ||
      !companyId
    ) {
      return res.status(400).json({ message: "something is missing" });
    }

    // if job already create  with same name of title
    const jobExist = await Job.findOne({ title, company: companyId });
    if (jobExist) {
      return res.status(400).json({
        message: "You can't create same job with same title.",
        success: false,
      });
    }

    const job = await Job.create({
      title,
      description,
      location,
      requirements: requirements.split(","),
      salary: Number(salary),
      jobType,
      position,
      experienceLevel: experience,
      company: companyId,
      created_by: userId,
    });

    res.status(201).json({
      message: "Job created successfully",
      success: true,
      job: job,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.error(err);
  }
};

// get all jobs for student
exports.getAllJobStudent = async (req, res) => {
  try {
    const keyword = req.query.keyword || " ";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query)
      .populate({
        path: "company",
        select: "name",
      })
      .sort({
        createdAt: -1,
      });

    if (!jobs) {
      return res.status(404).json({ message: "No job found", success: false });
    }
    res.json({
      message: "Jobs fetched successfully",
      success: true,
      jobs,
    });
  } catch (err) {
    res.status(500).json({ message: "Job Fetching error" });
    console.error(err);
  }
};

// get Id  jobs for student
exports.getJobByIdStudent = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId)
      // Populates company with name
      .populate({
        path: "company",
        select: "name",
      })

      // Populates applications and their applicant details
      .populate({
        path: "applications",
        populate: {
          path: "applicant",
          select: "fullname",
        },
      });

    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }

    res.json({
      message: "JobId fetched successfully",
      success: true,
      job: job,
    });
  } catch (err) {
    res.status(500).json({ message: "Job ID fetching error" });
    console.error(err);
  }
};

// according to admin  job

exports.getAllJobsForAdmin = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId }).populate({
      path: "company",
      select: "name",
      createdAt:-1
      
    })

    if (!jobs) {
      return res.status(404).json({
        message: "sorry, you have not created any jobz",
        success: false,
      });
    }
    res.json({
      message: "Jobs fetched successfully",
      success: true,
      jobs,
    });
  } catch (err) {
    res.status(500).json({ message: "Job Fetching error" });
    console.error(err);
  }
};
