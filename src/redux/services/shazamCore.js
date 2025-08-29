// src/redux/services/shazamCore.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { dummySongs } from "./dummyData";

export const shazamCoreApi = createApi({
  reducerPath: "shazamCoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam-core.p.rapidapi.com/",
    prepareHeaders: (headers) => {
      headers.set("X-RapidAPI-Key", import.meta.env.VITE_SHAZAM_CORE_RAPID_API_KEY || "");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({
      async queryFn(_arg, _queryApi, _extraOptions, baseQuery) {
        const result = await baseQuery("v1/charts/world");
        if (result.error) {
          console.warn("⚠️ Falling back to dummy data due to API error:", result.error);
          return { data: dummySongs };
        }
        return result;
      },
    }),
    // ✅ you can add similar wrappers for other endpoints if needed
  }),
});

export const { useGetTopChartsQuery } = shazamCoreApi;
