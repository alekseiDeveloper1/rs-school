import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Season } from '../app/scripts/scripts.ts';
interface ApiResponse {
  seasons: Season[];
  page: {
    totalElements: number;
  };
}

interface TransformedResponse {
  seasons: Season[];
  totalElements: number;
}
export const api = createApi({
  reducerPath: 'stapi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://stapi.co/api/v1/rest/' }),
  endpoints: (builder) => ({
    getSeasons: builder.query<
      TransformedResponse,
      {
        countElement: number;
        currentPage: number;
      }
    >({
      query: ({ countElement, currentPage }) => ({
        url: 'season/search',
        params: {
          pageSize: countElement,
          pageNumber: currentPage,
        },
      }),
      transformResponse: (response: ApiResponse): TransformedResponse => ({
        seasons: response.seasons,
        totalElements: response.page.totalElements,
      }),
    }),
  }),
});

export const { useGetSeasonsQuery } = api;
