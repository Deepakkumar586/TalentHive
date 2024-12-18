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
          `${APPLICATION_API_END_POINT}/getApplicants/${params.id}`,
          { withCredentials: true }
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
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="bg-white shadow-lg mt-16 rounded-lg p-6">
          <h1 className="text-3xl font-semibold text-purple-700 mb-6 text-center md:text-left">
            Applicants ({applicants?.applications?.length || 0})
          </h1>
          <div className="overflow-x-auto">
            <ApplicantsTable />
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer className="bg-purple-600 text-white py-4 mt-auto" />
    </div>
  );
};

export default Applicants;
