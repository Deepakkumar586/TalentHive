import { setSingleCompany } from "@/redux/companySlice";

import { COMPANY_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetCompanyById = (companyId) => {
  console.log("using", companyId)
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchSingleCompany = async () => {
      try {
        const response = await axios.get(
          COMPANY_API_END_POINT + `/find/Company/${companyId}`,
          { withCredentials: true }
        );
        console.log("single data comes in custom hook", response.data.company);
        if (response.data.success) {
          dispatch(setSingleCompany(response.data.company));
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchSingleCompany();
  }, [companyId, dispatch]);
  return <div></div>;
};

export default useGetCompanyById;
