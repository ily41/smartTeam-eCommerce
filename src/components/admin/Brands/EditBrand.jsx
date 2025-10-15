import { useEffect, useState } from "react";
import { useEditBrandMutation } from "../../../store/API";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";

const EditBrandUI = ({item, setOpen}) => {
  const [editBrand, { isLoading: isBrandLoading }] = useEditBrandMutation(); 
  
  const [formData, setFormData] = useState({
    name: "",
    logoUrl: ""
  });

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name || "",
        logoUrl: item.logoUrl || ""
      });
    }
  }, [item]);

  const handleBrand = async (e) => {
    e.preventDefault(); 
    try {
      const result = await editBrand({
        id: item.id,
        name: formData.name,
        logoUrl: formData.logoUrl,
        isActive: true,
        sortOrder: 0,
      }).unwrap();

      toast.success("Brand updated successfully");
      setOpen();

    } catch (error) {
      console.log(error);
      toast.error("Updating brand failed");
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form 
      onSubmit={handleBrand}
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

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isBrandLoading}
          className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all"
        >
          {isBrandLoading ? <Loader2 className="w-6 h-6 text-black animate-spin" /> : "Save"}
        </button>
      </div>
    </form>
  );
};

export default EditBrandUI;
