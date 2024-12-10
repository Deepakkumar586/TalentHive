import React from "react";
import Navbar from "./shared/Navbar";
import FilterJobs from "./FilterJobs";
import Job from "./job";

const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];
const Jobs = () => {
  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto mt-20">
        <div className="flex gap-5">
          {/* Filter page  */}
          <div className="w-20%">
            <FilterJobs />
          </div>
          {/* JobCard */}
          {jobsArray.length <= 0 ? (
            <span>job not found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid  grid-cols-3 gap-4">
                {jobsArray.map((job, index) => (
                  <div>
                  {/* ye div framer motion ke liye hai  */}
                    <Job key={index} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
