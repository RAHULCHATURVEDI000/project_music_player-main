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
      query: () => "v1/charts/world",
      // ✅ This runs after query resolves
      transformResponse: (response) => {
        if (!response || response.error) {
          console.warn("⚠️ Using dummy data (API error or empty response).");
          return dummySongs;
        }
        return response;
      },
    }),
  }),
});

export const { useGetTopChartsQuery } = shazamCoreApi;
