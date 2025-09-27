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

    getProduct: builder.query({
      query: (id) => ({
        url: `/api/v1/Products/${id}`,
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

    filterProducts: builder.mutation({
      query: formData => ({
        url: '/api/v1/Products/filter',
        method: 'POST',
        body: formData,
        prepareHeaders: headers => {
          headers.delete('Content-Type');
          return headers;
        },
      }),
    }),


    // *PRODUCT SPECIFICATIONS*
    getProductSpecifications: builder.query({
      query: (id) => ({
        url: `/api/v1/Products/${id}/specifications`,
        method: 'GET',
      }),
    }),

    addProductSpecifications: builder.mutation({
      query: ({ id, productId, specificationGroups }) => ({
        url: `/api/v1/Products/${id}/specifications`,
        method: 'POST',
        body: {
          productId,
          specificationGroups,
        },
      }),
    }),

    updateProductSpecifications: builder.mutation({
      query: ({ id, specificationGroups }) => ({
        url: `/api/v1/Products/${id}/specifications`,
        method: 'PUT',
        body: {
          specificationGroups,
        },
      }),
    }),

    deleteProductSpecifications: builder.mutation({
      query: ({ id }) => ({
        url: `/api/v1/Products/${id}/specifications`,
        method: 'DELETE',
      }),
    }),

    // *BANNERS*
    getBanners: builder.query({
      query: () => ({
        url: '/api/v1/Admin/banners',
        method: 'GET',
      }),
    }),

    deleteBanner: builder.mutation({
      query: ({ id }) => ({
        url: `/api/v1/Admin/banners/${id}`,
        method: 'DELETE',
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
      providesTags: ['Filters'],
    }),

    addFilter: builder.mutation({
      query: ({ name, isActive, sortOrder, options }) => ({
        url: '/api/v1/Admin/filters',
        method: 'POST',
        body: {
          name,
          type: 0,
          isActive,
          sortOrder: sortOrder ?? 0,
          options,
        },
        invalidatesTags: ['Filters'],
      }),
    }),

    removeFilter: builder.mutation({
      query: ({ id }) => ({
        url: `/api/v1/Admin/filters/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Filters'], 
    }),



    // *CART*
    addCartItem: builder.mutation({
      query: ({ productId, quantity }) => ({
        url: '/api/v1/cart/items',
        method: 'POST',
        body: { productId, quantity },
      }),
      invalidatesTags: ['Cart'],
    }),

    getCartItems: builder.query({
      query: () => ({
        url: '/api/v1/Cart',
        method: 'GET',
      }),
      providesTags: ['Cart'],
    }),

    updateCartItemQuantity: builder.mutation({
      query: ({ cartItemId, quantity }) => ({
        url: `/api/v1/Cart/items/${cartItemId}`,
        method: 'PUT',
        body: { quantity },
      }),
      invalidatesTags: ['Cart'], // so getCartItems refetches automatically
    }),

    removeCartItem: builder.mutation({
      query: ({ id }) => ({
        url: `/api/v1/Cart/items/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cart'], 
    }),

    removeCart: builder.mutation({
      query: () => ({
        url: `/api/v1/Cart/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cart'], 
    }),


    // Whatssap
   createWhatsappOrder: builder.mutation({
    query: (orderData) => ({
      url: 'api/v1/Cart/whatsapp-order',
      method: 'POST',
      body: orderData,
    }),
  }),



  }),
});

export const {
  useAddFilterMutation,
  useGetFiltersQuery,
  useRemoveFilterMutation,
  useGetBannersQuery,
  useDeleteBannerMutation,
  useAddBannerMutation,
  useLoginMutation,
  useSignupMutation,
  useGetMeQuery,
  useGetCategoriesQuery,
  useGetSubCategoriesQuery,
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
  useGetProductQuery,
  useGetProductsSummaryQuery,
  useGetProductSpecificationsQuery,
  useAddProductSpecificationsMutation,
  useUpdateProductSpecificationsMutation,
  useDeleteProductSpecificationsMutation,
  useFilterProductsMutation,
  useActivateUserMutation,
  useDeActivateUserMutation,
  useLogoutMutation,
  useEditUserRoleMutation,
  useChangePasswordMutation,
  useAddDetailImagesMutation,
  useAddCartItemMutation,
  useGetCartItemsQuery,
  useUpdateCartItemQuantityMutation,
  useRemoveCartItemMutation,
  useRemoveCartMutation,
  useCreateWhatsappOrderMutation
} = API;
