import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const API = createApi({
  reducerPath: 'API',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:5056',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: '/api/v1/Auth/login',
        method: 'POST',
        body: { 
          email,
          password
        },
      })
    }),
    signup: builder.mutation({
      query: ({ firstName, lastName, email, phoneNumber, password, confirmPassword }) => ({
        url: '/api/v1/Auth/register',
        method: 'POST',
        body: { 
          firstName: firstName,
          lastName: lastName,
          email: email,
          phoneNumber: phoneNumber,
          password: password,
          confirmPassword: confirmPassword
        },
      })
    }),
  }),
})

export const { useLoginMutation, useSignupMutation } = API