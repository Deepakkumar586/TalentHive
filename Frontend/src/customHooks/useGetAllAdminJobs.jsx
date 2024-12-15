import { setAllAdminJobs } from "@/redux/JobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        const response = await axios.get(
          JOB_API_END_POINT + "/admin/get/alljob",
          { withCredentials: true }
        );
        if (response.data.success) {
          dispatch(setAllAdminJobs(response.data.jobs));
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchAllAdminJobs();
  }, []);
  return <div></div>;
};

export default useGetAllAdminJobs;
