import React from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { motion } from "framer-motion";

const AppliedJob = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="overflow-x-auto"
    >
      <Table className="min-w-full bg-white shadow-md rounded-lg">
        <TableCaption>A List of Your Applied Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[1, 2].map((item, index) => (
            <TableRow key={index} className="hover:bg-gray-100 transition-colors duration-200">
              <TableCell>11-12-24</TableCell>
              <TableCell>Frontend Developer</TableCell>
              <TableCell>Google</TableCell>
              <TableCell className="text-right">
                <Badge className="bg-green-500 text-white">Selected</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </motion.div>
  );
};

export default AppliedJob;
