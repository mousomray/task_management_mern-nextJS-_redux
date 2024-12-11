import { configureStore } from "@reduxjs/toolkit";
import taskslicers from "../function_folder/allfunction";


export const store = configureStore({
    reducer: {
        Showtask: taskslicers
    },
});