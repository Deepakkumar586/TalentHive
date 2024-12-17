import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setStudentSearchJob } from "@/redux/JobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setStudentSearchJob(query));
    navigate(`/browse`);
  };
  return (
    <motion.div
      className="text-center mx-6 my-10 md:mx-20 lg:mx-32"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="flex p-12 flex-col gap-8 items-center">
        {/* Tagline */}
        <motion.span
          className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold shadow-lg"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2 }}
        >
          Your No. 1 Career Partner
        </motion.span>

        {/* Heading */}
        <motion.h1
          className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-800"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Unlock Opportunities, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500">
            Achieve Your Dream Career
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          className="text-lg md:text-xl text-gray-600 mt-4 px-4 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          Find the perfect job that aligns with your skills and aspirations.
          Explore thousands of opportunities, and take the next step towards a
          brighter future.
        </motion.p>

        {/* Search Bar */}
        <motion.div
          className="flex w-full max-w-lg shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto bg-white"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <input
            type="text"
            placeholder="Find your dream job"
            onChange={(e) => setQuery(e.target.value)}
            className="outline-none border-none w-full text-gray-700 px-2 py-3 rounded-l-full focus:ring-2 focus:ring-purple-500"
          />
          <Button
            onClick={searchJobHandler}
            className="rounded-r-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-3 flex items-center gap-2 hover:from-purple-700 hover:to-indigo-700 transition-all"
          >
            <Search className="h-5 w-5" />
            Search
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeroSection;
