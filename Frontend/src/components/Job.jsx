// import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();

  // calculate dat
  const daysAgo = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentDate = new Date();
    const timeDiff = currentDate - createdAt;
    const diffDays = Math.floor(timeDiff / (1000 * 24 * 60 * 60));
    return diffDays;
  };
  return (
    <div className="p-6 rounded-lg shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 border border-gray-300 hover:shadow-2xl transition-transform transform hover:-translate-y-3 hover:scale-105 duration-300">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-400">
          {" "}
          {daysAgo(job?.createdAt) === 0
            ? "Today"
            : `${daysAgo(job?.createdAt)} days ago`}
        </p>
        <Button
          variant="outline"
          className="rounded-full hover:bg-purple-100"
          size="icon"
        >
          <Bookmark className="text-purple-500" />
        </Button>
      </div>
      <div className="flex items-center gap-3 my-4">
        <Avatar className="ring-2 ring-purple-200">
          <AvatarImage src={job?.company?.logo} />
        </Avatar>
        <div>
          <h1 className="font-semibold text-purple-600">
            {job?.company?.name}
          </h1>
          <p className="text-sm text-gray-600">{job?.location}</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2 text-purple-800">{job?.title}</h1>
        <p className="text-sm text-gray-600 leading-relaxed">
          {job?.description}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <Badge className="bg-gradient-to-r from-purple-200 to-purple-300 text-purple-800 font-bold px-3 py-1 rounded-full shadow-md hover:bg-gradient-to-r hover:from-purple-300 hover:to-purple-400 hover:text-purple-900 transition-all duration-300">
          Position : {job?.position}
        </Badge>
        <Badge className="bg-gradient-to-r from-purple-200 to-purple-300 text-purple-800 font-bold px-3 py-1 rounded-full shadow-md hover:bg-gradient-to-r hover:from-purple-300 hover:to-purple-400 hover:text-purple-900 transition-all duration-300">
          {job?.jobType}
        </Badge>
        <Badge className="bg-gradient-to-r from-purple-200 to-purple-300 text-purple-800 font-bold px-3 py-1 rounded-full shadow-md hover:bg-gradient-to-r hover:from-purple-300 hover:to-purple-400 hover:text-purple-900 transition-all duration-300">
          Salary : {job?.salary} LPA
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-6">
        <Button
          variant="outline"
          className="border-purple-500 text-purple-500 hover:bg-purple-100 hover:border-purple-600 hover:text-purple-600"
          onClick={() => navigate(`/description/${job?._id}`)}
        >
          Details
        </Button>
        <Button className="bg-gradient-to-r from-purple-500 to-purple-700 text-white hover:from-purple-700 hover:to-purple-900 shadow-md">
          Save for Later
        </Button>
      </div>
    </div>
  );
};

export default Job;
