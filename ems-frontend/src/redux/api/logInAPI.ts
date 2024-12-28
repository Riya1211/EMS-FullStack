import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginRequest, LoginReseponse} from "../../types/api-types";

export const loginAPI = createApi({
  reducerPath: "loginAPI",
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/` }),  //Server common URL that we have created in backend
  endpoints: (builder) => ({
    login: builder.mutation<LoginReseponse, LoginRequest>({ //called mutation because query is changing or in this scenerio creating for the first time 
      query: (credentials) => ({
        url: "login",  //when login is called new is added at the end of baseUrl
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = loginAPI;