import Navbar from "./shared/Navbar";
import Job from "./Job.jsx";
import Footer from "./Footer";
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
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-700 mb-6 text-center">
            Search Results ({alljobs.length})
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {alljobs.map((job, index) => (
              <Job job={job} key={index} />
            ))}
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  );
};

export default Browse;
