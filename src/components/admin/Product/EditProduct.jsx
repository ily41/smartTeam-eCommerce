import React, { useEffect, useState } from 'react'
import { useEditCategoryMutation, useEditProductMutation, useGetCategoriesQuery } from '../../../store/API';
import { toast } from 'react-toastify';

const EditProduct = ({setOpen, edit}) => {

    const [editProduct, { isLoading: isCategoryLoading }] = useEditProductMutation(); 
    const { data: categories, isLoading, errorC } = useGetCategoriesQuery();
    const [formData, setFormData] = useState({
      id: edit?.id,
      name: edit?.name,
      description: edit?.description,
      shortDescription:  edit?.shortDescription,
      isHotDeal:  edit?.isHotDeal,
      isActive: edit?.isActive,
      stockQuantity:  edit?.stockQuantity,
      categoryId:  edit?.categoryName,
    });

    useEffect(() => {
      if (edit) {
        setFormData({
          id: edit.id,
          name: edit.name,
          description: edit.description,
          shortDescription: edit.shortDescription,
          isHotDeal: edit.isHotDeal,
          isActive: edit.isActive,
          stockQuantity: edit.stockQuantity,
          categoryId: edit.categoryName, // əgər id lazımdırsa burda düzəlt
        });
      }
    }, [edit]);

    console.log(formData)

    const handleInputChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : name == "stockQuantity" ? Number(value) : value
      }));
    };

    const handleProductEdit = async (e) =>{
      e.preventDefault(); 
       try {
        const result = await editProduct({
            name: formData.name,
            description: formData.description,
            shortDescription: formData.shortDescription,
            isHotDeal: formData.isHotDeal,
            isACtive: formData.isActive,
            stockQuantity: formData.stockQuantity,
            categoryId: formData.categoryId,
        }).unwrap()
        console.log(result)

        toast.success("Category updated succesfull")
        
        setOpen()
      }catch (error){
        console.log(error)
          toast.error(error?.data?.slice(1,100) || "Editin category failed");
      }
    }
    
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

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isActive"
            name="isActive"
            checked={formData.isActive}
            onChange={handleInputChange}
            className="w-4 h-4 text-indigo-600 bg-[#2c2c2c] border-gray-600 rounded focus:ring-indigo-500 focus:ring-2"
          />
          <label htmlFor="isHotDeal" className="text-sm font-medium">
            Mark as Active
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
            onClick={handleProductEdit}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md font-semibold"
          >
            Update product
          </button>
        </div>
      </div>
    </div>
    )
}

export default EditProduct