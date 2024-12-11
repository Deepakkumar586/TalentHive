import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import Navbar from "./shared/Navbar";

const JobDescription = () => {
  const isApplied = false;

  return (
    <div className="min-h-screen  pt-20">
      {/* Navbar Component */}
      <Navbar />

      <motion.div
        className="max-w-7xl mx-auto my-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-100 via-purple-200 to-purple-300 rounded-lg shadow-lg mb-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Company Name Section */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h2 className="font-bold text-2xl text-gray-800">
            Company: Tech Solutions Ltd.
          </h2>
        </motion.div>

        {/* Job Title and Tags Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <motion.h1
              className="font-extrabold text-2xl md:text-3xl text-purple-800"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              Frontend Developer
            </motion.h1>
            <motion.div
              className="flex flex-wrap items-center gap-2 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
            >
              <Badge className="bg-gradient-to-r from-indigo-100 to-indigo-300 text-indigo-800 font-semibold px-3 py-1 rounded-full shadow-md hover:bg-gradient-to-r hover:from-indigo-300 hover:to-indigo-400 transition-all duration-300">
                12 Positions
              </Badge>
              <Badge className="bg-gradient-to-r from-indigo-100 to-indigo-300 text-indigo-800 font-semibold px-3 py-1 rounded-full shadow-md hover:bg-gradient-to-r hover:from-indigo-300 hover:to-indigo-400 transition-all duration-300">
                Part Time
              </Badge>
              <Badge className="bg-gradient-to-r from-indigo-100 to-indigo-300 text-indigo-800 font-semibold px-3 py-1 rounded-full shadow-md hover:bg-gradient-to-r hover:from-indigo-300 hover:to-indigo-400 transition-all duration-300">
                24 LPA
              </Badge>
            </motion.div>
          </div>

          {/* Apply Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            <Button
              className={`mt-4 md:mt-0 rounded-lg text-white ${
                isApplied
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {isApplied ? "Already Applied" : "Apply Now"}
            </Button>
          </motion.div>
        </div>

        {/* Job Description Section */}
        <motion.h2
          className="text-gray-600 border-b-2 border-gray-300 font-medium py-4 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          Job Description
        </motion.h2>

        <motion.div
          className="my-6 space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <motion.h3
            className="font-semibold text-lg text-purple-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            Role:{" "}
            <span className="pl-4 font-normal text-gray-600">
              Frontend Developer
            </span>
          </motion.h3>
          <motion.h3
            className="font-semibold text-lg text-purple-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            Location:{" "}
            <span className="pl-4 font-normal text-gray-600">Noida</span>
          </motion.h3>
          <motion.h3
            className="font-semibold text-lg text-purple-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.8 }}
          >
            Description:{" "}
            <span className="pl-4 font-normal text-gray-600">
              Frontend development tasks focusing on building responsive and
              scalable web applications using HTML, CSS, and JavaScript.
            </span>
          </motion.h3>
          <motion.h3
            className="font-semibold text-lg text-purple-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.8 }}
          >
            Experience:{" "}
            <span className="pl-4 font-normal text-gray-600">Fresher</span>
          </motion.h3>
          <motion.h3
            className="font-semibold text-lg text-purple-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
          >
            Salary:{" "}
            <span className="pl-4 font-normal text-gray-600">5 LPA</span>
          </motion.h3>
          <motion.h3
            className="font-semibold text-lg text-purple-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 0.8 }}
          >
            Total Applications:{" "}
            <span className="pl-4 font-normal text-gray-600">5</span>
          </motion.h3>
          <motion.h3
            className="font-semibold text-lg text-purple-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.4, duration: 0.8 }}
          >
            Posted Date:{" "}
            <span className="pl-4 font-normal text-gray-600">11-12-2024</span>
          </motion.h3>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default JobDescription;
