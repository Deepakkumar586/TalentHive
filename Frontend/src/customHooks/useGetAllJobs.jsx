import { setAllJobs } from "@/redux/JobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const response = await axios.get(
          JOB_API_END_POINT + "/student/get/alljob",
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
