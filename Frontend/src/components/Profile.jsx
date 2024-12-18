import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJob from "./AppliedJob";
import { motion } from "framer-motion";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/customHooks/useGetAppliedJobs";

// Smooth animation variants
const fadeInVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.user);
  const [localUser, setLocalUser] = useState(user);

  useEffect(() => {
    setLocalUser(user); // Sync state with Redux
  }, [user]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      {/* Profile Container */}
      <motion.div
        className="max-w-7xl mx-auto mt-24 bg-white border border-gray-100 rounded-2xl my-10 p-6 sm:p-8 shadow-lg transition-shadow duration-500 hover:shadow-2xl"
        initial="hidden"
        animate="visible"
        variants={fadeInVariant}
      >
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-6">
          <div className="flex gap-4 items-center">
            <Avatar className="h-24 w-24 shadow-lg ring-2 ring-gray-200">
              <AvatarImage
                src={localUser?.profile?.profilePhoto}
                alt="profile-image"
              />
            </Avatar>
            <div>
              <h1 className="font-bold text-2xl text-gray-800">
                {localUser?.fullname || "User Name"}
              </h1>
              <p className="text-sm text-gray-500">
                {localUser?.profile?.bio || "No bio available"}
              </p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="text-right shadow-md hover:shadow-lg transition-transform hover:scale-105"
            variant="outline"
            size="sm"
          >
            <Pen size={16} />
            <span className="ml-2">Edit</span>
          </Button>
        </div>

        {/* Contact Info */}
        <div className="space-y-4 mb-6">
          <motion.div
            className="flex items-center gap-3 text-gray-700"
            whileHover={{ x: 5 }}
          >
            <Mail size={18} className="text-blue-500" />
            <span>{localUser?.email || "Not Provided"}</span>
          </motion.div>
          <motion.div
            className="flex items-center gap-3 text-gray-700"
            whileHover={{ x: 5 }}
          >
            <Contact size={18} className="text-green-500" />
            <span>+91 {localUser?.phonenumber || "Not Provided"}</span>
          </motion.div>
        </div>

        {/* Skills Section */}
        <div className="space-y-4 mb-6">
          <h2 className="font-semibold text-lg text-gray-800">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {localUser?.profile?.skills?.length ? (
              localUser?.profile?.skills.map((skill, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Badge className="text-sm font-medium bg-purple-500 shadow-md cursor-pointer hover:bg-purple-800 hover:text-white transition-all">
                    {skill}
                  </Badge>
                </motion.div>
              ))
            ) : (
              <span className="text-gray-500">No Skills Found</span>
            )}
          </div>
        </div>

        {/* Resume Section */}
        <div className="space-y-4 mb-6">
          <Label className="font-medium text-gray-800">Resume :</Label>
          {Boolean(localUser?.profile?.resume) ? (
            <motion.a
              target="_blank"
              href={localUser?.profile?.resume || "#"}
              className="text-blue-500 font-medium hover:underline hover:text-blue-600 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              {localUser?.profile?.resumeOriginalName || "Download Resume"}
            </motion.a>
          ) : (
            <span className="text-gray-500">No Resume Uploaded</span>
          )}
        </div>
      </motion.div>

      {/* Applied Jobs Section */}
      <motion.div
        className="max-w-4xl mx-auto bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all"
        initial="hidden"
        animate="visible"
        variants={fadeInVariant}
      >
        <h2 className="font-bold text-xl text-gray-800 mb-4">Applied Jobs</h2>
        <AppliedJob />
      </motion.div>

      {/* Update Profile Dialog */}
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
