import { toast } from "react-toastify";
import axiosInstance from "../api/api";
import { myendpoints } from "../api/endpoints";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; //createAsyncThunk handle asynconomous function 

// Create Function 
export const addTask = async (data) => {
    try {
        const apiurl = myendpoints[0]
        const response = await axiosInstance.post(apiurl, data)
        console.log("Fetching add task data...", response);
        toast.success(response?.data?.message);
        return response
    } catch (error) {
        toast.error(error?.response?.data?.errors?.errors[0]?.msg);
        console.log("Error fetching create data...", error);

    }
}

// Task list function
export const taskList = createAsyncThunk("tasklist", async ({ page, perpage }, { rejectWithValue }) => {
    try {
        const apiurl = `${myendpoints[1]}?page=${page}&perpage=${perpage}`;
        const response = await axiosInstance.get(apiurl);
        console.log("Fetching Task list data", response);
        return response?.data;
    } catch (error) {
        console.log("Error Fetching Task list data", error);
        return rejectWithValue(error.response.data);
    }
});

// createSlice for task list area start
const taskslicers = createSlice({
    name: "taskslicers",
    initialState: {
        taskdata: [],
        totalpage: "", // Make For Pagination 
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder

            .addCase(taskList.pending, (state) => {
                state.loading = true;
            })

            .addCase(taskList.fulfilled, (state, action) => {
                state.loading = false;
                state.taskdata = action.payload.tasks;
                state.totalpage = action.payload.pagination.totalPages; // For Pagination
            })

            .addCase(taskList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default taskslicers.reducer;

// Fetch Single Task 
export const singletask = async (id) => {
    try {
        const apiurl = `${myendpoints[1]}/${id}`
        const response = await axiosInstance.get(apiurl);
        console.log("Fetching single task...", response);
        return response?.data?.task
    } catch (error) {
        console.log("Error fetching single task...", error);
    }
}

// Edit Task 
export const editTask = async ({ data, id }) => {
    try {
        const apiurl = myendpoints[2]
        const response = await axiosInstance.put(`${apiurl}/${id}`, data);
        console.log("Fetching edit task data...", response);
        toast.success(response?.data?.message);
        return response
    } catch (error) {
        toast.error(error?.response?.data?.error);
        console.log("Error fetching edit data...", error);

    }
}

// Delete Task 
export const deleteTask = async (id) => {
    try {
        const apiurl = myendpoints[3]
        const response = await axiosInstance.delete(`${apiurl}/${id}`);
        console.log("Fetching delete task data...", response);
        toast.warn(response?.data?.message);
        return response
    } catch (error) {
        toast.error(error?.response?.data?.errors[0]);
        console.log("Error fetching delete data...", error);

    }
}

