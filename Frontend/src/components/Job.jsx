import React from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();

  // Calculate days ago
  const daysAgo = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentDate = new Date();
    const timeDiff = currentDate - createdAt;
    const diffDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="p-6 rounded-lg shadow-md bg-white border border-gray-200 hover:shadow-lg transform hover:-translate-y-2 transition duration-300">
      <div className="flex items-center justify-between text-sm text-gray-400">
        <p>
          {daysAgo(job?.createdAt) === 0
            ? "Today"
            : `${daysAgo(job?.createdAt)} days ago`}
        </p>
      </div>
      <div className="flex items-center gap-4 my-4">
        <Avatar className="ring-2 ring-purple-200">
          <AvatarImage
            src={job?.company?.logo}
            alt={`${job?.company?.name} Logo`}
          />
        </Avatar>
        <div>
          <h1 className="font-semibold text-purple-600">
            {job?.company?.name}
          </h1>
          <p className="text-sm text-gray-500">{job?.location}</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg text-purple-800">{job?.title}</h1>
        <p className="text-sm text-gray-600 leading-relaxed mt-2">
          {job?.description}
        </p>
      </div>
      <div className="flex flex-wrap gap-2 mt-4">
        <Badge className="bg-purple-100 text-purple-800 px-3 py-1 rounded-md shadow-sm">
          Position: {job?.position}
        </Badge>
        <Badge className="bg-purple-100 text-purple-800 px-3 py-1 rounded-md shadow-sm">
          {job?.jobType}
        </Badge>
        <Badge className="bg-purple-100 text-purple-800 px-3 py-1 rounded-md shadow-sm">
          Salary: {job?.salary} LPA
        </Badge>
      </div>
      <div className="flex items-center justify-center  gap-4 mt-6">
        <Button
          variant="outline"
          className="border-purple-500 w-full text-purple-500 hover:bg-purple-100"
          onClick={() => navigate(`/description/${job?._id}`)}
        >
          Details
        </Button>
        {/* <Button className="bg-purple-500 text-white hover:bg-purple-600 shadow-sm">
          Save for Later
        </Button> */}
      </div>
    </div>
  );
};

export default Job;
