import Navbar from "./shared/Navbar";
import Job from "./Job.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setStudentSearchJob } from "@/redux/JobSlice";
import useGetAllJobs from "@/customHooks/useGetAllJobs";

const Browse = () => {
  useGetAllJobs();
  const { alljobs } = useSelector((state) => state.alljobs);
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(setStudentSearchJob(""));
    };
  }, []);
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto m-20">
        <h1 className="text-3xl font-extrabold text-gray-600 mb-4">
          Search Results ({alljobs.length})
        </h1>
        <div className="grid grid-cols-3 gap-4 mt-5">
          {alljobs.map((job, index) => {
            return <Job job={job} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Browse;
