import { Loader2, Pen, Trash, Image, Plus } from "lucide-react";
import { useState } from "react";
import Modal from "../../UI/Modal";
import { toast } from "react-toastify";
import { 
  useAddBannerMutation, 
  useDeleteBannerMutation, 
  useGetBannersQuery, 
  useGetParentCategoriesQuery,
  useUpdateBannerMutation 
} from '../../../store/API';

const BannersUI = () => {
  const { data: categories, isCatsLoading } = useGetParentCategoriesQuery();
  const { data: bannersD, isBannersLoading, error, refetch } = useGetBannersQuery();
  console.log(bannersD)
  const [deleteBanner] = useDeleteBannerMutation();
  const [addBanner, { isLoading: isBannerLoading }] = useAddBannerMutation();
  const [updateBanner, { isLoading: isUpdateLoading }] = useUpdateBannerMutation();

  const [modalType, setModalType] = useState(null);
  const [selectedBanner, setSelectedBanner] = useState(null);

  const AddBannerModal = ({ isOpen, onClose }) => {
    const [file, setFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [selectedCategoryId, setSelectedCategoryId] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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

    const getCategoryOptions = () => {
      if (!categories) return [];
      const options = [];

      categories.forEach(parent => {
        options.push({
          id: parent.id,
          name: parent.name,
          slug: parent.slug,
          level: 0,
          parentName: null
        });

        if (parent.subCategories && parent.subCategories.length > 0) {
          parent.subCategories.forEach(sub => {
            options.push({
              id: sub.id,
              name: sub.name,
              slug: sub.slug,
              level: 1,
              parentName: parent.name
            });

            if (sub.subCategories && sub.subCategories.length > 0) {
              sub.subCategories.forEach(subSub => {
                options.push({
                  id: subSub.id,
                  name: subSub.name,
                  slug: subSub.slug,
                  level: 2,
                  parentName: `${parent.name} > ${sub.name}`
                });
              });
            }
          });
        }
      });

      return options;
    };

    const categoryOptions = getCategoryOptions();

    const handleCategorySelect = (option) => {
      setSelectedCategoryId(option.id);
      let url;
      if (option.level === 0) {
        url = `/${option.slug}`;
      } else {
        url = `/products/${option.slug}`;
      }
      setFormData(prev => ({ ...prev, linkUrl: url }));
      setIsDropdownOpen(false);
    };

    const getSelectedCategoryName = () => {
      if (!selectedCategoryId) return "";
      const option = categoryOptions.find(opt => opt.id === selectedCategoryId);
      return option ? option.name : "";
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      if (!file) {
        toast.error("Please select an image file");
        return;
      }

      const cleanFormData = {
        ...formData,
        type: Number(formData.type),
        sortOrder: Number(formData.sortOrder),
        isActive: Boolean(formData.isActive)
      };

      const formDataToSend = new FormData();
      const bannerDataString = JSON.stringify(cleanFormData);

      formDataToSend.append("bannerData", bannerDataString);
      formDataToSend.append("imageFile", file);

      try {
        const result = await addBanner(formDataToSend).unwrap();
        toast.success("Banner added successfully!");
        refetch();
        onClose();

        setFormData({
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
        setFile(null);
        setImagePreview(null);
        setSelectedCategoryId("");
      } catch (error) {
        console.error("Error adding banner:", error);
        toast.error("Failed to add banner: " + (error.data?.message || error.message));
      }
    };

    const handleImageChange = (e) => {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
        if (selectedFile.size > 10 * 1024 * 1024) {
          toast.error("File size must be less than 10MB");
          return;
        }

        if (!selectedFile.type.startsWith('image/')) {
          toast.error("Please select a valid image file");
          return;
        }

        setFile(selectedFile);

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
              Link URL
            </label>

            <div className="space-y-2">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white text-left focus:ring-2 focus:ring-blue-500 focus:border-transparent flex items-center justify-between"
                >
                  <span className={getSelectedCategoryName() ? "text-white" : "text-gray-400"}>
                    {getSelectedCategoryName() || "Select a category..."}
                  </span>
                  <svg
                    className={`w-5 h-5 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-gray-700 border border-gray-600 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {isCatsLoading ? (
                      <div className="px-4 py-3 text-gray-400 text-center">Loading categories...</div>
                    ) : categoryOptions.length === 0 ? (
                      <div className="px-4 py-3 text-gray-400 text-center">No categories available</div>
                    ) : (
                      categoryOptions.map(option => (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => handleCategorySelect(option)}
                          className={`w-full text-left px-4 py-2 hover:bg-gray-600 transition-colors ${selectedCategoryId === option.id ? 'bg-gray-600 text-blue-400' : 'text-white'
                            }`}
                          style={{ paddingLeft: `${(option.level * 1.5) + 1}rem` }}
                        >
                          <span className="flex items-center gap-2">
                            {option.level > 0 && (
                              <span className="text-gray-500">└─</span>
                            )}
                            {option.name}
                            {option.parentName && (
                              <span className="text-xs text-gray-400 ml-2">({option.parentName})</span>
                            )}
                          </span>
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <div className="flex-1 h-px bg-gray-600"></div>
                <span className="text-xs text-gray-500">or enter manually</span>
                <div className="flex-1 h-px bg-gray-600"></div>
              </div>

              <input
                type="text"
                value={formData.linkUrl}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, linkUrl: e.target.value }));
                  setSelectedCategoryId("");
                }}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com/page or /custom-path"
              />
            </div>
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
              rows={4}
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
    const [file, setFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [formData, setFormData] = useState({
      title: banner?.title || '',
      description: banner?.description || '',
      linkUrl: banner?.linkUrl || '',
      buttonText: banner?.buttonText || '',
      type: banner?.type || 0,
      isActive: banner?.isActive ?? true,
      sortOrder: banner?.sortOrder || 0,
      startDate: banner?.startDate || "2025-09-21T13:38:28.551Z",
      endDate: banner?.endDate || "2025-09-21T13:38:28.551Z"
    });
    console.log(formData)
    const handleSubmit = async (e) => {
      e.preventDefault();


      try {
        console.log(banner.id)
        console.log(formData)
        
        const cleanFormData = {
          title: formData.title,
          description: formData.description,
          linkUrl: formData.linkUrl,
          buttonText: formData.buttonText,
          type: Number(formData.type),
          isActive: Boolean(formData.isActive),
          sortOrder: Number(formData.sortOrder),
          startDate: formData.startDate,
          endDate: formData.endDate
        };
      
        await updateBanner({
          id: banner.id,
          ...cleanFormData  // Spread the data at the same level as id
        }).unwrap();

        toast.success("Banner updated successfully!");
        refetch();
        onClose();
      } catch (error) {
        console.error("Error updating banner:", error);
        toast.error("Failed to update banner: " + (error.data?.message || error.message));
      }
    };



    return (
      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-white mb-6">Edit Banner</h2>

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
              Link URL
            </label>
            <input
              type="text"
              value={formData.linkUrl}
              onChange={(e) => setFormData(prev => ({ ...prev, linkUrl: e.target.value }))}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://example.com/page or /custom-path"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter banner description"
            />
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
              disabled={isUpdateLoading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              {isUpdateLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Banner"
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
      <Modal open={modalType === "add"} setOpen={handleCloseModal}>
        <AddBannerModal isOpen={modalType === "add"} onClose={handleCloseModal} />
      </Modal>

      <Modal open={modalType === "edit"} setOpen={handleCloseModal}>
        <EditBannerModal
          isOpen={modalType === "edit"}
          onClose={handleCloseModal}
          banner={selectedBanner}
        />
      </Modal>

      <div className="container mx-auto">
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

        {isBannersLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-indigo-500" />
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {bannersD?.map((banner) => {
                console.log(banner.imageUrl)
                return (
                  <div
                    key={banner.id}
                    className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                  >
                    <div className="md:flex">
                      <div className="md:w-1/3 relative min-h-[180px] h-64 md:h-auto bg-gray-700">
                        <img
                          className="w-full h-full object-cover"
                          src={`https://smartteamaz-001-site1.qtempurl.com/${banner.imageUrl}`}
                          alt={banner.title}
                          onError={(e) => {
                            e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200' viewBox='0 0 400 200'%3E%3Crect width='400' height='200' fill='%23374151'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239CA3AF' font-size='16'%3ENo Image%3C/text%3E%3C/svg%3E";
                          }}
                        />

                        <div className="absolute top-3 left-3">
                          <span className={`${banner.isActive ? 'bg-green-600' : 'bg-red-600'} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                            {banner.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </div>

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

                          <div className="space-y-3">
                            {banner.linkUrl && (
                              <div className="flex items-center text-sm">
                                <span className="text-gray-400 w-20">Link:</span>
                                <a
                                  href={banner.linkUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-400 hover:text-blue-300 hover:underline"
                                >
                                  {banner.linkUrl}
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
                );
              })}
            </div>

            {bannersD && bannersD.length === 0 && (
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