import { useEffect, useState } from "react";
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
import { setLoading, setUser } from "@/redux/userSlice";
import { motion } from "framer-motion";

const Login = () => {
  const { user } = useSelector((state) => state.user);
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

  // Login Handler
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
        dispatch(setUser(res.data.user));
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

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-100 flex flex-col">
      <Navbar />
      <div className="flex flex-grow items-center justify-center p-4">
        <motion.div
          className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 space-y-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-2xl font-bold text-center text-purple-700 mb-4">
            Log In
          </h1>

          {/* Email Input */}
          <div>
            <Label className="block mb-2 text-gray-600">Email</Label>
            <Input
              type="email"
              placeholder="example@example.com"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none transition-all"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <Label className="block mb-2 text-gray-600">Password</Label>
            <Input
              type="password"
              placeholder="Your password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none transition-all"
              required
            />
          </div>

          {/* Role Selection */}
          <div>
            <Label className="block mb-2 text-gray-600">Select Role</Label>
            <RadioGroup className="flex items-center space-x-6">
              <div className="flex items-center">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="focus:ring-blue-400 text-blue-500"
                  required
                />
                <Label className="ml-2 text-gray-600">Student</Label>
              </div>
              <div className="flex items-center">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="focus:ring-blue-400 text-blue-500"
                  required
                />
                <Label className="ml-2 text-gray-600">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Submit Button */}
          {loading ? (
            <Button
              className="w-full py-3 bg-blue-400 text-white rounded-lg disabled:opacity-50"
              disabled
            >
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Loading...
            </Button>
          ) : (
            <Button
              type="submit"
              onClick={loginHandler}
              className="w-full py-3 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600 transition-all"
            >
              Log In
            </Button>
          )}

          {/* Sign Up Link */}
          <p className="text-center text-gray-600 mt-4">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-500 hover:underline transition duration-300"
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
