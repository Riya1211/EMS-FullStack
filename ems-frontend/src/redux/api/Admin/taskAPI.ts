import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AdminAllUserTaskResponse, AdminCreateTaskRequest, AdminCreateTaskResponse } from "../../../types/api-types";
export const taskAPI = createApi({
    reducerPath: "taskAPI",
    tagTypes: ['TASKS'],
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_SERVER}/api/v1` }),  //Server common URL that we have created in backend
        endpoints: (builder) => ({
            getAllUserTaskAPI: builder.query<AdminAllUserTaskResponse, string>({ //called mutation because query is changing or in this scenerio creating for the first time 
            query: () => "user/all",
            providesTags: ['TASKS']
        }),
        createNewTask: builder.mutation<AdminCreateTaskResponse, AdminCreateTaskRequest>({ 
            query: (credentials) => ({
            url: "task/new",  //when login is called new is added at the end of baseUrl
            method: "POST",
            body: credentials,
            }),
            invalidatesTags: ['TASKS']
        }),
    }),
});

export const { useGetAllUserTaskAPIQuery, useCreateNewTaskMutation } = taskAPI;