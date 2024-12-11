import React from "react";
import Navbar from "./shared/Navbar";
import Job from "./job";

const randomJobs = [1, 2, 3];
const Browse = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto m-20">
        <h1 className="text-3xl font-extrabold text-gray-600 mb-4">Search Results ({randomJobs.length})</h1>
        <div className="grid grid-cols-3 gap-4 mt-5">
          {randomJobs.map((job, item) => {
            return <Job />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Browse;
