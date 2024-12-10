import React from "react";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";  // Import all icons

const Footer = () => {
  return (
    <motion.div
      className="bg-[#2D2D2D] text-white py-8 mt-20"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Footer Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-bold text-2xl text-[#8338ec]">JobPortal</h2>
            <p className="text-sm text-gray-400">
              Your gateway to the best job opportunities. We connect job seekers with recruiters.
            </p>
          </motion.div>

          {/* Links */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="hover:text-[#8338ec] transition-all duration-300">Home</a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#8338ec] transition-all duration-300">About</a>
              </li>
              <li>
                <a href="#jobs" className="hover:text-[#8338ec] transition-all duration-300">Jobs</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#8338ec] transition-all duration-300">Contact</a>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="font-semibold text-lg">Contact</h3>
            <p className="text-sm text-gray-400">Email: support@jobportal.com</p>
            <p className="text-sm text-gray-400">Phone: +1 234 567 890</p>
          </motion.div>

          {/* Social Media */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className="font-semibold text-lg">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                className="text-gray-400 hover:text-[#8338ec] transition-all duration-300"
              >
                <LucideIcons.Facebook size={24} />
              </a>
              <a
                href="https://twitter.com"
                className="text-gray-400 hover:text-[#8338ec] transition-all duration-300"
              >
                <LucideIcons.Twitter size={24} />
              </a>
              <a
                href="https://linkedin.com"
                className="text-gray-400 hover:text-[#8338ec] transition-all duration-300"
              >
                <LucideIcons.Linkedin size={24} />
              </a>
              <a
                href="https://github.com"
                className="text-gray-400 hover:text-[#8338ec] transition-all duration-300"
              >
                <LucideIcons.Github size={24} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Footer Bottom Section */}
        <div className="border-t border-gray-700 pt-6">
          <motion.p
            className="text-center text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            &copy; 2024 JobPortal. All Rights Reserved.
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

export default Footer;
