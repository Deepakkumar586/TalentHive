import React from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJob from "./AppliedJob";
import { motion } from "framer-motion";

const skills = ["HTML", "CSS", "JavaScript", "Java"];

const Profile = () => {
  const isResume = true;
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto mt-24 bg-white border border-gray-200 rounded-2xl my-10 p-8 shadow-lg">
        {/* Profile Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-4 items-center">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="profile-image"
              />
            </Avatar>
            <div>
              <h1 className="font-semibold text-2xl text-gray-800">Fullname</h1>
              <p className="text-sm text-gray-500">Add your bio here</p>
            </div>
          </div>
          <Button className="text-right" variant="outline" size="sm">
            <Pen size={16} />
          </Button>
        </div>

        {/* Contact Info */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-3 text-gray-700">
            <Mail size={18} />
            <span>patel@gmail.com</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <Contact size={18} />
            <span>+91 7896542364</span>
          </div>
        </div>

        {/* Skills Section */}
        <div className="space-y-4 mb-6">
          <h2 className="font-semibold text-lg text-gray-800">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.length ? (
              skills.map((skill, index) => (
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
        <div className="space-y-4 mb-6">
          <Label className="font-medium">Resume</Label>
          {isResume ? (
            <motion.a
              target="_blank"
              href="https://youtube.com"
              className="text-blue-500 hover:underline"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              View Resume
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
    </div>
  );
};

export default Profile;
