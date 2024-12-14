import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, Menu, User2, X } from "lucide-react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/userSlice";

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const togglePopover = () => {
    setPopoverOpen(!isPopoverOpen);
  };

  const logOutHandler = async () => {
    try {
      const res = await axios.post(USER_API_END_POINT + "/logout", {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message);
    }
  };

  return (
    <motion.div
      className="bg-white shadow-lg fixed top-0 left-0 w-full z-50"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-6">
        {/* Logo */}
        <div className="cursor-pointer">
          <h1 className="text-2xl font-bold text-[#8338ec] hover:text-[#3f0294] transition-colors duration-300">
            Job<span className="text-[#8338ec]">Portal</span>
          </h1>
        </div>

        {/* Hamburger Menu */}
        <div className="lg:hidden">
          <button
            onClick={() => setMenuOpen(!isMenuOpen)}
            className="text-gray-800 focus:outline-none"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Right Section */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } lg:flex flex-col lg:flex-row items-center gap-8 lg:gap-10 lg:static absolute top-16 left-0 w-full bg-white lg:bg-transparent lg:w-auto lg:p-0 p-6 shadow-lg lg:shadow-none`}
        >
          <ul className="flex flex-col lg:flex-row font-medium items-center gap-6 lg:gap-8">
            {user && user.role === "recruiter" ? (
              <>
                <li className="hover:text-[#8338ec] transition-colors duration-300">
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li className="hover:text-[#8338ec] transition-colors duration-300">
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li className="hover:text-[#8338ec] transition-colors duration-300">
                  <Link to="/">Home</Link>
                </li>
                <li className="hover:text-[#8338ec] transition-colors duration-300">
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li className="hover:text-[#8338ec] transition-colors duration-300">
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
          </ul>

          {!user ? (
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button
                  variant="outline"
                  className="transition-all duration-300 hover:bg-[#8338ec] hover:text-white"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#8338ec] hover:bg-[#3f0294] transition-all duration-300">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <div className="relative">
              {/* Avatar */}
              <Avatar
                className="transition-transform duration-300 hover:scale-110 cursor-pointer"
                onClick={togglePopover}
              >
                <AvatarImage
                  src={
                    user?.profile?.profilePhoto ||
                    "https://via.placeholder.com/150"
                  }
                  alt="User Avatar"
                />
              </Avatar>

              {/* Popover */}
              {isPopoverOpen && (
                <motion.div
                  className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg z-50 p-4"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex gap-4 space-y-2">
                    <Avatar>
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        alt="User Avatar"
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{user?.fullname}</h4>
                      {user && user.role === "student" && (
                        <p className="text-sm text-muted-foreground">
                          {user?.profile?.bio}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col text-gray-600">
                    {user && user.role === "student" && (
                      <div className="flex w-fit items-center gap-2 cursor-pointer hover:text-[#8338ec] transition-colors duration-300">
                        <User2 size={20} />

                        <Button variant="link">
                          <Link to="/profile">View Profile</Link>
                        </Button>
                      </div>
                    )}
                  </div>
                  <div className="flex w-fit items-center gap-2 cursor-pointer hover:text-[#8338ec] transition-colors duration-300">
                    <LogOut size={20} />
                    <Button onClick={logOutHandler} variant="link">
                      Logout
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
