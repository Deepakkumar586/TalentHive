import { setAppliedJobs } from "@/redux/JobSlice";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAppliedJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const res = await axios.get(
          APPLICATION_API_END_POINT + "/getAllApplications",
          {
            withCredentials: true,
          }
        );

        if (res.data.success) {
          dispatch(setAppliedJobs(res.data.applications));
        }
      } catch (err) {
        console.log("Error fetching applied jobs: ", err);
      }
    };

    fetchAppliedJobs();
  }, []);
  return <div></div>;
};

export default useGetAppliedJobs;
