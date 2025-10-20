import { useEffect, useState } from "react";
import { Loader2, Upload, X } from "lucide-react";

const EditCategoryUI = ({item, setOpen, categories}) => {
    // Mock mutation for demo
    const [isCategoryLoading, setIsCategoryLoading] = useState(false);
    
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isNewImage, setIsNewImage] = useState(false);
    
    const [formData, setFormData] = useState({
      name: "",
      description: ""
    });

    useEffect(() => {
      if (item) {
        setFormData({
          name: item.name || "",
          description: item.description || ""
        });
        // Set existing image preview
        if (item.imageUrl) {
          setImagePreview(item.imageUrl);
          setIsNewImage(false);
        }
      }
    }, [item]);

    const handleImageChange = (e) => {
      const file = e.target.files?.[0]; // Added optional chaining
      
      if (!file) {
        console.log("No file selected");
        return;
      }

      console.log("File selected:", file.name, file.type, file.size);
      
      if (!file.type.startsWith('image/')) {
        alert("Please select a valid image file");
        return;
      }
      
      // Validate file size (e.g., max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        return;
      }

      setImageFile(file);
      setIsNewImage(true);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.onerror = () => {
        console.error("Error reading file");
        alert("Error reading file");
      };
      reader.readAsDataURL(file);
    };

    const removeImage = () => {
      setImageFile(null);
      setImagePreview(item?.imageUrl || null);
      setIsNewImage(false);
      // Reset file input
      const fileInput = document.getElementById('image-upload');
      if (fileInput) {
        fileInput.value = '';
      }
    };

    const handleCategory = async (e) => {
      e.preventDefault(); 
      
      try {
        setIsCategoryLoading(true);
        
        // Create FormData for multipart/form-data request
        const formDataToSend = new FormData();
        
        // Create category data object
        const categoryData = {
          name: formData.name,
          description: formData.description || "description",
          isActive: true,
          sortOrder: 1
        };
        
        // Append category data as JSON string
        formDataToSend.append('categoryData', JSON.stringify(categoryData));
        
        // Append image file if selected
        if (imageFile) {
          formDataToSend.append('imageFile', imageFile);
        }

        // Demo: simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log("Category data to send:", categoryData);
        console.log("Image file:", imageFile?.name);
        
        alert("Category updated successfully");
        setIsCategoryLoading(false);
        if (setOpen) setOpen();
      } catch (error) {
        console.log(error);
        alert(error?.data?.message || "Updating category failed");
        setIsCategoryLoading(false);
      }
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    // Helper function to get the correct image URL
    const getImageUrl = () => {
      if (isNewImage) {
        // New image uploaded - use data URL directly
        return imagePreview;
      } else if (imagePreview) {
        // Existing image from server - prepend base URL
        return `https://smartteamaz-001-site1.qtempurl.com/${imagePreview}`;
      }
      return null;
    };

  return (
    <form 
      onSubmit={handleCategory}
      className="flex flex-col gap-6 p-6 bg-[#1f1f1f] rounded-lg w-96 max-w-full"
    >
      {/* Name Field */}
      <div className="flex flex-col">
        <label className="text-white text-sm mb-1" htmlFor="name">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          onChange={handleChange}
          name="name"
          type="text"
          required
          value={formData.name} 
          className="w-full px-4 py-3 rounded-lg bg-[#2a2a2a] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-white placeholder:text-gray-400"
        />
      </div>

      {/* Description Field */}
      <div className="flex flex-col">
        <label className="text-white text-sm mb-1" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          onChange={handleChange}
          name="description"
          rows="3"
          value={formData.description} 
          className="w-full px-4 py-3 rounded-lg bg-[#2a2a2a] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-white placeholder:text-gray-400 resize-none"
          placeholder="Enter category description"
        />
      </div>

      {/* Image Upload */}
      <div className="flex flex-col">
        <label className="text-white text-sm mb-2">
          Category Image
        </label>
        
        {/* Image Preview */}
        {imagePreview && (
          <div className="relative mb-3 w-full h-40 rounded-lg overflow-hidden bg-[#2a2a2a]">
            <img 
              src={getImageUrl()} 
              alt="Preview" 
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-2 right-2 p-1 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        )}

        {/* Upload Button */}
        <label 
          htmlFor="image-upload"
          className="flex items-center justify-center gap-2 px-4 py-3 bg-[#2a2a2a] text-white border border-gray-700 rounded-lg cursor-pointer hover:bg-[#333333] transition-colors"
        >
          <Upload className="w-5 h-5" />
          <span>{imageFile ? 'Change Image' : 'Upload Image'}</span>
        </label>

        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
        <p className="text-gray-400 text-xs mt-2">
          Accepted formats: JPG, PNG, GIF (Max 5MB)
        </p>
      </div>

      {/* Debug Info */}
      {imageFile && (
        <div className="text-xs text-gray-400 p-3 bg-[#2a2a2a] rounded">
          <p>Selected file: {imageFile.name}</p>
          <p>Size: {(imageFile.size / 1024).toFixed(2)} KB</p>
          <p>Type: {imageFile.type}</p>
        </div>
      )}

      {/* Save Button */}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => setOpen && setOpen()}
          className="px-6 py-3 bg-[#2a2a2a] text-white font-semibold rounded-lg hover:bg-[#333333] transition-all"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isCategoryLoading}
          className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isCategoryLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            "Save Changes"
          )}
        </button>
      </div>
    </form>
  );
};

export default EditCategoryUI;