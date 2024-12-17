import { createSlice } from "@reduxjs/toolkit";

const JobSlice = createSlice({
  name: "alljobs",
  initialState: {
    alljobs: [],
    allAdminJobs: [],
    singleJob: null,
    searchJobByText: "",
    allAppliedJobs: [],
    studentSearchJob: "",
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.alljobs = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setAllAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
    },
    setSearchJobByText: (state, action) => {
      state.searchJobByText = action.payload;
    },
    setAppliedJobs: (state, action) => {
      state.allAppliedJobs = action.payload;
    },
    setStudentSearchJob: (state, action) => {
      state.studentSearchJob = action.payload;
    },
  },
});

export const {
  setAllJobs,
  setSingleJob,
  setAllAdminJobs,
  setSearchJobByText,
  setAppliedJobs,
  setStudentSearchJob,
} = JobSlice.actions;
export default JobSlice.reducer;
