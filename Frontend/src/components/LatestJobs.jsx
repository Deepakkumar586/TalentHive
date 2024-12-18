import LatestJobsCard from "./LatestJobsCard";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const LatestJobs = () => {
  const { alljobs } = useSelector((store) => store.alljobs);

  return (
    <div className="max-w-7xl mx-auto my-20 px-4">
      <motion.h2
        className="text-4xl font-bold mb-10 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="text-[#8338ec]">Latest & Top </span>Jobs Opening
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Map through jobs and render LatestJobsCard */}
        {alljobs?.length <= 0 ? (
          <span>No Job Found</span>
        ) : (
          alljobs
            ?.slice(0, 6)
            .map((job, index) => <LatestJobsCard key={index} job={job} />)
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
