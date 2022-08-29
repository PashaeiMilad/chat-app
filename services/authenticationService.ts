import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store/store'
import { BASE_URL } from './config';
const authenticationURL = BASE_URL + "/auth/"

export interface User {
  user_id: number;      // The user's identification number
  user_name: string;    // The user's username
  user_avatar: string;  // The user's avatar url
  created: string;
}

export interface UserResponse {
  user: User
  token: string
}

export interface LoginRequest {
  user_name: string
}

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: authenticationURL,
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = (getState() as RootState).auth.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: 'me',
        method: 'POST',
        body: credentials,
      }),
    }),
    protected: builder.mutation<{ message: string }, void>({
      query: () => 'protected',
    }),
  }),
})

export const { useLoginMutation, useProtectedMutation } = api
