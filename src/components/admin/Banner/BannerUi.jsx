import { Loader2, Pen, Trash, Image, Plus } from "lucide-react";
import { useState } from "react";
// import { useGetBannersQuery, useDeleteBannerMutation } from "../../store/API";
import Modal from "../../UI/Modal";
import { toast } from "react-toastify";
import { useAddBannerMutation, useAddProductMutation, useDeleteBannerMutation, useGetBannersQuery } from '../../../store/API';




const BannersUI = () => {
// Mock data - replace with your actual API calls
const mockBanners = [
  {
    id: 1,
    title: "Where Quality Meets Convenience",
    description: "Discover top deals, trending styles, and everyday essentials—all in one place.",
    imageUrl: "/api/uploads/banner1.jpg",
    isActive: true,
    link: "/shop",
    createdAt: "2024-03-15T10:30:00Z"
  },
  {
    id: 2,
    title: "New Collection Launch",
    description: "Discover our latest fashion collection",
    imageUrl: "/api/uploads/banner2.jpg",
    isActive: true,
    link: "/new-collection",
    createdAt: "2024-03-10T14:20:00Z"
  },
  {
    id: 3,
    title: "Winter Clearance",
    description: "Last chance to grab winter items at amazing prices",
    imageUrl: "/api/uploads/banner3.jpg",
    isActive: false,
    link: "/clearance",
    createdAt: "2024-02-28T09:15:00Z"
  }
];



const AddBannerModal = ({ isOpen, onClose }) => {
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    linkUrl: "",
    buttonText: "",
    type: 0,
    isActive: true,
    sortOrder: 0,
    startDate: "2025-09-21T13:38:28.551Z",
    endDate: "2025-09-21T13:38:28.551Z"
  });
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      toast.error("Please select an image file");
      return;
    }

    // Clean the form data to ensure proper JSON serialization
    const cleanFormData = {
      ...formData,
      type: Number(formData.type),
      sortOrder: Number(formData.sortOrder),
      isActive: Boolean(formData.isActive)
    };

    console.log("Form data before JSON.stringify:", cleanFormData);
    
    const formDataToSend = new FormData();
    const bannerDataString = JSON.stringify(cleanFormData);
    
    console.log("Banner data JSON string:", bannerDataString);
    console.log("File info:", file, { name: file.name, size: file.size, type: file.type });
    
    // Use 'bannerData' as the key (not 'productData')
    formDataToSend.append("bannerData", bannerDataString); 
    formDataToSend.append("imageFile", file);
    
    try {
      // Add the banner
      const result = await addBanner(formDataToSend).unwrap();
      console.log("Success result:", result);
      toast.success("Banner added successfully!");
      refetch();

      onClose();

      // Reset form
      setFormData({
        title: "",
        linkUrl: "",
        buttonText: "",
        type: 0,
        isActive: true,
        sortOrder: 0,
        startDate: "2025-09-21T13:38:28.551Z",
        endDate: "2025-09-21T13:38:28.551Z"
      });
      setFile(null);
      setImagePreview(null);
    } catch (error) {
      console.error("Error adding banner:", error);
      console.error("Error details:", error.data || error);
      toast.error("Failed to add banner: " + (error.data?.message || error.message));
    }
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Check file size (10MB limit)
      if (selectedFile.size > 10 * 1024 * 1024) {
        toast.error("File size must be less than 10MB");
        return;
      }
      
      // Check file type
      if (!selectedFile.type.startsWith('image/')) {
        toast.error("Please select a valid image file");
        return;
      }

      setFile(selectedFile);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleRemoveImage = () => {
    setFile(null);
    setImagePreview(null);
    // Reset the file input
    const fileInput = document.getElementById('banner-image-input');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
      <h2 className="text-2xl font-bold text-white mb-6">Add New Banner</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Banner Title *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter banner title"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Button Text
          </label>
          <input
            type="text"
            value={formData.buttonText}
            onChange={(e) => setFormData(prev => ({ ...prev, buttonText: e.target.value }))}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., Shop Now, Learn More"
          />
        </div>


        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={4} // you can adjust height
            placeholder="Enter a description..."
          />
        </div>


        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Banner Image *
          </label>
          
          {!imagePreview ? (
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-lg hover:border-gray-500 transition-colors">
              <div className="space-y-1 text-center">
                <Image className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-400">
                  <label className="relative cursor-pointer bg-gray-700 rounded-md font-medium text-blue-400 hover:text-blue-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 px-2 py-1">
                    <span>Upload a file</span>
                    <input
                      id="banner-image-input"
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={handleImageChange}
                      required
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          ) : (
            <div className="relative">
              <div className="relative rounded-lg overflow-hidden border-2 border-gray-600">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-colors duration-200"
                  >
                    <Trash className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="mt-3 flex items-center justify-between bg-gray-700 rounded-lg p-3">
                <div className="flex items-center space-x-3">
                  <Image className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-white font-medium">{file?.name}</p>
                    <p className="text-xs text-gray-400">
                      {file ? (file.size / 1024 / 1024).toFixed(2) : 0} MB
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="text-red-400 hover:text-red-300 p-1"
                >
                  <Trash className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-2">
                <label className="relative cursor-pointer bg-gray-700 rounded-md font-medium text-blue-400 hover:text-blue-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 px-3 py-2 text-sm inline-block">
                  <span>Change Image</span>
                  <input
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            </div>
          )}
        </div>



        <div className="flex items-center">
          <input
            type="checkbox"
            id="isActive"
            checked={formData.isActive}
            onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded bg-gray-700"
          />
          <label htmlFor="isActive" className="ml-2 block text-sm text-gray-300">
            Active (visible on website)
          </label>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={isBannerLoading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            {isBannerLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Banner"
            )}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

const EditBannerModal = ({ isOpen, onClose, banner }) => {
  const [formData, setFormData] = useState({
    title: banner?.title || '',
    description: banner?.description || '',
    link: banner?.link || '',
    isActive: banner?.isActive || true,
    image: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here - integrate with your API
    console.log('Updated banner data:', { ...formData, id: banner?.id });
    toast.success("Banner updated successfully!");
    onClose();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
      <h2 className="text-2xl font-bold text-white mb-6">Edit Banner</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Banner Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter banner title"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            rows={3}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter banner description"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Link URL
          </label>
          <input
            type="url"
            value={formData.link}
            onChange={(e) => setFormData(prev => ({ ...prev, link: e.target.value }))}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://example.com/page"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Update Banner Image (Optional)
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-lg hover:border-gray-500 transition-colors">
            <div className="space-y-1 text-center">
              <Image className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-400">
                <label className="relative cursor-pointer bg-gray-700 rounded-md font-medium text-blue-400 hover:text-blue-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 px-2 py-1">
                  <span>Upload new file</span>
                  <input
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
          {formData.image && (
            <p className="mt-2 text-sm text-green-400">
              New image selected: {formData.image.name}
            </p>
          )}
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="editIsActive"
            checked={formData.isActive}
            onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded bg-gray-700"
          />
          <label htmlFor="editIsActive" className="ml-2 block text-sm text-gray-300">
            Active (visible on website)
          </label>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Update Banner
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

  const { data: bannersD, isBannersLoading, error, refetch } = useGetBannersQuery();
  console.log(bannersD)
  const [deleteBanner] =   useDeleteBannerMutation();


  const [addBanner, { isLoading: isBannerLoading }] = useAddBannerMutation(); 

  
  const banners = mockBanners;
  const isLoading = false;
  
  const [modalType, setModalType] = useState(null);
  const [selectedBanner, setSelectedBanner] = useState(null);

  const handleDeleteBanner = async (id) => {
    try {
      await deleteBanner({ id }).unwrap();
      console.log('Deleting banner with id:', id);
      toast.success("Banner deleted successfully");
      refetch();
    } catch (error) {
      console.log(error);
      toast.error(error?.data || "Deleting Banner Failed");
    }
  };

  const handleCloseModal = () => {
    setModalType(null);
    setSelectedBanner(null);
    // refetch();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="text-white p-4 min-h-screen">
      {/* Add Banner Modal */}
      <Modal open={modalType === "add"} setOpen={handleCloseModal}>
        <AddBannerModal isOpen={modalType === "add"} onClose={handleCloseModal} />
      </Modal>
      
      {/* Edit Banner Modal */}
      <Modal open={modalType === "edit"} setOpen={handleCloseModal}>
        <EditBannerModal 
          isOpen={modalType === "edit"} 
          onClose={handleCloseModal} 
          banner={selectedBanner} 
        />
      </Modal>

      <div className="container mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-4xl font-bold text-white mb-2">Banners</h2>
            <p className="text-gray-400">Manage your website banners</p>
          </div>
          <button
            onClick={() => setModalType("add")}
            className="md:px-6 md:py-3 px-4 py-2 bg-white text-sm md:text-base transition-all duration-300 rounded-lg font-semibold text-gray-900 shadow-lg transform hover:bg-gray-100 hover:scale-105 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Banner
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-indigo-500" />
          </div>
        ) : (
          <>
            {/* Banners List */}
            <div className="space-y-6">
              {bannersD?.map((banner) => {
                console.log(banner.imageUrl)
              
              return (
                
                  <div 
                                key={banner.id} 
                                className="bg-gray-800 border  border-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                              >
                                <div className="md:flex">
                                  {/* Banner Image */}
                                  <div className="md:w-1/3 relative min-h-[180px] h-64 md:h-auto bg-gray-700">
                                  
                                    <img
                                      className="w-full h-full  object-cover"
                                      src={`http://localhost:5056${banner.imageUrl}`}
                                      alt={banner.title}
                                      onError={(e) => {
                                        e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200' viewBox='0 0 400 200'%3E%3Crect width='400' height='200' fill='%23374151'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239CA3AF' font-size='16'%3ENo Image%3C/text%3E%3C/svg%3E";
                                      }}
                                    />
                                    
                                    {/* Status Badge */}
                                    <div className="absolute top-3 left-3">
                                      <span className={`${banner.isActive ? 'bg-green-600' : 'bg-red-600'} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                                        {banner.isActive ? 'Active' : 'Inactive'}
                                      </span>
                                    </div>
                                  </div>
              
                                  {/* Banner Content */}
                                  <div className="md:w-2/3 p-6 flex flex-col justify-between">
                                    <div>
                                      <div className="flex justify-between items-start mb-4">
                                        <div className="flex-1">
                                          <h3 className="text-2xl font-bold text-white mb-2">
                                            {banner.title}
                                          </h3>
                                          <p className="text-gray-400 text-base leading-relaxed">
                                            {banner.description}
                                          </p>
                                        </div>
                                        
                                        {/* Action Buttons */}
                                        <div className="flex gap-2 ml-4">
                                          <button
                                            onClick={() => {
                                              setModalType("edit");
                                              setSelectedBanner(banner);
                                            }}
                                            className="bg-blue-600 hover:bg-blue-700 p-3 rounded-lg shadow-lg transform hover:scale-110 transition-all duration-200"
                                          >
                                            <Pen className="w-4 h-4 text-white" />
                                          </button>
                                          <button
                                            onClick={() => handleDeleteBanner(banner.id)}
                                            className="bg-red-600 hover:bg-red-700 p-3 rounded-lg shadow-lg transform hover:scale-110 transition-all duration-200"
                                          >
                                            <Trash className="w-4 h-4 text-white" />
                                          </button>
                                        </div>
                                      </div>
              
                                      {/* Banner Details */}
                                      <div className="space-y-3">
                                        {banner.link && (
                                          <div className="flex items-center text-sm">
                                            <span className="text-gray-400 w-20">Link:</span>
                                            <a 
                                              href={banner.link}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="text-blue-400 hover:text-blue-300 hover:underline"
                                            >
                                              {banner.link}
                                            </a>
                                          </div>
                                        )}
                                        
                                        <div className="flex items-center text-sm">
                                          <span className="text-gray-400 w-20">Created:</span>
                                          <span className="text-gray-300">
                                            {formatDate(banner.createdAt)}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                  </div>
              )


              })}
            </div>

            {/* Empty State */}
            {banners && banners.length === 0 && (
              <div className="text-center py-20">
                <Image className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">No banners found</h3>
                <p className="text-gray-500 mb-6">Get started by creating your first banner</p>
                <button
                  onClick={() => setModalType("add")}
                  className="px-6 py-3 bg-white transition rounded-lg font-semibold text-gray-900 hover:bg-gray-100"
                >
                  Add Banner
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BannersUI;