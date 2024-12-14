import { useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import axios from "axios";
import {
  //   APPLICATION_API_END_POINT,
  COMPANY_API_END_POINT,
} from "@/utils/constant";
import { useState } from "react";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";
import { Loader2 } from "lucide-react";

const CreateCompany = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [company, setCompany] = useState({
    companyName: "",
    description: "",
    website: "",
    location: "",
  });

  // Create company API call
  const registerNewCompany = async () => {
    try {
      setLoading(true);
      console.log(
        "Making API request to:",
        COMPANY_API_END_POINT + "/register/company"
      );

      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register/company`,
        JSON.stringify(company),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res?.data?.message);
        const companyId = res?.data?.company._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.error("Error registering company:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to create company. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto mt-28">
        <div className="my-10">
          <h1 className="font-bold text-2xl">Your Company Name</h1>
          <p className="text-gray-500">
            What would you like to give your company name? You can change this
            later.
          </p>
        </div>

        <Label>Company Name</Label>
        <Input
          type="text"
          value={company.companyName}
          onChange={(e) =>
            setCompany({ ...company, companyName: e.target.value })
          }
          placeholder="Company Name"
        />

        <Label>Company Description</Label>
        <Input
          type="text"
          value={company.description}
          onChange={(e) =>
            setCompany({ ...company, description: e.target.value })
          }
          className="my-2"
          placeholder="Company description"
          required
        />

        <Label>Company Website</Label>
        <Input
          type="text"
          value={company.website}
          onChange={(e) => setCompany({ ...company, website: e.target.value })}
          className="my-2"
          placeholder="Company website"
          required
        />

        <Label>Company Location</Label>
        <Input
          type="text"
          value={company.location}
          onChange={(e) => setCompany({ ...company, location: e.target.value })}
          className="my-2"
          placeholder="Hyderabad, USA, New York"
          required
        />

        <div className="flex items-center gap-2 my-10">
          <Button
            variant="outline"
            onClick={() => navigate("/admin/companies")}
          >
            Cancel
          </Button>

          {loading ? (
            <Button
              className="w-full py-2 text-white bg-gray-800 rounded-md disabled:opacity-50"
              disabled
            >
              <Loader2 className="m-2 h-4 w-4 animate-spin" />
              Loading...
            </Button>
          ) : (
            <Button
              onClick={registerNewCompany}
              className="w-full py-2 text-white bg-gray-800 rounded-md"
            >
              Continue
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateCompany;

// export default CreateCompany;
