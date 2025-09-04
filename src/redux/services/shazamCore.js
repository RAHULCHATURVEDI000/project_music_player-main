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
      transformResponse: (response) => {
        if (!response || response.error) {
          console.warn("⚠️ Using dummy data (API error or empty response).");
          return dummySongs;
        }
        return response;
      },
    }),
    getSongsByGenre: builder.query({
      query: (genre) => `v1/charts/genre-world?genre_code=${genre}`,
      transformResponse: (response) => {
        if (!response || response.error) {
          console.warn("⚠️ Using dummy data for genre songs (API error or empty response).");
          return dummySongs;
        }
        return response;
      },
    }),
    getSongsByCountry: builder.query({
      query: (countryCode) => `v1/charts/country?country_code=${countryCode}`,
      transformResponse: (response) => {
        if (!response || response.error) {
          console.warn("⚠️ Using dummy data for country songs (API error or empty response).");
          return dummySongs;
        }
        return response;
      },
    }),
    getSongsBySearch: builder.query({
      query: (searchTerm) => `v1/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}`,
      transformResponse: (response) => {
        if (!response || response.error) {
          console.warn("⚠️ Using dummy data for search results (API error or empty response).");
          return { tracks: { hits: dummySongs.map(song => ({ track: song })) } };
        }
        return response;
      },
    }),
    getArtistDetails: builder.query({
      query: (artistId) => `v2/artists/details?artist_id=${artistId}`,
      transformResponse: (response) => {
        if (!response || response.error) {
          console.warn("⚠️ Using dummy data for artist details (API error or empty response).");
          return {
            data: [{
              attributes: {
                name: "Sample Artist",
                genreNames: ["Pop"],
                artwork: {
                  url: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=500&h=500"
                }
              },
              views: {
                'top-songs': {
                  data: dummySongs
                }
              }
            }]
          };
        }
        return response;
      },
    }),
    getSongDetails: builder.query({
      query: ({ songid }) => `v1/tracks/details?track_id=${songid}`,
      transformResponse: (response) => {
        if (!response || response.error) {
          console.warn("⚠️ Using dummy data for song details (API error or empty response).");
          return {
            title: "Sample Song",
            subtitle: "Sample Artist",
            images: {
              coverart: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400&h=400"
            },
            genres: { primary: "Pop" },
            sections: [
              { type: "SONG" },
              { 
                type: "LYRICS", 
                text: [
                  "Sample lyrics line 1",
                  "Sample lyrics line 2",
                  "Sample lyrics line 3"
                ]
              }
            ]
          };
        }
        return response;
      },
    }),
    getSongRelated: builder.query({
      query: ({ songid }) => `v1/tracks/related?track_id=${songid}`,
      transformResponse: (response) => {
        if (!response || response.error) {
          console.warn("⚠️ Using dummy data for related songs (API error or empty response).");
          return dummySongs;
        }
        return response;
      },
    }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongsByGenreQuery,
  useGetSongsByCountryQuery,
  useGetSongsBySearchQuery,
  useGetArtistDetailsQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
} = shazamCoreApi;