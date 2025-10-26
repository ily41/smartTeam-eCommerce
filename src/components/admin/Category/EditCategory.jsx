import { useEffect, useState } from "react";
import { Loader2, Upload, X } from "lucide-react";
import { useEditCategoryWithImageMutation } from "../../../store/API";
import { toast } from "react-toastify";

const EditCategoryUI = ({item, setOpen, categories}) => {
  console.log(item)
    const [isCategoryLoading, setIsCategoryLoading] = useState(false);
    const [editCategory, { isLoading }] = useEditCategoryWithImageMutation();
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isNewImage, setIsNewImage] = useState(false);
    
    const [formData, setFormData] = useState({
      name: "",
      description: ""
    });

    useEffect(() => {
      const input = document.getElementById('image-upload');
      if (input) {
        input.addEventListener('change', handleImageChange);
      }
    }, []);

    useEffect(() => {
  if (item) {
    setFormData({
      name: item.name || "",
      description: item.description || ""
    });

    if (item.imageUrl) {
      setImagePreview(item.imageUrl);
      setIsNewImage(false);
    } else {
      setImagePreview(null); // 👈 clear old preview
      setImageFile(null);
      setIsNewImage(false);
    }
  }
}, [item]);


    const handleImageChange = (e) => {
      const file = e.target.files?.[0];
      
      if (!file) {
        return;
      }

 
      
      if (!file.type.startsWith('image/')) {
        alert("Please select a valid image file");
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        return;
      }

      setImageFile(file);
      setIsNewImage(true);
      
      const reader = new FileReader();
      
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      
      reader.onerror = (error) => {
        alert("Error reading file");
      };
      
      reader.readAsDataURL(file);
    };

    const handleCategory = async (e) => {
      e.preventDefault(); 
      
      try {
        setIsCategoryLoading(true);
        
        const formDataToSend = new FormData();
        
        const categoryData = {
          name: formData.name,
          description: formData.description || "description",
          isActive: true,
          sortOrder: 1,
          parentCategoryId: item.parentCategoryId
        };
        
        formDataToSend.append('categoryData', JSON.stringify(categoryData));
        
        if (imageFile) {
          formDataToSend.append('imageFile', imageFile);
        }

        const result = await editCategory({
          id: item.id,
          formData: formDataToSend
        }).unwrap();
        console.log(result)
        
        toast.success("Category updated successfully");
        setIsCategoryLoading(false);
        if (setOpen) setOpen();
      } catch (error) {
        console.log(error);
        toast.error(error?.data?.message || "Updating category failed");
        setIsCategoryLoading(false);
      }
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    const getImageUrl = () => {
      
      // If it's a new image (just uploaded), imagePreview is already a data URL
      if (isNewImage) {
        return imagePreview;
      } 
      // If it's an existing image URL from the server
      else if (imagePreview) {
        return `https://smartteamaz-001-site1.qtempurl.com/${imagePreview}`;
      }
      
      return null;
    };

  return (
    <form 
      onSubmit={handleCategory}
      className="flex flex-col gap-6 p-6 bg-[#1f1f1f] rounded-lg w-96 max-w-full"
    >
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

      <div className="flex flex-col">
        <label className="text-white text-sm mb-2">
          Category Image
        </label>
        
        {imagePreview && (
          <div className="relative mb-3 w-full h-40 rounded-lg overflow-hidden bg-[#2a2a2a] border border-gray-700">
            <img 
              src={getImageUrl()} 
              alt="Preview" 
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <label 
          htmlFor="image-upload"
          className="flex items-center justify-center gap-2 px-4 py-3 bg-[#2a2a2a] text-white border border-gray-700 rounded-lg cursor-pointer hover:bg-[#333333] transition-colors"
        >
          <Upload className="w-5 h-5" />
          <span>{imageFile ? 'Change Image' : 'Upload Image'}</span>
        </label>

        <input
          key="category-image-input"
          id="image-upload"
          type="file"
          accept="image/*"
          onClick={(e) => (e.target.value = null)}
          className="hidden"
        />


        <p className="text-gray-400 text-xs mt-2">
          Accepted formats: JPG, PNG, GIF (Max 5MB)
        </p>
      </div>

      {imageFile && (
        <div className="text-xs text-gray-400 p-3 bg-[#2a2a2a] rounded border border-gray-700">
          <p className="font-semibold text-white mb-1">Debug Info:</p>
          <p>Selected file: {imageFile.name}</p>
          <p>Size: {(imageFile.size / 1024).toFixed(2)} KB</p>
          <p>Type: {imageFile.type}</p>
          <p>Is new image: {isNewImage ? 'Yes' : 'No'}</p>
          <p>Has preview: {imagePreview ? 'Yes' : 'No'}</p>
        </div>
      )}

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

