import { IResponse } from '#interfaces/api';
import { IStarships } from '#interfaces/starships';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from './consts';

export const starshipsApi = createApi({
  reducerPath: 'starshipsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getStarships: builder.query<IResponse<IStarships[]>, void>({
      query: () => '/starships'
    }),
    getStarshipById: builder.query<IStarships, number>({
      query: (id) => `/starships/${id}`
    })
  })
});

export const { useGetStarshipsQuery, useGetStarshipByIdQuery } = starshipsApi;
