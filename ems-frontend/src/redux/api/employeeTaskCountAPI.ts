import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const employeeTaskCountAPI = createApi({
    reducerPath: "employeeTaskCountAPI",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/user/` }),
    endpoints: (builder) => ({
      getUser: builder.query({
        query: (id) => `${id}`,
      }),
    }),
  });
  
  export const { useGetUserQuery } = employeeTaskCountAPI;