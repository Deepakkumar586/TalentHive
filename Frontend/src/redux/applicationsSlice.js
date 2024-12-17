import { createSlice } from "@reduxjs/toolkit";

const applicationsSlice = createSlice({
  name: "application",
  initialState: {
    applicants: [],
  },
  reducers: {
    setApplicants: (state, action) => {
      state.applicants = action.payload;
    },
  },
});

export const { setApplicants } = applicationsSlice.actions;

export default applicationsSlice.reducer;
