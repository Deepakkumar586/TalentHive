import { setCompanies } from "@/redux/companySlice";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllCompanies = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllCompanies = async () => {
      try {
        const response = await axios.get(
          COMPANY_API_END_POINT + "/find/user/allCompany",
          { withCredentials: true }
        );
        console.log("find user all company :", response.data);
        if (response.data.success) {
          dispatch(setCompanies(response.data.companies));
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchAllCompanies();
  }, []);
  return <div></div>;
};

export default useGetAllCompanies;
