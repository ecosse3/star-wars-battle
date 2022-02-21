import { IResponse } from '#interfaces/api';
import { IStarship } from '#interfaces/starship';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from './consts';

export const starshipsApi = createApi({
  reducerPath: 'starshipsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getStarships: builder.query<IResponse<IStarship[]>, number | void>({
      query: (page = 1) => `/starships?page=${page}`
    })
  })
});

export const { useGetStarshipsQuery } = starshipsApi;
