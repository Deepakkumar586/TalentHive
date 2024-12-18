import { useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import CompaniesTable from "./CompaniesTable";
import useGetAllCompanies from "@/customHooks/useGetAllCompanies";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchCompany } from "@/redux/companySlice";
import { motion } from "framer-motion";
import Footer from "../Footer";

const Companies = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  useGetAllCompanies();

  useEffect(() => {
    dispatch(setSearchCompany(searchTerm));
  }, [searchTerm, dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Header and Search */}
      <motion.div
        className="max-w-7xl mx-auto mt-20 px-6 py-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-between mb-8 space-y-4 sm:space-y-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-purple-700 mb-2">
              Registered Companies
            </h1>
            <p className="text-gray-500">
              View and manage all registered companies here.
            </p>
          </div>
          <div className="flex items-center w-full sm:w-auto space-x-4">
            <Input
              className="w-full sm:w-64 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 transition-all"
              placeholder="Filter by Company Name"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button
              onClick={() => navigate("/admin/companies/create")}
              className="bg-purple-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-purple-600 transition-all transform hover:scale-105"
            >
              + New Company
            </Button>
          </div>
        </motion.div>

        {/* Table */}
        <motion.div
          className="bg-white shadow-xl rounded-lg overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <CompaniesTable />
        </motion.div>
      </motion.div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Companies;
