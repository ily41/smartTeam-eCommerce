import { useState } from "react";
import { X, Upload, Trash2, Plus } from "lucide-react";
import { useAddProductMutation, useGetCategoriesQuery, useGetUserRolesQuery } from "../../../store/API";
import { toast } from "react-toastify";

const ProductFormUI = ({setOpen}) => {

  const { data: userRoles, error, isRolesLoading, refetch } = useGetUserRolesQuery();
  const { data: categories, isLoading, errorC } = useGetCategoriesQuery();
  const [addProduct, { isLoading: isProductLoading }] = useAddProductMutation(); 


  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    shortDescription: "",
    sku: "",
    isHotDeal: false,
    stockQuantity: 0,
    categoryId: "",
    prices: [
      {
        userRole: 1,
        price: 0,
        discountedPrice: 0,
        discountPercentage: 0
      },
      {
        userRole: 2,
        price: 0,
        discountedPrice: 0,
        discountPercentage: 0
      },
      {
        userRole: 3,
        price: 0,
        discountedPrice: 0,
        discountPercentage: 0
      },
      {
        userRole: 4,
        price: 0,
        discountedPrice: 0,
        discountPercentage: 0
      }
    ]
  });

const [imageFiles, setImageFiles] = useState([]);

const handleFileUpload = async (e) => {
  const files = Array.from(e.target.files);
  
  const newPreviews = await Promise.all(
    files.map(async (file, index) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          resolve({
            id: `${Date.now()}-${index}`,
            url: event.target.result,
            name: file.name,
            file: file
          });
        };
        reader.readAsDataURL(file);
      });
    })
  );
  
  setImageFiles(prev => [...prev, ...files]);
  setImagePreviews(prev => [...prev, ...newPreviews]);
  
  e.target.value = "";
};

const removeImage = (id) => {
  const imageToRemove = imagePreviews.find(img => img.id === id);
  if (imageToRemove) {
    setImageFiles(prev => prev.filter(file => file !== imageToRemove.file));
  }
  setImagePreviews(prev => prev.filter(img => img.id !== id));
};

const handleProduct = async (e) => {
  console.log("adding ATTEMPT")
  e.preventDefault(); 
  try {
    const formDataToSend = new FormData();
    formDataToSend.append('productData', JSON.stringify(formData));
    
    imageFiles.forEach(file => {
      formDataToSend.append('imageFile', file);
    });
    
    const result = await addProduct(formDataToSend).unwrap();
    
    toast.success("Product added successfully");
    setFormData({
      name: "",
      description: "",
      shortDescription: "",
      sku: "",
      isHotDeal: false,
      stockQuantity: 0,
      categoryId: "",
      prices: [
        { userRole: 1, price: 0, discountedPrice: 0, discountPercentage: 0 },
        { userRole: 2, price: 0, discountedPrice: 0, discountPercentage: 0 },
        { userRole: 3, price: 0, discountedPrice: 0, discountPercentage: 0 },
        { userRole: 4, price: 0, discountedPrice: 0, discountPercentage: 0 },
      ],
    });
    setImagePreviews([]);
    setImageFiles([]);
    setOpen();
  } catch (error) {
    console.log(error)
    toast.error(error?.data);
  }
}

<div>
  <label className="block text-sm font-medium mb-2">Product Images</label>
  <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
    <input
      type="file"
      multiple
      accept="image/*"
      onChange={handleFileUpload}
      className="hidden"
      id="image-upload"
    />
    <label
      htmlFor="image-upload"
      className="cursor-pointer flex flex-col items-center gap-2"
    >
      <Upload className="w-8 h-8 text-gray-400" />
      <span className="text-gray-400">
        Click to upload images or drag and drop
      </span>
      <span className="text-sm text-gray-500">
        PNG, JPG, GIF up to 10MB each
      </span>
    </label>
  </div>
  {imagePreviews.length > 0 && (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
      {imagePreviews.map((preview) => (
        <div key={preview.id} className="relative group">
          <img
            src={preview.url}
            alt={preview.name}
            className="w-full h-24 object-cover rounded-md border border-gray-600"
          />
          <button
            type="button"
            onClick={() => removeImage(preview.id)}
            className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      ))}
    </div>
  )}
</div>





  console.log(formData)
  console.log(JSON.stringify(formData))

  const [imagePreviews, setImagePreviews] = useState([]);

  function convertPrices(formData, userRoles) {
  const relevantRoles = userRoles.filter(role => role.name !== "Admin")

  return relevantRoles.map((role, index) => {
    const priceRow = formData.prices[index] || {}
    const price = parseFloat(priceRow.price) || 0
    const discountedPrice = parseFloat(priceRow.discountedPrice) || 0

    const discountPercentage =
      price > 0 ? (((price - discountedPrice) / price) * 100).toFixed(2) : 0

    return {
      userRole: role.value,
      price,
      discountedPrice,
      discountPercentage: Number(discountPercentage),
    }
  })
}


  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePriceChange = (value, field, index) => {
    setFormData((prev) => {
      const updatedPrices = prev.prices.map((priceObj, i) => {
        if (i === index) {
          // Update the field
          const updatedObj = { ...priceObj, [field]: parseFloat(value) || 0 };

          // Calculate discountPercentage only if price > 0
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





 

  // const mockCategories = [
  //   { id: "cat-1", name: "Electronics" },
  //   { id: "cat-2", name: "Clothing" },
  //   { id: "cat-3", name: "Home & Garden" },
  //   { id: "cat-4", name: "Sports & Outdoors" }
  // ];

  

  return (
    <div className="bg-[#1f1f1f] text-white p-6 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto dark-scrollbar">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Add New Product</h2>
      </div>

      <div className="space-y-6">
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

          {/* SKU */}
          <div>
            <label className="block text-sm font-medium mb-2">SKU *</label>
            <input
              type="text"
              name="sku"
              value={formData.sku}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 bg-[#2c2c2c] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter SKU"
            />
          </div>

          {/* Stock Quantity */}
          <div>
            <label className="block text-sm font-medium mb-2">Stock Quantity *</label>
            <input
              type="number"
              name="stockQuantity"
              value={formData.stockQuantity}
              onChange={handleInputChange}
              required
              min="0"
              className="w-full px-3 py-2 bg-[#2c2c2c] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="0"
            />
          </div>

          {/* Category */}
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
            value={formData.shortDescription}
            onChange={handleInputChange}
            rows="2"
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
            {formData.prices.map((item,index) => (
              <div className="space-y-4">
                <div  className="grid grid-cols-1 md:grid-cols-3 gap-10 p-4 bg-[#2c2c2c] rounded-t-md">
                  {/* User Role */}
                  
                  <div className="flex items-center">
                    <label className="block text-md font-medium mb-1">{userRoles && userRoles[index+1].name}</label>
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-xs font-medium mb-1">Price</label>
                    <input
                      type="number"
                      onChange={(e) => handlePriceChange(e.target.value, 'price', index)}
                      min="0"
                      step="1"
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
                      step="1"
                      onChange={(e) => handlePriceChange(e.target.value, 'discountedPrice', index)}
                      className="w-full px-2 py-2 bg-[#1f1f1f] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                      placeholder="0.00"
                    />
                  </div>


                </div>
              </div>
            ))}
          
            

          </div>
          
        </div>

        {/* Images */}
        <div>
          <label className="block text-sm font-medium mb-2">Product Images</label>
          <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="cursor-pointer flex flex-col items-center gap-2"
            >
              <Upload className="w-8 h-8 text-gray-400" />
              <span className="text-gray-400">
                Click to upload images or drag and drop
              </span>
              <span className="text-sm text-gray-500">
                PNG, JPG, GIF up to 10MB each
              </span>
            </label>
          </div>

          {/* Image Previews */}
          {imagePreviews.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {imagePreviews.map((preview) => (
                <div key={preview.id} className="relative group">
                  <img
                    src={preview.url}
                    alt={preview.name}
                    className="w-full h-24 object-cover rounded-md border border-gray-600"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(preview.id)}
                    className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            className="px-6 py-2 bg-gray-600 hover:bg-gray-700 rounded-md font-semibold"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={ handleProduct}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md font-semibold"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductFormUI;