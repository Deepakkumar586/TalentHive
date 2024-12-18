import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import Navbar from "./shared/Navbar";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { setSingleJob } from "@/redux/JobSlice";
import axios from "axios";
import { useEffect, useState } from "react";

// Loading Spinner component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center mt-4">
    <svg
      className="animate-spin h-8 w-8 border-t-4 border-blue-500 rounded-full"
      viewBox="0 0 24 24"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
    </svg>
  </div>
);

const JobDescription = () => {
  const params = useParams();
  const jobId = params.id;
  const { singleJob } = useSelector((store) => store.alljobs);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false); // Local loading state for job application

  // Check if the user has already applied for the job
  const isApplied = singleJob?.applications?.some(
    (application) => application.applicant?._id === user?._id
  );

  // Fetch single job data
  const fetchSingleJob = async () => {
    setIsLoading(true); // Show spinner while fetching
    try {
      const response = await axios.get(
        `${JOB_API_END_POINT}/student/get/job/${jobId}`,
        { withCredentials: true }
      );
      if (response.data.success) {
        dispatch(setSingleJob(response.data.job)); // Update Redux store with the fetched job
      }
    } catch (err) {
      console.error("Error fetching job details:", err);
    } finally {
      setIsLoading(false); // Hide spinner after fetching is done
    }
  };

  // Fetch job data when the component loads or when certain dependencies change
  useEffect(() => {
    fetchSingleJob();
  }, [jobId, user?._id, dispatch]);

  // Handle Apply Job
  const handleApplyJobNow = async () => {
    setIsLoading(true); // Start loading when applying
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/applyJobs/${jobId}`,
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Successfully applied for the job!"); // Show success message

        // Re-fetch the job data to update the component state
        await fetchSingleJob(); // Ensure the job data is refreshed
      }
    } catch (err) {
      console.error("Error applying for job:", err);
      toast.error(
        err.response?.data?.message ||
          "Failed to apply for the job. Please try again."
      );
    } finally {
      setIsLoading(false); // Stop loading after applying
    }
  };

  return (
    <div className="min-h-screen pt-20">
      <Navbar />

      <motion.div
        className="max-w-7xl mx-auto my-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-100 via-purple-200 to-purple-300 rounded-lg shadow-lg mb-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h2 className="font-bold text-2xl text-gray-800">
            Company: {singleJob?.company?.name}
          </h2>
        </motion.div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <motion.h1
              className="font-extrabold text-2xl md:text-3xl text-purple-800"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {singleJob?.title}
            </motion.h1>
            <motion.div
              className="flex flex-wrap items-center gap-2 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
            >
              <Badge>{singleJob?.position} Position</Badge>
              <Badge>{singleJob?.jobType}</Badge>
              <Badge>{singleJob?.salary} LPA</Badge>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            <Button
              onClick={!user || isApplied ? null : handleApplyJobNow}
              disabled={!user || isApplied || isLoading} // Disable button if not logged in, already applied, or loading
              className={`mt-4 md:mt-0 rounded-lg text-white ${
                !user || isApplied || isLoading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {!user
                ? "You Need To Login And then you can apply job "
                : isApplied
                ? "Already Applied"
                : isLoading
                ? "Applying..."
                : "Apply Now"}
            </Button>
          </motion.div>
        </div>

        {/* Show loading spinner if the job data is being fetched or applied */}
        {isLoading && <LoadingSpinner />}

        <motion.div
          className="my-6 space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <h3>Role: {singleJob?.title}</h3>
          <h3>Location: {singleJob?.location}</h3>
          <h3>Description: {singleJob?.description}</h3>
          <h3>Experience: {singleJob?.experienceLevel}</h3>
          <h3>Salary: {singleJob?.salary} LPA</h3>
          <h3>Total Applicants: {singleJob?.applications?.length}</h3>
          <h3>Posted Date: {singleJob?.createdAt?.split("T")[0]}</h3>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default JobDescription;
