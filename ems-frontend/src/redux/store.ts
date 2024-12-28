import { configureStore } from "@reduxjs/toolkit";
import { loginAPI } from "./api/logInAPI";
import { loginReducer } from "./reducer/loginReducer";
import { taskAPI } from "./api/Admin/taskAPI";
import { taskReducer } from "./reducer/taskReducer";
import { employeeTaskAPI } from "./api/taskAPI";
import { employeeTaskCountAPI } from "./api/employeeTaskCountAPI";

export const server = import.meta.env.VITE_SERVER;

export const store = configureStore({
    reducer: {
        [loginAPI.reducerPath]: loginAPI.reducer,
        [loginReducer.name] : loginReducer.reducer,
        [taskAPI.reducerPath]: taskAPI.reducer,
        [taskReducer.name]: taskReducer.reducer,
        [employeeTaskAPI.reducerPath]: employeeTaskAPI.reducer,
        [employeeTaskCountAPI.reducerPath]: employeeTaskCountAPI.reducer,
    },
    middleware: (mid) => [...mid(), loginAPI.middleware, taskAPI.middleware, employeeTaskAPI.middleware, employeeTaskCountAPI.middleware], 
});