import React from "react";
import { Badge } from "./ui/badge";
import { motion } from "framer-motion";

const LatestJobsCard = () => {
  return (
    <motion.div
      className="p-5 rounded-md shadow-lg bg-white border border-gray-100 cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Company Info */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h1 className="font-medium text-xl text-gray-800 hover:text-[#8338ec] transition-all duration-300">
          Company Name
        </h1>
        <p className="text-sm text-gray-500">India</p>
      </motion.div>

      {/* Job Info */}
      <motion.div
        className="mt-4"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h1 className="font-bold text-xl text-gray-900 hover:text-[#8338ec] transition-all duration-300">
          Job Title
        </h1>
        <p className="text-sm text-gray-600 mt-2">Job Description</p>
      </motion.div>

      {/* Badges */}
      <motion.div
        className="flex items-center gap-2 mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Badge className="text-purple-700 bg-white border border-purple-400 font-bold px-3 py-1 rounded-full transition-all duration-300 hover:bg-purple-500 hover:text-white">
          12 Positions
        </Badge>
        <Badge className="text-purple-700 bg-white border border-purple-400 font-bold px-3 py-1 rounded-full transition-all duration-300 hover:bg-purple-500 hover:text-white">
          Part Time
        </Badge>
        <Badge className="text-purple-700 bg-white border border-purple-400 font-bold px-3 py-1 rounded-full transition-all duration-300 hover:bg-purple-500 hover:text-white">
          2LPA
        </Badge>
      </motion.div>
    </motion.div>
  );
};

export default LatestJobsCard;
