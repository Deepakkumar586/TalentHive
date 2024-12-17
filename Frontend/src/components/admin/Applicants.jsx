import { useEffect } from "react";
import Navbar from "../shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setApplicants } from "@/redux/applicationsSlice";

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((state) => state.application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          APPLICATION_API_END_POINT + `/getApplicants/${params.id}`,
          {
            withCredentials: true,
          }
        );
        dispatch(setApplicants(res.data.applications));
      } catch (err) {
        toast.error("Failed to fetch applicants");
        console.error(err);
      }
    };
    fetchAllApplicants();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-28">
        <h1 className="font-bold text-xl my-5">
          Applicants {applicants?.applications?.length}
        </h1>
        <ApplicantsTable />
      </div>
    </div>
  );
};

export default Applicants;