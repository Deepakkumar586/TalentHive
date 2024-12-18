import { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { setLoading } from "@/redux/userSlice";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.user);

  // State to handle form input
  const [input, setInput] = useState({
    email: "",
    newPassword: "",
    confirmNewPassword: "",
    otp: "",
  });

  // Handle input changes
  const changeEventHandler = (event) => {
    const { name, value } = event.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  // Reset Password Handler
  const ResetPasswordHandler = async (event) => {
    event.preventDefault();

    // Simple validation checks
    if (
      !input.email ||
      !input.newPassword ||
      !input.confirmNewPassword ||
      !input.otp
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (input.newPassword !== input.confirmNewPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        `${USER_API_END_POINT}/resetPassword`,
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message ||
          "Reset Password failed. Please try again."
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-grow items-center justify-center p-4">
        <motion.div
          className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 space-y-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-2xl font-bold text-center text-purple-700 mb-4">
            Reset Password
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

          {/* OTP Input */}
          <div>
            <Label className="block mb-2 text-gray-600">OTP</Label>
            <Input
              type="number"
              name="otp"
              value={input.otp}
              onChange={changeEventHandler}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none transition-all"
              required
            />
          </div>

          {/* New Password Input */}
          <div>
            <Label className="block mb-2 text-gray-600">New Password</Label>
            <Input
              type="password"
              placeholder="Your New password"
              name="newPassword"
              value={input.newPassword}
              onChange={changeEventHandler}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none transition-all"
              required
            />
          </div>

          {/* Confirm New Password Input */}
          <div>
            <Label className="block mb-2 text-gray-600">
              Confirm New Password
            </Label>
            <Input
              type="password"
              placeholder="Confirm new password"
              name="confirmNewPassword"
              value={input.confirmNewPassword}
              onChange={changeEventHandler}
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
              onClick={ResetPasswordHandler}
              className="w-full py-3 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600 transition-all"
            >
              Reset Password
            </Button>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ResetPassword;
