import { useEffect, useState } from "react";
import { useEditCategoryMutation } from "../../../store/API";
import { Loader2, Loader2Icon } from "lucide-react";
import { toast } from "react-toastify";

const EditCategoryUI = ({item, setOpen, categories}) => {
    const [editCategory, { isLoading: isCategoryLoading }] = useEditCategoryMutation(); 
    const [parent, setParent] = useState(null)
    console.log(parent)
    
    const [formData, setFormData] = useState({
      name: "",
      imgUrl: ""
    });
    useEffect(() => {
  if (item) {
    setFormData({
      name: item.name || "",
      imgUrl: item.imageUrl || ""
    });
  }
}, [item]);

    const handleCategory = async (e) =>{
      e.preventDefault(); 
       try {
        const result = await editCategory({
            id:item.id,
            name: formData.name,
            description: "description",
            imageUrl: formData.imgUrl,
            isActive: true,
            sortOrder: 1,
        }).unwrap()

        toast.success("Category updated succesfull")
        
        setOpen()


        
  
      }catch (error){
        console.log(error)
          toast.error("Updating category failed");
      }
    }

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
          value={formData.name} 
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
          value={formData.imgUrl} 
          className="w-full px-4 py-3 rounded-lg bg-[#2a2a2a] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-white placeholder:text-gray-400"
        />
      </div>

      {/* Parent Category Select */}
      {/* <div className="flex flex-col">
        <label className="text-white text-sm mb-1" htmlFor="parent">
          Parent Category (optional)
        </label>
        <select
          onChange={(e) => setParent(e.target.value)}
          id="parent"
          className="w-full px-4 py-3 rounded-lg bg-[#2a2a2a] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
        >
          <option value="">No Parent</option>
          {categories?.length > 0 ? (
            categories.map((item, index) => (
              <option key={item.id || index} value={item.id}>
                {item.name}
              </option>
            ))
          ) : (
            <option disabled>No categories found</option>
          )}
        </select>
      </div> */}

    

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          type="submit"
        //   disabled={isCategoryLoading}
          className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all"
        >
          {isCategoryLoading ? <Loader2 className="w-6 h-6 text-black animate-spin" /> : "Save"}
          
        </button>
      </div>
    </form>
  );
};

export default EditCategoryUI;
