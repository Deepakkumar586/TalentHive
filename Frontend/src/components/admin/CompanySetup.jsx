import React, { useEffect, useState } from "react";
import { ArrowLeft, Loader2, Link, MapPin, FileText, User } from "lucide-react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyById from "@/customHooks/useGetCompanyById";
import Footer from "../Footer";

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const { singleCompany } = useSelector((store) => store.company);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // form submit
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);
      const res = await axios.patch(
        COMPANY_API_END_POINT + `/update/company/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res?.data?.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      toast.error("Error updating company details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      name: singleCompany?.name || "",
      description: singleCompany?.description || "",
      website: singleCompany?.website || "",
      location: singleCompany?.location || "",
      file: singleCompany?.file || null,
    });
  }, [singleCompany]);

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto my-10 mt-20  bg-white shadow-lg rounded-xl p-8 border border-purple-300">
        <div className="flex items-center gap-4 mb-6">
          <Button
            onClick={() => navigate("/admin/companies")}
            className="flex items-center gap-2 font-semibold text-purple-600"
            variant="outline"
          >
            <ArrowLeft />
            <span>Back</span>
          </Button>
          <h1 className="font-bold text-2xl text-purple-600">
            Company Details
          </h1>
        </div>
        <form onSubmit={submitHandler}>
          <div className="grid grid-cols-1 gap-4">
            <div className="relative">
              <Label className="font-semibold text-purple-600">
                Company Name
              </Label>
              <Input
                type="text"
                name="name"
                value={input.name}
                onChange={handleInputChange}
                placeholder="Company name"
                className="mt-2 p-3 rounded-md border border-purple-300 focus:ring-2 focus:ring-purple-400 pl-10"
              />
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500" />
            </div>
            <div className="relative">
              <Label className="font-semibold text-purple-600">
                Description
              </Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={handleInputChange}
                placeholder="Company description"
                className="mt-2 p-3 rounded-md border border-purple-300 focus:ring-2 focus:ring-purple-400 pl-10"
              />
              <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500" />
            </div>
            <div className="relative">
              <Label className="font-semibold text-purple-600">Website</Label>
              <Input
                type="text"
                name="website"
                value={input.website}
                onChange={handleInputChange}
                placeholder="Website URL"
                className="mt-2 p-3 rounded-md border border-purple-300 focus:ring-2 focus:ring-purple-400 pl-10"
              />
              <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500" />
            </div>
            <div className="relative">
              <Label className="font-semibold text-purple-600">Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={handleInputChange}
                placeholder="Company location"
                className="mt-2 p-3 rounded-md border border-purple-300 focus:ring-2 focus:ring-purple-400 pl-10"
              />
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500" />
            </div>
            <div className="relative">
              <Label className="font-semibold text-purple-600">Logo</Label>
              <input
                type="file"
                onChange={(e) =>
                  setInput({ ...input, file: e.target.files[0] })
                }
                className="mt-2 p-3 rounded-md border border-purple-300 focus:ring-2 focus:ring-purple-400"
              />
            </div>
          </div>
          {loading ? (
            <Button
              className="w-full py-2 text-white bg-purple-600 rounded-md disabled:opacity-50"
              disabled
            >
              <Loader2 className="m-2 h-4 w-4 animate-spin" />
              Loading...
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full py-2 text-white bg-purple-600 rounded-md mt-4 hover:bg-purple-700"
            >
              Update
            </Button>
          )}
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CompanySetup;
