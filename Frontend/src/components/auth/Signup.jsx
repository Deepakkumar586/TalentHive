import React, { useEffect, useState } from "react";
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
import { motion } from "framer-motion";
import Footer from "../Footer";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((store) => store.user.loading);
  const { user } = useSelector((state) => state.user);
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "",
    file: null,
  });

  const [showPassword, setShowPassword] = useState(false);

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
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message || "Signup successful!");
        navigate("/login");
      }
    } catch (err) {
      if (err.response) {
        console.error("Error Response:", err.response.data);
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

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <div className=" min-h-screen flex flex-col">
      <Navbar />
      <motion.div
        className="flex items-center justify-center mt-20 flex-grow"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <form
          onSubmit={signUpHandler}
          className="w-full max-w-md bg-white shadow-2xl mb-10 rounded-lg p-6 space-y-3"
        >
          <motion.h1
            className="font-bold text-2xl text-center text-purple-700"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Create Your Account
          </motion.h1>

          <div>
            <Label className="block mb-2 font-medium text-gray-700">
              Full Name
            </Label>
            <Input
              type="text"
              placeholder="Enter Your Full Name"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-600 focus:border-purple-600"
              required
            />
          </div>
          <div>
            <Label className="block mb-2 font-medium text-gray-700">
              Email
            </Label>
            <Input
              type="email"
              placeholder="abc@example.com"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-600 focus:border-purple-600"
              required
            />
          </div>
          <div className="relative">
            <Label className="block mb-2 font-medium text-gray-700">
              Password
            </Label>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-600 focus:border-purple-600"
              required
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[30px] z-[10] cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <Label className="block font-medium text-gray-700 mb-2">
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
                    className="cursor-pointer focus:ring-purple-600 text-purple-600"
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
                    className="cursor-pointer focus:ring-purple-600 text-purple-600"
                    required
                  />
                  <Label className="ml-2">Recruiter</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="block font-medium text-gray-700 mb-2">
                Profile Photo
              </Label>
              <Input
                accept="image/*"
                type="file"
                name="file"
                onChange={changeFileHandler}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-purple-600 focus:border-purple-600"
                required
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
              className="w-full py-2 text-white bg-purple-600 hover:bg-purple-700 transition duration-300 rounded-md"
            >
              Signup
            </Button>
          )}

          <p className="text-center text-gray-700 mt-4">
            Already Have an Account?{" "}
            <Link
              to="/login"
              className="text-purple-600 underline transition duration-300"
            >
              Login
            </Link>
          </p>
        </form>
      </motion.div>
      <Footer />
    </div>
  );
};

export default Signup;
