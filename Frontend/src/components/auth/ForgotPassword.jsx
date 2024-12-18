import { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { setLoading } from "@/redux/userSlice";
import { motion } from "framer-motion";
import Footer from "../Footer";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.user);
  const [formData, setFormData] = useState({
    email: "",
  });

  // Handle Input Changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Forgot Password Handler
  const ForgotPasswordHandler = async (event) => {
    event.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        USER_API_END_POINT + "/forgotPassword",
        { email: formData.email },
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/ResetPassword");
      }
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message || "Forgot Password. Please try again."
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex mt-6 flex-grow items-center justify-center p-4">
        <motion.div
          className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 space-y-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-2xl font-bold text-center text-purple-700 mb-4">
            Forgot Password
          </h1>

          {/* Email Input */}
          <div>
            <Label className="block mb-2 text-gray-600">Email</Label>
            <Input
              type="email"
              placeholder="example@example.com"
              name="email"
              onChange={handleInputChange}
              value={formData.email}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none transition-all"
              required
            />
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
              onClick={ForgotPasswordHandler}
              className="w-full py-3 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600 transition-all"
            >
              Forgot Password
            </Button>
          )}

          {/* Sign Up Link */}
          <p className="text-center text-gray-600 mt-4">
            Dont't have an account?{" "}
            <Link
              to="/signup"
              className="text-purple-600 underline transition duration-300"
            >
              Sign Up
            </Link>
          </p>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
