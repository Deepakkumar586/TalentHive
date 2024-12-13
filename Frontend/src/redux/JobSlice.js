import { createSlice } from "@reduxjs/toolkit";



const JobSlice = createSlice({
    name:"alljobs",
    initialState:{
        alljobs:[],
        singleJob:null,
    },
    reducers:{
        setAllJobs:(state,action)=>{
            state.alljobs = action.payload;
        },
        setSingleJob:(state,action)=>{
            state.singleJob = action.payload;
        }
    }

})

export const {setAllJobs,setSingleJob}= JobSlice.actions
export default JobSlice.reducer;