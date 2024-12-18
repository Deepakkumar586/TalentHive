import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { setStudentSearchJob } from "@/redux/JobSlice";

const filterData = [
  {
    filterType: "Location",
    area: ["Delhi NCR", "Gurugram", "Noida", "Hyderabad", "Pune", "Bangalore"],
  },
  {
    filterType: "Industry",
    area: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
  },
  {
    filterType: "Salary",
    area: ["8k-40k", "41k-1Lakh", "1Lakh - 5Lakh"],
  },
];

const FilterJobs = () => {
  const [selectedvalue, setSelectedvalue] = useState("");
  const dispatch = useDispatch();

  const changehandler = (value) => {
    setSelectedvalue(value);
  };

  useEffect(() => {
    dispatch(setStudentSearchJob(selectedvalue));
  }, [selectedvalue]);
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full bg-white shadow-md rounded-lg p-6"
    >
      <h1 className="font-bold text-xl mb-4 text-purple-700">Filter Jobs</h1>
      <hr className="mb-4" />
      <RadioGroup value={selectedvalue} onValueChange={changehandler}>
        {filterData.map((data, index) => (
          <div key={index} className="mb-6">
            <h2 className="font-semibold text-lg mb-2 text-gray-700">
              {data.filterType}
            </h2>
            {data.area.map((item, idx) => (
              <div className="flex items-center space-x-3 mb-2" key={idx}>
                <RadioGroupItem
                  value={item}
                  id={`id${index}-${idx}`}
                  className="cursor-pointer"
                />
                <Label htmlFor={`id${index}-${idx}`}>{item}</Label>
              </div>
            ))}
          </div>
        ))}
      </RadioGroup>
    </motion.div>
  );
};

export default FilterJobs;
