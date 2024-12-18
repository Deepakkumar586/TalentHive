import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { setCompanies } from "@/redux/companySlice";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner"; // For user-friendly error messages

const useGetAllCompanies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllCompanies = async () => {
      try {
        // Send GET request to fetch companies
        const response = await axios.get(
          `${COMPANY_API_END_POINT}/find/user/allCompany`, // Update with the actual backend endpoint
          { withCredentials: true } // Ensure cookies are sent for authentication, if required
        );
        if (response.data.success) {
          dispatch(setCompanies(response.data.companies));
        } else {
          toast.error(response.data.message || "Failed to fetch companies.");
        }
      } catch (err) {
        // Handle any errors from the request
        console.error(
          "Error fetching companies:",
          err.response?.data || err.message
        );
        toast.error(
          err.response?.data?.message || "An error occurred. Please try again."
        );
      }
    };

    fetchAllCompanies(); // Call the function on component mount
  }, [dispatch]);

  return null; // This hook does not return UI elements
};

export default useGetAllCompanies;
