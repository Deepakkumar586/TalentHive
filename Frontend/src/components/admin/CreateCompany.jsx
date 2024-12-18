import { useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useState } from "react";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";
import { Loader2 } from "lucide-react";
import Footer from "../Footer";
import { Briefcase, MapPin, Link } from "lucide-react";

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
    <div className=" min-h-screen">
      <Navbar />
      <div className="flex justify-center items-center mt-14 py-6">
        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-screen-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl overflow-auto">
          <h1 className="text-3xl font-bold text-center text-purple-600 mb-6">
            Create Your Company
          </h1>

          <div className="space-y-6">
            <div>
              <Label className="font-semibold flex items-center gap-2 text-purple-600">
                <Briefcase size={20} className="text-purple-600" /> Company Name
              </Label>
              <Input
                type="text"
                value={company.companyName}
                onChange={(e) =>
                  setCompany({ ...company, companyName: e.target.value })
                }
                placeholder="e.g., ABC Corp"
                className="mt-1 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-300 w-full"
              />
            </div>

            <div>
              <Label className="font-semibold flex items-center gap-2 text-purple-600">
                <Briefcase size={20} className="text-purple-600" /> Company Description
              </Label>
              <Input
                type="text"
                value={company.description}
                onChange={(e) =>
                  setCompany({ ...company, description: e.target.value })
                }
                placeholder="Describe your company"
                className="mt-1 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-300 w-full"
                required
              />
            </div>

            <div>
              <Label className="font-semibold flex items-center gap-2 text-purple-600">
                <Link size={20} className="text-purple-600" /> Company Website
              </Label>
              <Input
                type="text"
                value={company.website}
                onChange={(e) =>
                  setCompany({ ...company, website: e.target.value })
                }
                placeholder="e.g., https://www.company.com"
                className="mt-1 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-300 w-full"
                required
              />
            </div>

            <div>
              <Label className="font-semibold flex items-center gap-2 text-purple-600">
                <MapPin size={20} className="text-purple-600" /> Company Location
              </Label>
              <Input
                type="text"
                value={company.location}
                onChange={(e) =>
                  setCompany({ ...company, location: e.target.value })
                }
                placeholder="e.g., New York, USA"
                className="mt-1 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-300 w-full"
                required
              />
            </div>

            <div className="flex items-center gap-4 mt-6">
              <Button
                variant="outline"
                onClick={() => navigate("/admin/companies")}
                className="w-full py-3 rounded-md text-purple-600 border border-purple-600 hover:bg-purple-100"
              >
                Cancel
              </Button>

              {loading ? (
                <Button
                  className="w-full py-3 text-white bg-purple-600 rounded-md disabled:opacity-50"
                  disabled
                >
                  <Loader2 className="m-2 h-4 w-4 animate-spin" />
                  Loading...
                </Button>
              ) : (
                <Button
                  onClick={registerNewCompany}
                  className="w-full py-3 text-white bg-purple-600 rounded-md hover:bg-purple-700"
                >
                  Continue
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreateCompany;
