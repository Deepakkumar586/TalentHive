import { useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import CompaniesTable from "./CompaniesTable";
import useGetAllCompanies from "@/customHooks/useGetAllCompanies";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchCompany } from "@/redux/companySlice";

const Companies = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  useGetAllCompanies();

  useEffect(() => {
    dispatch(setSearchCompany(searchTerm));
  }, [searchTerm, dispatch]);
  return (
    <div>
      <Navbar />
      <div className="  max-w-6xl mx-auto my-10 mt-28">
        <div className="flex items-center justify-between my-8">
          <Input
            className="w-fit"
            placeholder="Filter by Name"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button onClick={() => navigate("/admin/companies/create")}>
            New Company
          </Button>
        </div>

        {/* companies table for check which companies have register */}
        <CompaniesTable />
      </div>
    </div>
  );
};

export default Companies;