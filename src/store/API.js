import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const API = createApi({
  reducerPath: 'API',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5056',
    prepareHeaders: (headers, { endpoint, body }) => {
      // Skip Content-Type for FormData requests - let FormData handle it
      const isFormDataRequest =
        endpoint === 'addProduct' ||
        endpoint === 'addCategoryImage' ||
        endpoint === 'addDetailImages' ||
        endpoint === 'addBanner' ||
        body instanceof FormData;

      if (!isFormDataRequest) {
        headers.set('Content-Type', 'application/json');
      }

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

  endpoints: builder => ({
    // *AUTHENTICATION*
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: '/api/v1/Auth/login',
        method: 'POST',
        body: { email, password },
      }),
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
          confirmPassword,
        },
      }),
    }),

    // *CATEGORIES*

    getParentCategories: builder.query({
      query: () => ({
        url: '/api/v1/Categories/root',
        method: 'GET',
      }),
    }),
    
    getSubCategories: builder.query({
      query: (id) => ({
        url: `/api/v1/Categories/${id}/subcategories`,
        method: 'GET',
      }),
    }),

    addCategory: builder.mutation({
      query: ({ name, imageUrl, description, sortOrder, parentCategoryId }) => ({
        url: '/api/v1/Categories',
        method: 'POST',
        body: {
          name,
          description,
          imageUrl,
          sortOrder,
          parentCategoryId,
        },
      }),
    }),

    editCategory: builder.mutation({
      query: ({ name, imageUrl, description, sortOrder, id, isActive }) => ({
        url: `/api/v1/Categories/${id}`,
        method: 'PUT',
        body: {
          name,
          description,
          imageUrl,
          isActive,
          sortOrder,
        },
      }),
    }),

    deleteCategory: builder.mutation({
      query: ({ id }) => ({
        url: `/api/v1/Categories/${id}`,
        method: 'DELETE',
      }),
    }),

    addCategoryImage: builder.mutation({
      query: formData => ({
        url: '/api/v1/Categories/with-image',
        method: 'POST',
        body: formData,
        prepareHeaders: headers => {
          headers.delete('Content-Type');
          return headers;
        },
      }),
    }),

    // *USERS*
    getMe: builder.query({
      query: () => ({
        url: '/api/v1/Auth/me',
        method: 'GET',
      }),
    }),

    getUsers: builder.query({
      query: () => ({
        url: '/api/v1/Admin/Users',
        method: 'GET',
      }),
    }),

    getUserStatics: builder.query({
      query: () => ({
        url: '/api/v1/Admin/users/statistics',
        method: 'GET',
      }),
    }),

    getUserRoles: builder.query({
      query: () => ({
        url: '/api/v1/Admin/users/roles',
        method: 'GET',
      }),
    }),

    changePassword: builder.mutation({
      query: ({ newPass, currentPass, confirmNewPassword }) => ({
        url: '/api/v1/Auth/change-password',
        method: 'POST',
        body: {
          currentPassword: currentPass,
          newPassword: newPass,
          confirmNewPassword,
        },
      }),
    }),

    getCategories: builder.query({
      query: () => ({
        url: '/api/v1/Categories',
        method: 'GET',
      }),
    }),

    editUser: builder.mutation({
      query: ({ firstName, lastName, phoneNumber, role, isActive, id }) => ({
        url: `/api/v1/Admin/users/${id}`,
        method: 'PUT',
        body: { firstName, lastName, phoneNumber, role, isActive },
      }),
    }),

    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `/api/v1/Admin/users/${id}`,
        method: 'DELETE',
      }),
    }),

    editUserRole: builder.mutation({
      query: ({ role, id }) => ({
        url: `/api/v1/Admin/users/${id}/role`,
        method: 'PUT',
        body: { role },
      }),
    }),

    activateUser: builder.mutation({
      query: ({ id }) => ({
        url: `/api/v1/Admin/users/${id}/activate`,
        method: 'POST',
      }),
    }),

    deActivateUser: builder.mutation({
      query: ({ id }) => ({
        url: `/api/v1/Admin/users/${id}/deactivate`,
        method: 'POST',
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: '/api/v1/Auth/logout',
        method: 'POST',
      }),
    }),

    // *PRODUCTS*
    getProducts: builder.query({
      query: () => ({
        url: '/api/v1/Products',
        method: 'GET',
      }),
    }),
    getHotDeals: builder.query({
      query: () => ({
        url: '/api/v1/Products/hot-deals',
        method: 'GET',
      }),
    }),
    getRecommended: builder.query({
      query: () => ({
        url: '/api/v1/Products/recommendations',
        method: 'GET',
      }),
    }),
    

    getProductsSummary: builder.query({
      query: () => ({
        url: '/api/v1/Admin/products/stock/summary',
        method: 'GET',
      }),
    }),

    addProduct: builder.mutation({
      query: formData => ({
        url: '/api/v1/Products/with-image',
        method: 'POST',
        body: formData,
        prepareHeaders: headers => {
          headers.delete('Content-Type');
          return headers;
        },
      }),
    }),

    addDetailImages: builder.mutation({
      query: ({ id, images }) => ({
        url: `/api/v1/Products/${id}/upload-images`,
        method: 'POST',
        body: images, // FormData
        prepareHeaders: headers => {
          headers.delete('Content-Type');
          return headers;
        },
      }),
    }),

    deleteProduct: builder.mutation({
      query: ({ id }) => ({
        url: `/api/v1/Products/${id}`,
        method: 'DELETE',
      }),
    }),

    editProduct: builder.mutation({
      query: ({
        name,
        description,
        shortDescription,
        isActive,
        isHotDeal,
        stockQuantity,
        categoryId,
        id,
      }) => ({
        url: `/api/v1/Products/${id}`,
        method: 'PUT',
        body: {
          name,
          description,
          shortDescription,
          isActive,
          isHotDeal,
          stockQuantity,
          categoryId,
        },
      }),
    }),

    // *BANNERS*
    getBanners: builder.query({
      query: () => ({
        url: '/api/v1/Admin/banners',
        method: 'GET',
      }),
    }),

    addBanner: builder.mutation({
      query: formData => ({
        url: '/api/v1/Admin/banners/with-image',
        method: 'POST',
        body: formData,
        prepareHeaders: headers => {
          headers.delete('Content-Type');
          return headers;
        },
      }),
    }),

    // *FILTERS*
    getFilters: builder.query({
      query: () => ({
        url: '/api/v1/Admin/filters',
        method: 'GET',
      }),
    }),

    addFilter: builder.mutation({
      query: ({ name, isActive, sortOrder, options }) => ({
        url: '/api/v1/Categories',
        method: 'POST',
        body: {
          name,
          type: 0,
          isActive,
          sortOrder: sortOrder ?? 0,
          options,
        },
      }),
    }),
  }),
});

export const {
  useAddFilterMutation,
  useGetFiltersQuery,
  useGetBannersQuery,
  useAddBannerMutation,
  useLoginMutation,
  useSignupMutation,
  useGetMeQuery,
  useGetCategoriesQuery,
  useGetSubcategoriesQuery,
  useGetParentCategoriesQuery,

  useGetProductsQuery,
  useGetHotDealsQuery, 
  useGetRecommendedQuery,
  useAddCategoryMutation,
  useAddCategoryImageMutation,
  useEditCategoryMutation,
  useDeleteCategoryMutation,
  useGetUserStaticsQuery,
  useEditUserMutation,
  useDeleteUserMutation,
  useGetUserRolesQuery,
  useGetUsersQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useEditProductMutation,
  useGetProductsSummaryQuery,
  useActivateUserMutation,
  useDeActivateUserMutation,
  useLogoutMutation,
  useEditUserRoleMutation,
  useChangePasswordMutation,
  useAddDetailImagesMutation,
} = API;
