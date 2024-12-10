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
import { Loader2 } from "lucide-react";
import { setLoading } from "@/redux/userSlice";
import { motion } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.user);
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const changeEventHandler = (event) => {
    const { name, value } = event.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const loginHandler = async (event) => {
    event.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(USER_API_END_POINT + "/login", input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-grow items-center justify-center">
        <motion.div
          className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 space-y-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-bold text-2xl text-center text-gray-800 mb-4">
            Log In
          </h1>

          {/* Email Input */}
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

          {/* Password Input */}
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

          {/* Role Selection */}
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

          {/* Submit Button */}
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
              onClick={loginHandler}
              className="w-full py-2 text-white bg-gray-800 rounded-md"
            >
              Log In
            </Button>
          )}

          <p className="text-center text-gray-600 mt-4">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-[#8338ec] hover:underline transition duration-300"
            >
              Sign Up
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
