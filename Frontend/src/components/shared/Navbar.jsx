import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, Menu, User2, X } from "lucide-react";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const user = false;

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

        {/* Hamburger Menu (Mobile) */}
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
          {/* Navigation Menu */}
          <ul className="flex flex-col lg:flex-row font-medium items-center gap-6 lg:gap-8">
            <li className="hover:text-[#8338ec] transition-colors duration-300">
              <Link to="/">Home</Link>
            </li>
            <li className="hover:text-[#8338ec] transition-colors duration-300">
              <Link to="/jobs">Jobs</Link>
            </li>
            <li className="hover:text-[#8338ec] transition-colors duration-300">
              <Link to="/browse">Browse</Link>
            </li>
          </ul>

          {/* Login/Signup or User Profile */}
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
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="transition-transform duration-300 hover:scale-110">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                    className="transition-all duration-300"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-64 opacity-0 scale-95 transition-all duration-300 ease-in-out transform group-hover:opacity-100 group-hover:scale-100">
                <div className="flex gap-4 space-y-2">
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">Kumar</h4>
                    <p className="text-sm text-muted-foreground">
                      Welcome back! Explore more jobs today.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col text-gray-600">
                  <div className="flex w-fit items-center gap-2 cursor-pointer hover:text-[#8338ec] transition-colors duration-300">
                    <User2 size={20} />
                    <Button variant="link">View Profile</Button>
                  </div>
                </div>
                <div className="flex w-fit items-center gap-2 cursor-pointer hover:text-[#8338ec] transition-colors duration-300">
                  <LogOut size={20} />
                  <Button variant="link">Logout</Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
