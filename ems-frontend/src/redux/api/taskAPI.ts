// import axios from "axios";

//employees
// export const getTask = async ( id: number) => {
//     try {
//       const { data } = await axios.get(`${import.meta.env.VITE_SERVER}/api/v1/task/${id}`);  
//       return data;
//     } catch (error) {
//       throw error
//     }
// }

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const employeeTaskAPI = createApi({
    reducerPath: "employeeTaskAPI",
    tagTypes: ['UPD_TASKS'],
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/task/` }), 
        endpoints: (builder) => ({
            getTask: builder.query({
            query: (empId) => `${empId}`,
            providesTags: ['UPD_TASKS']
        }),
        updateTask: builder.mutation({ 
            query: ({ taskId, empId, status }) => ({
            url: `${empId}/${taskId}`,
            method: "PUT",
            body: status,
            }),
            invalidatesTags: ['UPD_TASKS']
        }),
    }),
});

export const { useGetTaskQuery, useUpdateTaskMutation } = employeeTaskAPI;