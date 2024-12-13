import React from "react";
import { Badge } from "./ui/badge";
import { motion } from "framer-motion";

const LatestJobsCard = ({ job }) => {
  return (
    <motion.div
      className="p-6 rounded-lg shadow-lg bg-gradient-to-br from-purple-50 via-white to-purple-100 border border-gray-200 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Company Info */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-4"
      >
        <h1 className="font-semibold text-2xl text-gray-800 hover:text-purple-700 transition-all duration-300">
          {job?.company?.name}
        </h1>
        <p className="text-sm text-gray-500">{job?.location}</p>
      </motion.div>

      {/* Job Info */}
      <motion.div
        className="mt-4"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h1 className="font-bold text-xl text-gray-900 hover:text-purple-700 transition-all duration-300">
          {job?.title}
        </h1>
        <p className="text-sm text-gray-600 mt-2">{job?.description}</p>
      </motion.div>

      {/* Badges */}
      <motion.div
        className="flex items-center gap-3 mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Badge className="bg-gradient-to-r from-purple-500 to-purple-700 text-white font-bold px-3 py-1 rounded-full transition-all duration-300 hover:scale-110">
          {job?.position} Position
        </Badge>
        <Badge className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold px-3 py-1 rounded-full transition-all duration-300 hover:scale-110">
          {job?.jobType}
        </Badge>
        <Badge className="bg-gradient-to-r from-green-500 to-green-700 text-white font-bold px-3 py-1 rounded-full transition-all duration-300 hover:scale-110">
          slary : {job?.salary}
        </Badge>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        className="mt-6 flex justify-end"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        {/* <button className="bg-gradient-to-r from-purple-600 to-purple-800 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
          Apply Now
        </button> */}
      </motion.div>
    </motion.div>
  );
};

export default LatestJobsCard;
