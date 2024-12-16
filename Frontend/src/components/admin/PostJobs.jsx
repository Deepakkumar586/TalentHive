import { useState } from "react";
import Navbar from "../shared/Navbar";
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
import { Loader2 } from "lucide-react";

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

  // Handle Input Change
  const changeEventHandler = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  // Handle Select Input
  const handleSelectChange = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value.toLowerCase()
    );
    setInput({ ...input, companyId: selectedCompany?._id });
  };

  // Form Submit Handler
  const submitHandler = async (e) => {
    e.preventDefault(); // Prevent default behavior
    try {
      setLoading(true);

      const res = await axios.post(JOB_API_END_POINT + "/create/job", input, {
        headers: {
          "Content-Type": "application/json",
        },
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
    <div>
      <Navbar />
      <div className="flex justify-center items-center w-screen mt-28">
        <form
          onSubmit={submitHandler}
          className="p-8 max-w-4xl border-gray-200 shadow-lg rounded-md"
        >
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Requirements</Label>
              <Input
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Salary</Label>
              <Input
                type="number"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Job Type</Label>
              <Input
                type="text"
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Experience</Label>
              <Input
                type="text"
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Position</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>

            {companies.length > 0 ? (
              <div>
                <Label>Select Company</Label>
                <Select onValueChange={handleSelectChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a Company" />
                  </SelectTrigger>
                  <SelectContent>
                    {companies.map((company) => (
                      <SelectItem key={company._id} value={company.name}>
                        {company?.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ) : (
              <p className="text-xs text-red-600 text-center my-3 font-bold col-span-2">
                * Please Register a Company first, before posting a job
              </p>
            )}
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
              className="w-full mt-4 py-2 text-white bg-gray-800 rounded-md"
            >
              Post a New Job
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJobs;