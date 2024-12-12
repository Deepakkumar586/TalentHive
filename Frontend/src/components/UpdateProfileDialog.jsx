import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/userSlice";
import { toast } from "sonner";
import { motion } from "framer-motion";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    fullname: user?.fullname,
    email: user?.email,
    phonenumber: user?.phonenumber,
    bio: user?.profile?.bio,
    skills: user?.profile?.skills.join(", "),
    file: user?.resume,
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phonenumber", input.phonenumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);
      const res = await axios.patch(
        `${USER_API_END_POINT}/updateProfile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser(res?.data?.user));
        toast.success(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message ||
          "Profile update failed. Please try again."
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <div>
      <Dialog open={open}>
        <DialogContent
          className="sm:max-w-[500px] px-6 py-4 bg-gradient-to-r from-indigo-50 to-white rounded-xl shadow-xl"
          onInteractOutside={() => setOpen(false)}
        >
          <DialogHeader>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <DialogTitle className="text-indigo-600 text-lg font-semibold">
                Update Profile
              </DialogTitle>
            </motion.div>
          </DialogHeader>
          <form onSubmit={submitHandler} className="space-y-6">
            <div className="grid gap-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right font-medium">
                  Name
                </Label>
                <Input
                  type="text"
                  id="name"
                  value={input.fullname}
                  onChange={changeEventHandler}
                  name="fullname"
                  className="col-span-3 focus:ring-indigo-400"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right font-medium">
                  Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  value={input.email}
                  name="email"
                  onChange={changeEventHandler}
                  className="col-span-3 focus:ring-indigo-400"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="number" className="text-right font-medium">
                  Number
                </Label>
                <Input
                  type="number"
                  id="number"
                  value={input.phonenumber}
                  name="phonenumber"
                  onChange={changeEventHandler}
                  className="col-span-3 focus:ring-indigo-400"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bio" className="text-right font-medium">
                  Bio
                </Label>
                <Input
                  type="text"
                  value={input.bio}
                  id="bio"
                  name="bio"
                  onChange={changeEventHandler}
                  className="col-span-3 focus:ring-indigo-400"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="skills" className="text-right font-medium">
                  Skills
                </Label>
                <Input
                  type="text"
                  id="skills"
                  value={input.skills}
                  name="skills"
                  onChange={changeEventHandler}
                  className="col-span-3 focus:ring-indigo-400"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="file" className="text-right font-medium">
                  Resume
                </Label>
                <Input
                  type="file"
                  id="file"
                  name="file"
                  onChange={changeFileHandler}
                  className="col-span-3 focus:ring-indigo-400"
                />
              </div>
            </div>

            <DialogFooter>
              {loading ? (
                <Button
                  className="w-full py-2 text-white bg-indigo-600 rounded-md disabled:opacity-50"
                  disabled
                >
                  <Loader2 className="m-2 h-4 w-4 animate-spin" />
                  Updating...
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition"
                >
                  Update Profile
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfileDialog;
