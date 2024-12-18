import { setAllJobs } from "@/redux/JobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const { studentSearchJob } = useSelector((state) => state.alljobs);
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const response = await axios.get(
          JOB_API_END_POINT + `/student/get/alljob?keyword=${studentSearchJob}`,
          { withCredentials: true }
        );
        if (response.data.success) {
          dispatch(setAllJobs(response.data.jobs));
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchAllJobs();
  }, []);
  return <div></div>;
};

export default useGetAllJobs;
