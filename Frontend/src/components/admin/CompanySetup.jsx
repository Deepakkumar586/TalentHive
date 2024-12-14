// import React from 'react'

import { ArrowLeft, Loader2 } from "lucide-react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useState } from "react";
import { Input } from "../ui/input";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const CompanySetup = () => {
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  // form submit
  const submitHandler = async (e) => {
    e.preventDefault();
    // submit form to server
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
    } catch (e) {
      console.error(e);
      toast.error("Error updating company details");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto my-10 mt-28">
        <form onSubmit={submitHandler}>
          <div className="flex items-center gap-4 p-8">
            <Button
              onClick={() => navigate("/admin/companies")}
              className="flex items-center gap-2 font-semibold text-gray-500 "
              variant="outline"
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-xl">Company Details</h1>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>Company Name</Label>
              <Input
                type="text"
                name="name"
                value={input.name}
                onChange={handleInputChange}
                placeholder="company name"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={handleInputChange}
                placeholder="company name"
              />
            </div>
            <div>
              <Label>Website</Label>
              <Input
                type="text"
                name="website"
                value={input.website}
                onChange={handleInputChange}
                placeholder="company name"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={handleInputChange}
                placeholder="company name"
              />
            </div>
            <div>
              <Label>Logo</Label>
              <Input
                type="file"
                accept="image/*"
                name="file"
                // value={input.file}
                oonChange={changeFileHandler}
                placeholder="Logo here"
              />
            </div>
          </div>
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
              type="submit"
              // onClick={loginHandler}
              className="w-full py-2 text-white bg-gray-800 rounded-md"
            >
              Update
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
