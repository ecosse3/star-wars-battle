import { IResponse } from '#interfaces/api';
import { IPeople } from '#interfaces/people';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from './consts';

export const peopleApi = createApi({
  reducerPath: 'peopleApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getPeople: builder.query<IResponse<IPeople[]>, number | void>({
      query: (page = 1) => `/people?page=${page}`
    }),
    getPeopleById: builder.query<IResponse<IPeople>, number>({
      query: (id) => `/people/${id}`
    })
  })
});

export const { useGetPeopleQuery, useGetPeopleByIdQuery } = peopleApi;
