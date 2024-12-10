import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/userSlice";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((store) => store.user.loading);
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "",
    file: null,
  });

  const changeEventHandler = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const changeFileHandler = (event) => {
    setInput({ ...input, file: event.target.files[0] });
  };

  /* signUp Handler*/
  const signUpHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(USER_API_END_POINT + "/signup", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true, // Include cookies for authentication if needed
      });

      if (res.data.success) {
        toast.success(res.data.message || "Signup successful!");
        navigate("/login");
      }
    } catch (err) {
      if (err.response) {
        console.error("Error Response:", err.response.data); // Debugging
        toast.error(
          err.response.data.message || "Signup failed. Please try again."
        );
      } else {
        console.error("Error:", err.message);
        toast.error("Network error. Please check your connection.");
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={signUpHandler}
          className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 my-10 space-y-3"
        >
          <h1 className="font-bold text-2xl text-center text-gray-800 mb-4">
            Create Your Account
          </h1>
          <div>
            <Label className="block mb-2 font-medium text-gray-600">
              Full Name
            </Label>
            <Input
              type="text"
              placeholder="Enter Your Full Name"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#8338ec] focus:border-[#8338ec]"
              required
            />
          </div>
          <div>
            <Label className="block mb-2 font-medium text-gray-600">
              Email
            </Label>
            <Input
              type="email"
              placeholder="abc@example.com"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#8338ec] focus:border-[#8338ec]"
              required
            />
          </div>
          <div>
            <Label className="block mb-2 font-medium text-gray-600">
              Password
            </Label>
            <Input
              type="password"
              placeholder="Password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#8338ec] focus:border-[#8338ec]"
              required
            />
          </div>

          <div className="space-y-4">
            <div>
              <Label className="block font-medium text-gray-600 mb-2">
                Select Role
              </Label>
              <RadioGroup className="flex items-center space-x-6">
                <div className="flex items-center">
                  <Input
                    type="radio"
                    name="role"
                    value="student"
                    checked={input.role === "student"}
                    onChange={changeEventHandler}
                    className="cursor-pointer focus:ring-[#8338ec] text-[#8338ec]"
                    required
                  />
                  <Label className="ml-2">Student</Label>
                </div>
                <div className="flex items-center">
                  <Input
                    type="radio"
                    name="role"
                    value="recruiter"
                    checked={input.role === "recruiter"}
                    onChange={changeEventHandler}
                    className="cursor-pointer focus:ring-[#8338ec] text-[#8338ec]"
                    required
                  />
                  <Label className="ml-2">Recruiter</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="block font-medium text-gray-600 mb-2">
                Profile Photo
              </Label>
              <Input
                accept="image/*"
                type="file"
                name="file"
                onChange={changeFileHandler}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-[#8338ec] focus:border-[#8338ec]"
                required
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
              className="w-full py-2 text-white bg-gray-800 rounded-md"
            >
              Signup
            </Button>
          )}
          <p className="text-center text-gray-600 mt-4">
            Already Have an Account?{" "}
            <Link
              to="/login"
              className="text-[#8338ec] hover:underline transition duration-300"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
