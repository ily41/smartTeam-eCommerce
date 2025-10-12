import React, { useEffect, useState } from 'react'
import { useEditProductWithImageMutation, useGetCategoriesQuery, useGetBrandsQuery, useGetProductQuery, useGetUserRolesQuery } from '../../../store/API';
import { toast } from 'react-toastify';

const EditProduct = ({setOpen, idPr}) => {
    const { data: edit, isLoading: loading, error, isError } = useGetProductQuery(idPr, { skip: !idPr });
    const [editProductWithImage, { isLoading: isEditLoading }] = useEditProductWithImageMutation(); 
    const { data: categories, isLoading: isCategoriesLoading } = useGetCategoriesQuery();
    const { data: brands, isLoading: isBrandsLoading } = useGetBrandsQuery();
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const { data: userRoles,  isRolesLoading, refetch } = useGetUserRolesQuery();
    console.log(userRoles)
    

    
    const [formData, setFormData] = useState({
      id: '',
      name: '',
      description: '',
      shortDescription: '',
      isHotDeal: false,
      isActive: true,
      stockQuantity: 0,
      categoryId: '',
      brandId: '',
      prices: []
    });

    useEffect(() => {
      if (edit && edit.id) {
        
        const pricesArray = edit.prices && edit.prices.length > 0 
          ? edit.prices.map(p => ({
              userRole: p.userRole,
              price: p.price || 0,
              discountedPrice: p.discountedPrice || 0,
              discountPercentage: p.discountPercentage || 0
            }))
          : [
              { userRole: 1, price: 0, discountedPrice: 0, discountPercentage: 0 },
              { userRole: 2, price: 0, discountedPrice: 0, discountPercentage: 0 },
              { userRole: 3, price: 0, discountedPrice: 0, discountPercentage: 0 },
              { userRole: 4, price: 0, discountedPrice: 0, discountPercentage: 0 }
            ];

        setFormData({
          id: edit.id || '',
          name: edit.name || '',
          description: edit.description || '',
          shortDescription: edit.shortDescription || '',
          isHotDeal: Boolean(edit.isHotDeal),
          isActive: Boolean(edit.isActive),
          stockQuantity: edit.stockQuantity || 0,
          categoryId: edit.categoryId || '',
          brandId: edit.brandId || '',
          prices: pricesArray
        });
        
        // Set existing image preview if available
        if (edit.imageUrl) {
          setImagePreview(edit.imageUrl);
        }
      }
    }, [edit]);

    const handleInputChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : name === "stockQuantity" ? Number(value) : value
      }));
    };

    const handlePriceChange = (value, field, index) => {
      setFormData((prev) => {
        const updatedPrices = prev.prices.map((priceObj, i) => {
          if (i === index) {
            const updatedObj = { ...priceObj, [field]: parseFloat(value) || 0 };

            const price = updatedObj.price;
            const discountedPrice = updatedObj.discountedPrice;
            const discountPercentage =
              price > 0
                ? Math.round(((price - discountedPrice) / price) * 100)
                : 0;

            return { ...updatedObj, discountPercentage };
          }
          return priceObj;
        });

        return { ...prev, prices: updatedPrices };
      });
    };

    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        // Validate file type
        if (!file.type.startsWith('image/')) {
          toast.error('Please select a valid image file');
          return;
        }
        
        // Validate file size (e.g., max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          toast.error('Image size should be less than 5MB');
          return;
        }
        
        setImageFile(file);
        
        // Create preview using URL.createObjectURL
        const url = URL.createObjectURL(file);
        setImagePreview(url);
      }
    };

    const removeImage = () => {
      setImageFile(null);
      setImagePreview(edit?.imageUrl || null);
    };

    const handleProductEdit = async (e) => {
      e.preventDefault(); 
      
      try {
        const productData = {
          name: formData.name,
          description: formData.description,
          shortDescription: formData.shortDescription,
          isHotDeal: formData.isHotDeal,
          isActive: formData.isActive,
          stockQuantity: formData.stockQuantity,
          categoryId: formData.categoryId,
          brandId: formData.brandId,
          prices: formData.prices
        };
        
        
        // Create FormData for multipart/form-data
        const formDataToSend = new FormData();
        
        // Add image file if exists
        if (imageFile) {
          formDataToSend.append("imageFile", imageFile);
        }
        
        // Stringify the product data for the query parameter
        const productDataString = JSON.stringify(productData);
        
        // Send the request
        const result = await editProductWithImage({
          id: idPr,
          productData: productDataString,
          formData: formDataToSend
        }).unwrap();
        
        setImageFile(null)
        toast.success("Product updated successfully");
        setOpen();
      } catch (error) {
        console.error('Edit error:', error);
        toast.error(error?.data?.message || error?.data || "Editing Product failed");
      }
    };
    
    return (
      <div className="bg-[#1f1f1f] text-white p-6 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto dark-scrollbar">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Edit Product</h2>
        </div>

        <div className="space-y-6">
          {/* Image Upload Section */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Product Image
            </label>
            <div className="flex items-center gap-4">
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imageFile ? imagePreview : `https://smartteamaz-001-site1.qtempurl.com/${imagePreview}`}
                    alt="Product preview"
                    className="w-32 h-32 object-cover rounded-md border border-gray-600"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 bg-red-600 hover:bg-red-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className="w-32 h-32 bg-[#2c2c2c] border-2 border-dashed border-gray-600 rounded-md flex items-center justify-center">
                  <span className="text-gray-500 text-sm">No image</span>
                </div>
              )}
              
              <div className="flex-1">
                <input
                  type="file"
                  id="imageFile"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <label
                  htmlFor="imageFile"
                  className="inline-block px-4 py-2 bg-[#2c2c2c] hover:bg-[#3c3c3c] border border-gray-600 rounded-md cursor-pointer transition-colors"
                >
                  {imageFile ? 'Change Image' : 'Upload Image'}
                </label>
                <p className="text-xs text-gray-400 mt-2">
                  Supported formats: JPG, PNG, GIF (max 5MB)
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-[#2c2c2c] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter product name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Category *</label>
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-[#2c2c2c] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select Category</option>
                {categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Brand *</label>
              <select
                name="brandId"
                value={formData.brandId}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-[#2c2c2c] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select Brand</option>
                {brands?.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Stock Quantity *</label>
              <input
                type="number"
                name="stockQuantity"
                value={formData.stockQuantity}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-[#2c2c2c] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="0"
              />
            </div>
          </div>

          {/* Hot Deal Toggle */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isHotDeal"
              name="isHotDeal"
              checked={formData.isHotDeal}
              onChange={handleInputChange}
              className="w-4 h-4 text-indigo-600 bg-[#2c2c2c] border-gray-600 rounded focus:ring-indigo-500 focus:ring-2"
            />
            <label htmlFor="isHotDeal" className="text-sm font-medium">
              Mark as Hot Deal
            </label>
          </div>


          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
              className="w-full px-3 py-2 bg-[#2c2c2c] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter product description"
            />
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-sm font-medium mb-2">Short Description</label>
            <textarea
              name="shortDescription"
              rows="2"
              value={formData.shortDescription}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-[#2c2c2c] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter short description"
            />
          </div>

          {/* Pricing Section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-medium">Pricing by User Role</label>
            </div>
            <div className="border border-gray-600 rounded-md">
              {formData.prices.length > 0 ? (
                formData.prices.map((item, index) => {
                  console.log(item)
                  return(
                  <div key={index} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-[#2c2c2c] border-b border-gray-600 last:border-b-0">
                      {/* User Role */}
                      <div className="flex items-center">
                        <label className="block text-md font-medium">{userRoles[item.userRole].name}</label>
                      </div>

                      {/* Price */}
                      <div>
                        <label className="block text-xs font-medium mb-1">Price</label>
                        <input
                          type="number"
                          value={item.price}
                          onChange={(e) => handlePriceChange(e.target.value, 'price', index)}
                          min="0"
                          step="0.01"
                          className="w-full px-2 py-2 bg-[#1f1f1f] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                          placeholder="0.00"
                        />
                      </div>

                      {/* Discounted Price */}
                      <div>
                        <label className="block text-xs font-medium mb-1 whitespace-nowrap">Discounted Price</label>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.discountedPrice}
                          onChange={(e) => handlePriceChange(e.target.value, 'discountedPrice', index)}
                          className="w-full px-2 py-2 bg-[#1f1f1f] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                          placeholder="0.00"
                        />
                      </div>

                      {/* Discount Percentage (Read-only) */}
                      <div>
                        <label className="block text-xs font-medium mb-1">Discount %</label>
                        <input
                          type="number"
                          value={item.discountPercentage}
                          readOnly
                          className="w-full px-2 py-2 bg-[#1f1f1f] border border-gray-600 rounded-md text-sm text-gray-400"
                        />
                      </div>
                    </div>
                  </div>
                )})
              ) : (
                <div className="p-4 text-center text-gray-400">Loading prices...</div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={setOpen}
              className="px-6 py-2 bg-gray-600 hover:bg-gray-700 rounded-md font-semibold"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleProductEdit}
              disabled={isEditLoading}
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isEditLoading ? 'Updating...' : 'Update product'}
            </button>
          </div>
        </div>
      </div>
    )
}

export default EditProduct