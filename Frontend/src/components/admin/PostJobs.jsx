import { useState } from "react";
import Navbar from "../shared/Navbar";
import Footer from "../Footer";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2, Briefcase, MapPin, DollarSign, Users } from "lucide-react";

const PostJobs = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    location: "",
    requirements: "",
    salary: 0,
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });

  const { companies } = useSelector((state) => state.company);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const handleSelectChange = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value.toLowerCase()
    );
    setInput({ ...input, companyId: selectedCompany?._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const res = await axios.post(JOB_API_END_POINT + "/create/job", input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      toast.success(res.data.message);
      navigate("/admin/jobs");
    } catch (error) {
      console.error(error);
      toast.error("Failed to post job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Navbar />
      <div className="flex justify-center items-center mt-14 mb-10 py-7 flex-grow">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-xl bg-white shadow-lg rounded-xl p-6 space-y-4"
          style={{
            boxShadow: "0px 4px 10px rgba(128, 0, 128, 0.3)",
          }}
        >
          <h2 className="text-3xl font-bold text-center text-purple-600 mb-6">
            Post a New Job
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Title */}
            <div>
              <Label className="font-semibold flex items-center gap-2">
                <Briefcase size={18} className="text-purple-600" /> Job Title
              </Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                placeholder="e.g., Software Developer"
                className="mt-1 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-300"
              />
            </div>

            {/* Location */}
            <div>
              <Label className="font-semibold flex items-center gap-2">
                <MapPin size={18} className="text-purple-600" /> Location
              </Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                placeholder="e.g., New York, Remote"
                className="mt-1 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-300"
              />
            </div>

            {/* Salary */}
            <div>
              <Label className="font-semibold flex items-center gap-2">
                <DollarSign size={18} className="text-purple-600" /> Salary ($)
              </Label>
              <Input
                type="number"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                placeholder="e.g., 80000"
                className="mt-1 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-300"
              />
            </div>

            {/* Position */}
            <div>
              <Label className="font-semibold flex items-center gap-2">
                <Users size={18} className="text-purple-600" /> Positions Available
              </Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                placeholder="e.g., 5"
                className="mt-1 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-300"
              />
            </div>

            {/* Job Type */}
            <div>
              <Label className="font-semibold flex items-center gap-2">
                <Briefcase size={18} className="text-purple-600" /> Job Type
              </Label>
              <Input
                type="text"
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
                placeholder="e.g., Full-Time"
                className="mt-1 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-300"
              />
            </div>

            {/* Experience */}
            <div>
              <Label className="font-semibold flex items-center gap-2">
                <Briefcase size={18} className="text-purple-600" /> Experience
              </Label>
              <Input
                type="text"
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
                placeholder="e.g., 2+ years"
                className="mt-1 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-300"
              />
            </div>

            {/* Requirements */}
            <div className="col-span-1 sm:col-span-2">
              <Label className="font-semibold flex items-center gap-2">
                <Briefcase size={18} className="text-purple-600" /> Job Requirements
              </Label>
              <Input
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
                placeholder="e.g., React, Node.js, SQL"
                className="mt-1 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-300"
              />
            </div>

            {/* Company Select */}
            <div className="col-span-1 sm:col-span-2">
              <Label className="font-semibold flex items-center gap-2">
                <Briefcase size={18} className="text-purple-600" /> Company
              </Label>
              {companies.length > 0 ? (
                <Select onValueChange={handleSelectChange}>
                  <SelectTrigger className="mt-1 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-300">
                    <SelectValue placeholder="Select a Company" />
                  </SelectTrigger>
                  <SelectContent>
                    {companies.map((company) => (
                      <SelectItem key={company._id} value={company.name}>
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-red-600 text-sm mt-2">
                  * Register a company first to post jobs.
                </p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className={`w-full py-3 mt-6 rounded-lg font-semibold text-white transition-all ${
              loading
                ? "bg-gray-400"
                : "bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-300"
            }`}
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              "Post Job"
            )}
          </Button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default PostJobs;
