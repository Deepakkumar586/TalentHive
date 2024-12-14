import { useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import CompaniesTable from "./CompaniesTable";

const Companies = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar />
      <div className="  max-w-6xl mx-auto my-10 mt-28">
        <div className="flex items-center justify-between my-8">
          <Input className="w-fit" placeholder="Filter by Name" />
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
