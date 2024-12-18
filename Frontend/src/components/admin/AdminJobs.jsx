import { useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/customHooks/useGetAllAdminJobs";
import { setSearchJobByText } from "@/redux/JobSlice";
import Footer from "../Footer";

const AdminJobs = () => {
  useGetAllAdminJobs();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(searchTerm));
  }, [searchTerm, dispatch]);

  return (
    <div className="bg-purple-50 min-h-screen font-sans">
      <Navbar />
      <div className="max-w-7xl mx-auto my-10 mt-28 px-4 sm:px-6 lg:px-8">
        {/* Search Section */}
        <div className="flex items-center justify-between my-8 space-x-4">
          <Input
            className="w-full sm:w-2/3 lg:w-1/2 p-4 rounded-lg border border-purple-300 focus:ring-2 focus:ring-purple-500 shadow-md transition-all"
            placeholder="Filter by name, role"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            onClick={() => navigate("/admin/create/jobs")}
            className="bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 px-6 py-3 rounded-lg shadow-md transition-all"
          >
            Post New Jobs
          </Button>
        </div>

        {/* Companies Table */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <AdminJobsTable />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminJobs;
