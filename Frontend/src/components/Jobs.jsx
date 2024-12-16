// import React from "react";
import Navbar from "./shared/Navbar";
import FilterJobs from "./FilterJobs";
import Job from "./Job";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

// const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
  const { alljobs } = useSelector((store) => store.alljobs);
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
          {alljobs.length <= 0 ? (
            <span>No jobs found</span>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="flex-1 h-[88vh] overflow-y-auto pb-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {alljobs.map((job, index) => (
                  <motion.div
                    key={index}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
