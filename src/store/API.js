import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const API = createApi({
  reducerPath: 'API',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:5056',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    // *AUTHENTICATION*
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
          firstName,
          lastName,
          email,
          phoneNumber,
          password,
          confirmPassword
        },  
      })
    }),

    // *CATEGORIES*
    addCategory: builder.mutation({
      query: ({ name, imageUrl, description, sortOrder }) => ({
        url: '/api/v1/Categories',
        method: 'POST',
        body: {
          name: name,
          description,
          imageUrl: imageUrl,
          sortOrder
        },
      })
    }),

    editCategory: builder.mutation({
      query: ({ name, imageUrl, description, sortOrder, id, isActive }) => ({
        url: `/api/v1/Categories/${id}`,
        method: 'PUT',
        body: {
          name: name,
          description,
          imageUrl: imageUrl,
          isActive: isActive,
          sortOrder
        },
      })
    }),

    deleteCategory: builder.mutation({
      query: ({ id }) => ({
        url: `/api/v1/Categories/${id}`,
        method: 'DELETE',
      })
    }),


    // *USERS*
    getMe: builder.query({
      query: () => ({
        url: '/api/v1/Admin/users',
        method: 'GET'
      }),
    }),

    getUserStatics: builder.query({
      query: () => ({
        url: '/api/v1/Admin/users/statistics',
        method: 'GET'
      }),
    }),

    getUserRoles: builder.query({
      query: () => ({
        url: '/api/v1/Admin/users/roles',
        method: 'GET'
      }),
    }),

    getCategories: builder.query({
      query: () => ({
        url: '/api/v1/Categories',
        method: 'GET'
      }),
    }),

    editUser: builder.mutation({
      query: ({ firstName,lastName,phoneNumber,role,isActive,id }) => ({
        url: `/api/v1/Admin/users/${id}`,
        method: 'PUT',
        body: {
        firstName,
        lastName,
        phoneNumber,
        role,
        isActive
      },
      })
    }),

    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `/api/v1/Admin/users/${id}`,
        method: 'DELETE',
      })
    }),

    editUserRole: builder.mutation({
      query: ({ role,id }) => ({
        url: `/api/v1/Admin/users/${id}/role`,
        method: 'PUT',
        body: {
        role
      },
      })
    }),

    

    getProducts: builder.query({
      query: () => ({
        url: '/api/v1/Products',
        method: 'GET'
      }),
    }),


    
  }),
})

export const { 
  useLoginMutation,
  useSignupMutation,
  useGetMeQuery,
  useGetCategoriesQuery,
  useGetProductsQuery,
  useAddCategoryMutation,
  useEditCategoryMutation,
  useDeleteCategoryMutation,
  useGetUserStaticsQuery,
  useEditUserMutation,
  useDeleteUserMutation,
  useGetUserRolesQuery
} = API
