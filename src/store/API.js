import {
  createApi,
  fetchBaseQuery
} from '@reduxjs/toolkit/query/react';

export const API = createApi({
  reducerPath: 'API',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://smartteamaz-001-site1.qtempurl.com',
    prepareHeaders: (headers, {
      endpoint,
      body
    }) => {
      const isFormDataRequest =
        endpoint === 'addProduct' ||
        endpoint === 'addCategoryImage' ||
        endpoint === 'addDetailImages' ||
        endpoint === 'addBanner' ||
        endpoint === 'uploadFile' ||
        endpoint === 'addProductPdf' ||
        body instanceof FormData;

      if (!isFormDataRequest) {
        headers.set('Content-Type', 'application/json');
      }

      const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1]


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
      query: ({
        email,
        password
      }) => ({
        url: '/api/v1/Auth/login',
        method: 'POST',
        body: {
          email,
          password
        },
      }),
      invalidatesTags: ['Auth'],
    }),

    signup: builder.mutation({
      query: ({
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        confirmPassword
      }) => ({
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
      query: ({
        name,
        imageUrl,
        description,
        sortOrder,
        parentCategoryId
      }) => ({
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
      query: ({
        name,
        imageUrl,
        description,
        sortOrder,
        id,
        isActive
      }) => ({
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
      query: ({
        id
      }) => ({
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
      query: ({
        newPass,
        currentPass,
        confirmNewPassword
      }) => ({
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
      query: ({
        firstName,
        lastName,
        phoneNumber,
        role,
        isActive,
        id
      }) => ({
        url: `/api/v1/Admin/users/${id}`,
        method: 'PUT',
        body: {
          firstName,
          lastName,
          phoneNumber,
          role,
          isActive
        },
      }),
      invalidatesTags: ['Users'],
    }),

    deleteUser: builder.mutation({
      query: ({
        id
      }) => ({
        url: `/api/v1/Admin/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users'],
    }),

    editUserRole: builder.mutation({
      query: ({
        role,
        id
      }) => ({
        url: `/api/v1/Admin/users/${id}/role`,
        method: 'PUT',
        body: {
          role
        },
      }),
      invalidatesTags: ['Users'],
    }),

    activateUser: builder.mutation({
      query: ({
        id
      }) => ({
        url: `/api/v1/Admin/users/${id}/activate`,
        method: 'POST',
      }),
      invalidatesTags: ['Users'],
    }),

    deActivateUser: builder.mutation({
      query: ({
        id
      }) => ({
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
      providesTags: (result, error, id) => [{
        type: 'Products',
        id
      }],
    }),

    getProductsBrand: builder.query({
      query: ({brandSlug}) => ({
        url: `/api/v1/Products/brand/${brandSlug}`,
        method: 'GET',
      }),
    }),

    getBrands: builder.query({
      query: () => ({
        url: '/api/v1/Admin/brands',
        method: 'GET',
      }),
    }),

    getBrand: builder.query({
      query: ({id}) => ({
        url: `/api/v1/Admin/brands${id}`,
        method: 'GET',
      }),
    }),

    getHotDeals: builder.query({
      query: () => ({
        url: '/api/v1/Products/hot-deals',
        method: 'GET',
      }),
      providesTags: ['Products'],
    }),

    getRecommended: builder.query({
      query: ({
        categoryId,
        productId,
        limit
      }) => ({
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
      query: ({
        id,
        images
      }) => ({
        url: `/api/v1/Products/${id}/upload-images`,
        method: 'POST',
        body: images,
        prepareHeaders: headers => {
          headers.delete('Content-Type');
          return headers;
        },
      }),
      invalidatesTags: (result, error, {
        id
      }) => [{
        type: 'Products',
        id
      }, 'Products'],
    }),

    deleteProduct: builder.mutation({
      query: ({
        id
      }) => ({
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
      invalidatesTags: ['Products'],
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
      query: ({
        q
      }) => ({
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
      providesTags: (result, error, id) => [{
        type: 'Products',
        id
      }],
    }),

    addProductSpecifications: builder.mutation({
      query: ({
        id,
        productId,
        specificationGroups
      }) => ({
        url: `/api/v1/Products/${id}/specifications`,
        method: 'POST',
        body: {
          productId,
          specificationGroups,
        },
      }),
      invalidatesTags: (result, error, {
        id
      }) => [{
        type: 'Products',
        id
      }],
    }),

    updateProductSpecifications: builder.mutation({
      query: ({
        id,
        specificationGroups
      }) => ({
        url: `/api/v1/Products/${id}/specifications`,
        method: 'PUT',
        body: {
          specificationGroups,
        },
      }),
      invalidatesTags: (result, error, {
        id
      }) => [{
        type: 'Products',
        id
      }],
    }),

    deleteProductSpecifications: builder.mutation({
      query: ({
        id
      }) => ({
        url: `/api/v1/Products/${id}/specifications`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, {
        id
      }) => [{
        type: 'Products',
        id
      }],
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
      query: ({
        id
      }) => ({
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

    updateBanner: builder.mutation({
      query: ({
        id,
        ...data
      }) => ({
        url: `/api/v1/Admin/banners/${id}`,
        method: 'PUT',
        body: data,
        // Remove prepareHeaders - let it use default JSON content-type
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
      query: ({
        name,
        isActive,
        sortOrder,
        options
      }) => ({
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
      query: ({
        id
      }) => ({
        url: `/api/v1/Admin/filters/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Filters'],
    }),


    removeFilterOption: builder.mutation({
      query: ({
        filterId,
        optionId
      }) => ({
        url: `/api/v1/Admin/filters/${filterId}/options/${optionId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Filters'],
    }),

    removeAllFiltersFromProduct: builder.mutation({
      query: ({
        productId
      }) => ({
        url: `/api/v1/Admin/products/${productId}/filters`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Filters'],
    }),

    removeCustomFilterFromProduct: builder.mutation({
      query: ({
        productId,
        filterId
      }) => ({
        url: `/api/v1/Admin/products/${productId}/filters/${filterId}`,
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
      providesTags: (result, error, categoryId) => [{
        type: 'CategoryFilters',
        id: categoryId
      }],
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
      query: ({
        productId,
        quantity
      }) => ({
        url: '/api/v1/cart/items',
        method: 'POST',
        body: {
          productId,
          quantity
        },
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

    getCartCount: builder.query({
      query: () => ({
        url: '/api/v1/Cart/count',
        method: 'GET',
      }),
      providesTags: ['Cart'],
    }),

    updateCartItemQuantity: builder.mutation({
      query: ({
        cartItemId,
        quantity
      }) => ({
        url: `/api/v1/Cart/items/${cartItemId}`,
        method: 'PUT',
        body: {
          quantity
        },
      }),
      invalidatesTags: ['Cart'],
    }),

    removeCartItem: builder.mutation({
      query: ({
        id
      }) => ({
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
      query: ({
        productId
      }) => ({
        url: '/api/v1/Favorites',
        method: 'POST',
        body: {
          productId
        },
      }),
      invalidatesTags: ['Favorites', 'Product'],
    }),

    removeFavorite: builder.mutation({
      query: ({
        productId
      }) => ({
        url: `/api/v1/Favorites/${productId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Favorites', 'Product'],
    }),

    getFavorites: builder.query({
      query: ({
        page = 1,
        pageSize = 20
      }) => ({
        url: '/api/v1/Favorites',
        method: 'GET',
        params: {
          page,
          pageSize
        },
      }),
      providesTags: ['Favorites'],
    }),

    getFavoritesCount: builder.query({
      query: () => ({
        url: '/api/v1/Favorites/count',
        method: 'GET',
      }),
      providesTags: ['Favorites'],
    }),

    getFavoriteStatus: builder.query({
      query: ({
        productId
      }) => ({
        url: `/api/v1/Favorites/status/${productId}`,
        method: 'GET',
      }),
      providesTags: (result, error, {
        productId
      }) => [{
        type: 'Favorites',
        id: productId
      }],
    }),

    toggleFavorite: builder.mutation({
      query: ({
        productId
      }) => ({
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

    getFilesUser: builder.query({
      query: () => '/api/v1/files',
      providesTags: ['FilesUser'],
    }),

    getFiles: builder.query({
      query: () => '/api/v1/Admin/files',
      providesTags: ['Files'],
    }),

    // GET file by ID
    getFileById: builder.query({
      query: (id) => `/api/v1/Admin/files/${id}`,
      providesTags: (result, error, id) => [{
        type: 'Files',
        id
      }],
    }),

    // DELETE file
    removeFile: builder.mutation({
      query: (id) => ({
        url: `/api/v1/Admin/files/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Files'],
    }),

    // POST upload file
    uploadFile: builder.mutation({
      query: (formData) => ({
        url: '/api/v1/Admin/files/upload',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Files'],
    }),

    // Pdf Products

    getProductPdfs: builder.query({
      query: () => ({
        url: '/api/v1/Admin/product-pdfs',
        method: 'GET',
      }),
      providesTags: ['ProductPdfs'],
    }),

    // GET single product PDF by ID
    getProductPdfById: builder.query({
      query: ({
        id
      }) => ({
        url: `/api/v1/Admin/product-pdfs/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, {
        id
      }) => [{
        type: 'ProductPdfs',
        id
      }],
    }),

    // POST - Add PDF to product
    addProductPdf: builder.mutation({
      query: ({
        productId,
        formData
      }) => ({
        url: `/api/v1/Admin/products/${productId}/pdf`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['ProductPdfs', 'Products'],
    }),

    // DELETE product PDF
    deleteProductPdf: builder.mutation({
      query: ({
        id
      }) => ({
        url: `/api/v1/Admin/product-pdfs/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ProductPdfs', 'Products'],
    }),

    getProductPdfByIdUser: builder.query({
      query: ({
        productId
      }) => ({ // ✅ Correct - matches what you pass
        url: `/api/v1/product-pdfs/download/product/${productId}`,
        method: 'GET',
        responseHandler: async (response) => {
          if (!response.ok) {
            throw new Error('Failed to download PDF');
          }
          return await response.blob();
        },
      }),
      keepUnusedDataFor: 60,
    }),

    // In your API slice file

    // Add this endpoint to your existing API endpoints

    // Add this endpoint to your existing API endpoints

    downloadFile: builder.mutation({
      queryFn: async (id, _api, _extraOptions, baseQuery) => {
        try {
          // Get token from cookies (same as your existing setup)
          const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];

          // Make the request
          const response = await fetch(
            `https://smartteamaz-001-site1.qtempurl.com/api/v1/Files/download/${id}`, {
              method: 'GET',
              headers: {
                'Authorization': token ? `Bearer ${token}` : '',
              },
            }
          );

          // Check if response is ok
          if (!response.ok) {
            const errorText = await response.text();
            return {
              error: {
                status: response.status,
                data: {
                  message: errorText || 'Download failed'
                },
              },
            };
          }

          // Get the blob data
          const blob = await response.blob();

          // Get filename from content-disposition header
          const contentDisposition = response.headers.get('content-disposition');
          let filename = 'download.pdf';

          if (contentDisposition) {
            const filenameMatch = contentDisposition.match(/filename\*?=['"]?(?:UTF-8'')?([^;\r\n"']*)['"]?/);
            if (filenameMatch && filenameMatch[1]) {
              filename = decodeURIComponent(filenameMatch[1]);
            }
          }

          // Create blob URL immediately (not stored in Redux)
          const url = window.URL.createObjectURL(blob);

          // Return only serializable data
          return {
            data: {
              url,
              filename
            }
          };
        } catch (error) {
          return {
            error: {
              status: 'FETCH_ERROR',
              data: {
                message: error.message
              },
            },
          };
        }
      },
    }),

    // Don't forget to export the hook:
    // export const { ..., useDownloadFileMutation } = API;

    // Don't forget to export the hook:
    // export const { ..., useDownloadFileMutation } = API;

  }),
});

export const {
  useGetProductPdfByIdQuery,
  useGetProductPdfsQuery,
  useDeleteProductPdfMutation,
  useAddProductPdfMutation,
  useGetProductPdfByIdUserQuery,

  useAddFilterMutation,
  useGetFiltersQuery,
  useRemoveFilterMutation,
  useAssignFilterMutation,
  useAssignFiltersBulkMutation,
  useGetCategoryFiltersQuery,
  useRemoveFilterOptionMutation,
  useRemoveAllFiltersFromProductMutation,
  useRemoveCustomFilterFromProductMutation,

  useGetBannersQuery,
  useDeleteBannerMutation,
  useAddBannerMutation,
  useUpdateBannerMutation,
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
  useGetBrandsQuery,
  useGetBrandQuery,
  useGetProductsBrandQuery,

  useLogoutMutation,
  useEditUserRoleMutation,
  useChangePasswordMutation,

  useAddCartItemMutation,
  useGetCartItemsQuery,
  useUpdateCartItemQuantityMutation,
  useRemoveCartItemMutation,
  useRemoveCartMutation,
  useCreateWhatsappOrderMutation,
  useGetCartCountQuery,

  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
  useGetFavoritesQuery,
  useGetFavoriteStatusQuery,
  useToggleFavoriteMutation,
  useBulkCheckFavoriteStatusMutation,
  useGetFavoritesCountQuery,
  useClearFavoritesMutation,


  useGetFilesQuery,
  useGetFilesUserQuery,
  useGetFileByIdQuery,
  useRemoveFileMutation,
  useUploadFileMutation,
  useDownloadFileMutation
} = API;