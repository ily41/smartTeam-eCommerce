import { useState } from "react";
import { useAddCategoryMutation, useGetCategoriesQuery } from "../../../store/API";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";

const AddCategoryUIStatic = ({setOpen, categories}) => {
  const [addCategory, { isLoading: isCategoryLoading }] = useAddCategoryMutation(); 
  const [parent, setParent] = useState(null)
  console.log(categories)
  
  
  
  const [formData, setFormData] = useState({
      name: "",
      imgUrl: "",

    });

  const handleCategory = async (e) =>{
      console.log("adding ATTEMPT")
      e.preventDefault(); 
       try {
        const result = await addCategory({
          name: formData.name,
          description: "description",
          imageUrl: formData.imgUrl,
          sortOrder: 1,
          ...(parent ? { parentCategoryId: parent } : {}) // <-- conditionally add parent
        }).unwrap();

        toast.success("Category added succesfull")
        setFormData({
          name: "",
          imgUrl: ""
        });
        setOpen()
        
  
      }catch (error){
        console.log(error)
          toast.error("Adding category failed");
      }
    }

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
      console.log(formData)
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
      <div className="flex flex-col">
        <label className="text-white text-sm mb-1" htmlFor="image">
          Image URL <span className="text-red-500">*</span>
        </label>
        <input
          onChange={handleChange}
          name="imgUrl"
          id="image"
          type="url"
          required
          placeholder="https://example.com/category-image.jpg"
          className="w-full px-4 py-3 rounded-lg bg-[#2a2a2a] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-white placeholder:text-gray-400"
        />
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
