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

  tagTypes: ['Categories', 'Users', 'Products', 'Banners', 'Filters', 'Cart', 'Auth'],

  endpoints: builder => ({
    // *AUTHENTICATION*
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: '/api/v1/Auth/login',
        method: 'POST',
        body: { email, password },
      }),
      invalidatesTags: ['Auth'],
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
      invalidatesTags: ['Auth'],
    }),

    // *CATEGORIES*

    getParentCategories: builder.query({
      query: () => ({
        url: '/api/v1/Categories/root',
        method: 'GET',
      }),
      providesTags: ['Categories'],
    }),
    
    getSubCategories: builder.query({
      query: (id) => ({
        url: `/api/v1/Categories/${id}/subcategories`,
        method: 'GET',
      }),
      providesTags: ['Categories'],
    }),

    getCategory: builder.query({
      query: (slug) => ({
        url: `/api/v1/Categories/slug/${slug}`,
        method: 'GET',
      }),
      providesTags: ['Categories'],
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
      invalidatesTags: ['Categories'],
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
      invalidatesTags: ['Categories'],
    }),

    deleteCategory: builder.mutation({
      query: ({ id }) => ({
        url: `/api/v1/Categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Categories'],
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
      invalidatesTags: ['Categories'],
    }),

    // *USERS*
    getMe: builder.query({
      query: () => ({
        url: '/api/v1/Auth/me',
        method: 'GET',
      }),
      providesTags: ['Auth'],
    }),

    getUsers: builder.query({
      query: () => ({
        url: '/api/v1/Admin/Users',
        method: 'GET',
      }),
      providesTags: ['Users'],
    }),

    getUserStatics: builder.query({
      query: () => ({
        url: '/api/v1/Admin/users/statistics',
        method: 'GET',
      }),
      providesTags: ['Users'],
    }),

    getUserRoles: builder.query({
      query: () => ({
        url: '/api/v1/Admin/users/roles',
        method: 'GET',
      }),
      providesTags: ['Users'],
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
      invalidatesTags: ['Auth'],
    }),

    getCategories: builder.query({
      query: () => ({
        url: '/api/v1/Categories',
        method: 'GET',
      }),
      providesTags: ['Categories'],
    }),

    editUser: builder.mutation({
      query: ({ firstName, lastName, phoneNumber, role, isActive, id }) => ({
        url: `/api/v1/Admin/users/${id}`,
        method: 'PUT',
        body: { firstName, lastName, phoneNumber, role, isActive },
      }),
      invalidatesTags: ['Users'],
    }),

    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `/api/v1/Admin/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users'],
    }),

    editUserRole: builder.mutation({
      query: ({ role, id }) => ({
        url: `/api/v1/Admin/users/${id}/role`,
        method: 'PUT',
        body: { role },
      }),
      invalidatesTags: ['Users'],
    }),

    activateUser: builder.mutation({
      query: ({ id }) => ({
        url: `/api/v1/Admin/users/${id}/activate`,
        method: 'POST',
      }),
      invalidatesTags: ['Users'],
    }),

    deActivateUser: builder.mutation({
      query: ({ id }) => ({
        url: `/api/v1/Admin/users/${id}/deactivate`,
        method: 'POST',
      }),
      invalidatesTags: ['Users'],
    }),

    logout: builder.mutation({
      query: () => ({
        url: '/api/v1/Auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['Auth', 'Cart'],
    }),

    // *PRODUCTS*
    getProducts: builder.query({
      query: () => ({
        url: '/api/v1/Products',
        method: 'GET',
      }),
      providesTags: ['Products'],
    }),

    getProduct: builder.query({
      query: (id) => ({
        url: `/api/v1/Products/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'Products', id }],
    }),

    getHotDeals: builder.query({
      query: () => ({
        url: '/api/v1/Products/hot-deals',
        method: 'GET',
      }),
      providesTags: ['Products'],
    }),

   getRecommended: builder.query({
      query: ({ categoryId, productId, limit }) => ({
        url: '/api/v1/Products/recommendations',
        method: 'GET',
        params: {
          categoryId,
          productId,
          limit,
        },
      }),
      providesTags: ['Products'],
    }),
    
    getProductsSummary: builder.query({
      query: () => ({
        url: '/api/v1/Admin/products/stock/summary',
        method: 'GET',
      }),
      providesTags: ['Products'],
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
      invalidatesTags: ['Products'],
    }),

    addDetailImages: builder.mutation({
      query: ({ id, images }) => ({
        url: `/api/v1/Products/${id}/upload-images`,
        method: 'POST',
        body: images,
        prepareHeaders: headers => {
          headers.delete('Content-Type');
          return headers;
        },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Products', id }, 'Products'],
    }),

    deleteProduct: builder.mutation({
      query: ({ id }) => ({
        url: `/api/v1/Products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products'],
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
      invalidatesTags: (result, error, { id }) => [{ type: 'Products', id }, 'Products'],
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

    searchProducts: builder.query({
      query: ({q}) => ({
        url: '/api/v1/Products/search',
        method: 'GET',
        params: {
          q
        },

      }),
      providesTags: ['Products'],
    }),

    // *PRODUCT SPECIFICATIONS*
    getProductSpecifications: builder.query({
      query: (id) => ({
        url: `/api/v1/Products/${id}/specifications`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'Products', id }],
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
      invalidatesTags: (result, error, { id }) => [{ type: 'Products', id }],
    }),

    updateProductSpecifications: builder.mutation({
      query: ({ id, specificationGroups }) => ({
        url: `/api/v1/Products/${id}/specifications`,
        method: 'PUT',
        body: {
          specificationGroups,
        },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Products', id }],
    }),

    deleteProductSpecifications: builder.mutation({
      query: ({ id }) => ({
        url: `/api/v1/Products/${id}/specifications`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Products', id }],
    }),

    // *BANNERS*
    getBanners: builder.query({
      query: () => ({
        url: '/api/v1/Admin/banners',
        method: 'GET',
      }),
      providesTags: ['Banners'],
    }),

    deleteBanner: builder.mutation({
      query: ({ id }) => ({
        url: `/api/v1/Admin/banners/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Banners'],
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
      invalidatesTags: ['Banners'],
    }),

    // *FILTERS*
    getFilters: builder.query({
      query: () => ({
        url: '/api/v1/Products/filters',
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
      }),
      invalidatesTags: ['Filters'],
    }),

    removeFilter: builder.mutation({
      query: ({ id }) => ({
        url: `/api/v1/Admin/filters/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Filters'], 
    }),

    assignFilter: builder.mutation({
      query: (filterData) => ({
        url: '/api/v1/Admin/products/filters/assign',
        method: 'POST',
        body: filterData,
      }),
      invalidatesTags: ['Filter', 'Product'],
    }),

    getCategoryFilters: builder.query({
      query: (categoryId) => ({
        url: `/api/v1/Products/category/${categoryId}/filters`,
        method: 'GET',
      }),
      providesTags: (result, error, categoryId) => [
        { type: 'CategoryFilters', id: categoryId }
      ],
    }),

    // Bulk filter assignment mutation
    assignFiltersBulk: builder.mutation({
      query: (bulkFilterData) => ({
        url: '/api/v1/Admin/products/filters/bulk-assign',
        method: 'POST',
        body: bulkFilterData,
      }),
      invalidatesTags: ['Filter', 'Product'],
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
      invalidatesTags: ['Cart'],
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

    // Whatsapp
    createWhatsappOrder: builder.mutation({
      query: (orderData) => ({
        url: 'api/v1/Cart/whatsapp-order',
        method: 'POST',
        body: orderData,
      }),
      invalidatesTags: ['Cart'],
    }),

    // Favorites
    addFavorite: builder.mutation({
      query: ({ productId }) => ({
        url: '/api/v1/Favorites',
        method: 'POST',
        body: { productId },
      }),
      invalidatesTags: ['Favorites', 'Product'],
        }),

    removeFavorite: builder.mutation({
      query: ({ productId }) => ({
        url: `/api/v1/Favorites/${productId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Favorites', 'Product'],
        }),

    getFavorites: builder.query({
      query: ({ page = 1, pageSize = 20 }) => ({
        url: '/api/v1/Favorites',
        method: 'GET',
        params: { page, pageSize },
      }),
      providesTags: ['Favorites'],
        }),

    getFavoriteStatus: builder.query({
      query: ({ productId }) => ({
        url: `/api/v1/Favorites/status/${productId}`,
        method: 'GET',
      }),
      providesTags: (result, error, { productId }) => [
        { type: 'Favorites', id: productId }
      ],
        }),

    toggleFavorite: builder.mutation({
      query: ({ productId }) => ({
        url: `/api/v1/Favorites/toggle/${productId}`,
        method: 'POST',
      }),
      invalidatesTags: ['Favorites', 'Product'],
        }),

    bulkCheckFavoriteStatus: builder.mutation({
      query: (productIds) => ({
        url: '/api/v1/Favorites/bulk-status',
        method: 'POST',
        body: productIds,
      }),
      // Note: This returns status data, so you might want to update cache instead of invalidating
        }),

    getFavoritesCount: builder.query({
      query: () => ({
        url: '/api/v1/Favorites/count',
        method: 'GET',
      }),
      providesTags: ['Favorites'],
        }),

    clearFavorites: builder.mutation({
      query: () => ({
        url: '/api/v1/Favorites/clear',
        method: 'DELETE',
      }),
      invalidatesTags: ['Favorites'],
    }),

  }),
});

export const {
  useAddFilterMutation,
  useGetFiltersQuery,
  useRemoveFilterMutation,
  useAssignFilterMutation,     
  useAssignFiltersBulkMutation,
  useGetCategoryFiltersQuery,



  useGetBannersQuery,
  useDeleteBannerMutation,
  useAddBannerMutation,


  useLoginMutation,
  useSignupMutation,
  useGetMeQuery,


  useGetCategoriesQuery,
  useGetSubCategoriesQuery,
  useGetParentCategoriesQuery,
  useAddCategoryMutation,
  useAddCategoryImageMutation,
  useEditCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoryQuery,


  useGetProductsQuery,
  useGetHotDealsQuery, 
  useGetRecommendedQuery,


  
  
  useGetUserStaticsQuery,
  useEditUserMutation,
  useDeleteUserMutation,
  useGetUserRolesQuery,
  useGetUsersQuery,
  useActivateUserMutation,
  useDeActivateUserMutation,


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
  useAddDetailImagesMutation,
  useSearchProductsQuery,


  


  
  useLogoutMutation,
  useEditUserRoleMutation,
  useChangePasswordMutation,
  
  useAddCartItemMutation,
  useGetCartItemsQuery,
  useUpdateCartItemQuantityMutation,
  useRemoveCartItemMutation,
  useRemoveCartMutation,
  useCreateWhatsappOrderMutation,

  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
  useGetFavoritesQuery,
  useGetFavoriteStatusQuery,
  useToggleFavoriteMutation,
  useBulkCheckFavoriteStatusMutation,
  useGetFavoritesCountQuery,
  useClearFavoritesMutation,
  
} = API;