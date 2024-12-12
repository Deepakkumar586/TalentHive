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
import { use } from "react";

// const skills = ["HTML", "CSS", "JavaScript", "Java"];

const Profile = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.user);
  const [localUser, setLocalUser] = useState(user);
  console.log("user", user);

  useEffect(() => {
    setLocalUser(user); // Update local state when Redux state updates
  }, [user]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto mt-24 bg-white border border-gray-200 rounded-2xl my-10 p-8 shadow-lg">
        {/* Profile Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-4 items-center">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src={localUser?.profile?.profilePhoto}
                alt="profile-image"
              />
            </Avatar>
            <div>
              <h1 className="font-semibold text-2xl text-gray-800">
                {localUser?.fullname}
              </h1>
              <p className="text-sm text-gray-500">{localUser?.profile?.bio}</p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="text-right"
            variant="outline"
            size="sm"
          >
            <Pen size={16} />
          </Button>
        </div>

        {/* Contact Info */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-3 text-gray-700">
            <Mail size={18} />
            <span>{localUser?.email}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <Contact size={18} />
            <span>+91 {localUser?.phonenumber}</span>
          </div>
        </div>

        {/* Skills Section */}
        <div className="space-y-4 mb-6">
          <h2 className="font-semibold text-lg text-gray-800">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {localUser?.profile?.skills?.length ? (
              localUser?.profile?.skills.map((skill, index) => (
                <Badge key={index} className="text-sm font-medium">
                  {skill}
                </Badge>
              ))
            ) : (
              <span className="text-gray-500">No Skills Found</span>
            )}
          </div>
        </div>

        {/* Resume Section */}
        {/* Resume Section */}
        <div className="space-y-4 mb-6">
          <Label className="font-medium">Resume : </Label>
          {Boolean(localUser?.profile?.resume) ? (
            <motion.a
              target="_blank"
              href={localUser?.profile?.resume || "#"}
              className={`text-blue-500 hover:underline ${
                localUser?.profile?.resume
                  ? ""
                  : "pointer-events-none text-gray-500"
              }`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {localUser?.profile?.resumeOriginalName || "Resume not available"}
            </motion.a>
          ) : (
            <span className="text-gray-500">No Resume Uploaded</span>
          )}
        </div>
      </div>

      {/* Applied Jobs Section */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 shadow-lg">
        <h2 className="font-bold text-xl text-gray-800 mb-4">Applied Jobs</h2>
        <AppliedJob />
      </div>

      {/* update profile dialog */}
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
