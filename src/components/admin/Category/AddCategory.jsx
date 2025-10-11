import { useEffect, useState } from "react";
import { useAddCategoryImageMutation, useAddCategoryMutation, useGetCategoriesQuery } from "../../../store/API";
import { Loader2, Trash2, Upload } from "lucide-react";
import { toast } from "react-toastify";

const AddCategoryUIStatic = ({setOpen, categories}) => {
  const [addCategory, { isLoading: isCategoryLoading }] = useAddCategoryMutation(); 
  const [addCategoryImage, { isLoading: isCategoryImageLoading }] = useAddCategoryImageMutation(); 
  const [parent, setParent] = useState(null)
  const [file, setFile] = useState(null)
  const [imageUrl, setImageUrl] = useState(null);

  
  

  const [formData, setFormData] = useState({
      name: "",
      description: "description",
      imageUrl: "",
      sortOrder: 1,
      ...(parent ? { parentCategoryId: parent } : {}) 

    });

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0]; 
    if (!selectedFile) return;

    setFile(selectedFile);
    e.target.value = ""; 
  };

  const close = () => {
    setFormData({
      name: "",
      imgUrl: "",
    });
    setFile(null);

    setOpen(false)
  }

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setImageUrl(null);
    }
  }, [file]);

  // const handleCategory = async (e) =>{
  //     e.preventDefault(); 
  //      try {
  //       const result = await addCategory({
  //         name: formData.name,
  //         description: "description",
  //         imageUrl: formData.imgUrl,
  //         sortOrder: 1,
  //         ...(parent ? { parentCategoryId: parent } : {}) 
  //       }).unwrap();

  //       toast.success("Category added succesfull")
  //       setFormData({
  //         name: "",
  //         imgUrl: ""
  //       });
  //       setOpen()
        
  
  //     }catch (error){
  //         console.log(error)
  //         toast.error("Adding category failed");
  //     }
  //   }  

 const handleCategory = async (e) => {
  e.preventDefault();

  if (!file) {
    toast.error("Please upload an image first");
    return;
  }

  try {
    // Build the category data object
    const categoryData = {
      name: formData.name,
      description: "description",
      sortOrder: 1,
      ...(parent ? { parentCategoryId: parent } : {}), // ✅ add parent if it exists
    };

    // Create FormData and append fields
    const formDataToSend = new FormData();
    formDataToSend.append("categoryData", JSON.stringify(categoryData));
    formDataToSend.append("imageFile", file, file.name);

    // Send request
    const result = await addCategoryImage(formDataToSend).unwrap();

    // Success message
    toast.success("Category added successfully");

    // Reset form
    setFormData({
      name: "",
      imgUrl: ""
    });
    setFile(null);
    setOpen();

  } catch (error) {
    toast.error(error?.data || "Something went wrong");
    console.log("Full error:", error);
  }
};


    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

  return (
    <form 
      onSubmit={handleCategory}
      className="flex flex-col gap-6 p-6 bg-[#1f1f1f] rounded-lg w-96"
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
          placeholder="Enter category name"
          className="w-full px-4 py-3 rounded-lg bg-[#2a2a2a] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-white placeholder:text-gray-400"
        />
      </div>

      {/* Image URL */}
  

      <div>
        <label className="block text-sm font-medium mb-2">Category *</label>
        <select
          name="categoryId"
          onChange={(e) => setParent(e.target.value)}
          className="w-full px-3 py-2 bg-[#2c2c2c] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">No Parent</option>
          {categories?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
          <label className="block text-sm font-medium mb-2">Product Images</label>
          <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
             <input
                type="file"
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

          {file && 
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  <div className="relative group">
                    <img
                      src={imageUrl}
                      className="w-full h-24 object-cover rounded-md border "
                    />
                    <button
                      type="button"
                      onClick={() => {setFile(null)}}
                      className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
              </div>
          
          }
            
        </div>


    

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isCategoryLoading}
          className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all"
        >
          {isCategoryLoading ? <Loader2 className="w-12 h-12 text-white animate-spin" /> : "Save"}
          
        </button>
      </div>
    </form>
  );
};

export default AddCategoryUIStatic;
