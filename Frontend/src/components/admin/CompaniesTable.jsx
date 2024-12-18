import { Edit2, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const tableRowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" },
  }),
};

const CompaniesTable = () => {
  const { companies } = useSelector((state) => state.company);
  const { searchCompanyByText } = useSelector((state) => state.company);
  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredCompany =
      companies?.length >= 0 &&
      companies?.filter((company) => {
        if (!searchCompanyByText) {
          return true;
        }
        return company?.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  return (
    <motion.div
      className="shadow-md rounded-lg overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Table className="w-full">
        <TableCaption className="text-purple-500  text-sm italic">
          Your Registered Companies
        </TableCaption>

        {/* Table Header */}
        <TableHeader>
          <TableRow className="border-b">
            <TableHead className="text-purple-700 font-semibold">
              Logo
            </TableHead>
            <TableHead className="text-purple-700 font-semibold">
              Name
            </TableHead>
            <TableHead className="text-purple-700 font-semibold">
              Date
            </TableHead>
            <TableHead className="text-right text-purple-700 font-semibold">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        {/* Table Body */}
        <TableBody>
          {filterCompany?.map((company, index) => (
            <motion.tr
              key={index}
              variants={tableRowVariants}
              custom={index}
              initial="hidden"
              animate="visible"
              className="hover:bg-gray-100 transition-all duration-300 cursor-pointer border-b last:border-none"
            >
              <TableCell className="p-3">
                <Avatar className="w-9 h-9">
                  <AvatarImage
                    src={company?.logo}
                    alt="Company Logo"
                    className="rounded-full"
                  />
                </Avatar>
              </TableCell>
              <TableCell className="text-gray-700 font-medium">
                {company.name}
              </TableCell>
              <TableCell className="text-gray-500">
                {company.createdAt.split("T")[0]}
              </TableCell>
              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal className="text-gray-500 hover:text-purple-600 transition-all duration-200" />
                  </PopoverTrigger>
                  <PopoverContent className="w-36 bg-white shadow-md rounded-lg">
                    <div
                      onClick={() =>
                        navigate(`/admin/companies/${company._id}`)
                      }
                      className="flex items-center gap-2 p-2 text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-md transition-all"
                    >
                      <Edit2 size={16} />
                      <span>Edit</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </motion.div>
  );
};

export default CompaniesTable;
