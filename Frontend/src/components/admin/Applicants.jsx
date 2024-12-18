import { useEffect } from "react";
import Navbar from "../shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setApplicants } from "@/redux/applicationsSlice";
import Footer from "../Footer";
import "animate.css";

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
  }, [params.id, dispatch]);

  return (
    <div className="bg-purple-50 min-h-screen flex flex-col animate__animated animate__fadeIn animate__faster">
      <Navbar />
      <div className="max-w-7xl mx-auto mt-28 px-6 sm:px-8 lg:px-10 flex-1">
        <div className="bg-white shadow-xl rounded-lg p-6 mb-8 transform hover:scale-105 transition-transform duration-300">
          <h1 className="text-3xl font-bold text-purple-600 mb-6">
            Applicants ({applicants?.applications?.length})
          </h1>
          <ApplicantsTable />
        </div>
      </div>
      {/* Footer fixed at the bottom */}
      <Footer className="mt-auto bg-purple-600 text-white py-4" />
    </div>
  );
};

export default Applicants;
