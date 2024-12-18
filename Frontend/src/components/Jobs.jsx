// import React from "react";
import Navbar from "./shared/Navbar";
import FilterJobs from "./FilterJobs";
import Job from "./Job";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Footer from "./Footer";

// const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
  const { alljobs, studentSearchJob } = useSelector((store) => store.alljobs);
  const [filterJobs, setFilterJobs] = useState(alljobs);

  useEffect(() => {
    if (studentSearchJob) {
      const filteredJobs = alljobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(studentSearchJob.toLowerCase()) ||
          job.description
            .toLowerCase()
            .includes(studentSearchJob.toLowerCase()) ||
          job.location.toLowerCase().includes(studentSearchJob.toLowerCase()) ||
          job.salary.toLowerCase().includes(studentSearchJob.toLowerCase())
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(alljobs);
    }
  }, [alljobs, studentSearchJob]);
  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto mt-20 px-4 md:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-5">
          {/* Filter Sidebar */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-1/4  p-5 rounded-lg shadow-lg"
          >
            <FilterJobs />
          </motion.div>

          {/* Job Cards */}
          {filterJobs.length <= 0 ? (
            <span>No jobs found</span>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="flex-1 h-[88vh] overflow-y-auto pb-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterJobs.map((job, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.7, delay: index * 0.1 }}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Jobs;
