import { MoreHorizontal } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";

const shortlistedStatus = ["Accepted", "Rejected"];
const ApplicantsTable = () => {
  const { applicants } = useSelector((state) => state.application);

  //   Status handler function
  const statusHandler = async (status, id) => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/updateStatus/${id}`,
        { status },
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "An error occurred");
    }
  };

  return (
    <div>
      <Table>
        <TableCaption className="mb-10">
          A List of Your Recent Applied Users
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>FullName</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>ContactNo</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead> {/* Added Status Column */}
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants?.applications?.map((item, index) => (
            <tr key={index}>
              <TableCell>{item?.applicant?.fullname}</TableCell>
              <TableCell>{item?.applicant?.email}</TableCell>
              <TableCell>{item?.applicant?.phonenumber}</TableCell>
              <TableCell>
                <a
                  className="text-blue-600 cursor-pointer"
                  href={item?.applicant?.profile?.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item?.applicant?.profile?.resumeOriginalName}
                </a>
              </TableCell>
              <TableCell>{item?.createdAt.split("T")[0]}</TableCell>

              {/* Status Display */}
              <TableCell>
                <span
                  className={`px-2 py-1 text-sm font-semibold rounded-full ${
                    item?.status === "Accepted"
                      ? "bg-green-500 text-white"
                      : item?.status === "Rejected"
                      ? "bg-red-600 text-white"
                      : "bg-yellow-300 text-white"
                  }`}
                >
                  {item?.status || "Pending"}
                </span>
              </TableCell>

              {/* Action - Status Update */}
              <TableCell className="float-right cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                    {shortlistedStatus.map((status, index) => (
                      <div
                        onClick={() => statusHandler(status, item?._id)}
                        key={index}
                        className="flex w-fit my-2 cursor-pointer"
                      >
                        <span>{status}</span>
                      </div>
                    ))}
                  </PopoverContent>
                </Popover>
              </TableCell>
            </tr>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
