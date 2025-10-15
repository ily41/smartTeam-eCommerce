import { useState } from 'react';
import { toast } from 'react-toastify';
import Modal from '../../components/UI/Modal';
import AddBrandUI from '../../components/admin/Brands/AddBrand';
import { Loader2 } from 'lucide-react';
import { useDeleteBrandMutation, useGetBrandsAdminQuery } from '../../store/API';
import EditBrandUI from '../../components/admin/Brands/EditBrand';

const Brand = () => {
  const [modalType, setModalType] = useState(null); 
  const [edit, setEdit] = useState(null);
  const { data: brands, isLoading, error, refetch } = useGetBrandsAdminQuery();

  const [deleteBrand] = useDeleteBrandMutation();

  const handleDeleteBrand = async (id) => {
    try {
      await deleteBrand({ id }).unwrap();
      toast.success("Brand deleted successfully");
      handleCloseModal();
    } catch (error) {
      console.log(error);
      toast.error(error?.data || "Deleting Brand Failed");
    }
  };

  const handleCloseModal = () => {
    setModalType(null);
    setEdit(null);
    refetch();
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Brands</h1>
        <button
          onClick={() => setModalType("add")}
          className="px-6 py-3 font-semibold rounded-lg bg-white text-black hover:bg-gray-200 transition-all"
        >
          Add New Brand
        </button>
      </div>

      {/* Modals */}
      <Modal open={modalType === "add"} setOpen={handleCloseModal}>
        <AddBrandUI setOpen={handleCloseModal} />
      </Modal>

      <Modal open={modalType === "edit"} setOpen={handleCloseModal}>
        {!isLoading && (
          <EditBrandUI setOpen={handleCloseModal} item={edit} />
        )}
      </Modal>

      {/* Brand List */}
      <ul className="space-y-4">
        {isLoading ? (
          <Loader2 className="w-12 h-12 text-white animate-spin" />
        ) : (
          brands?.map((brand) => (
            <li
              key={brand.id}
              className="flex flex-col bg-[#1f1f1f] text-white rounded-xl shadow hover:shadow-lg transition-all"
            >
              <div className="flex justify-between items-center p-4">
                <div className="flex items-center gap-4">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={
                      `https://smartteamaz-001-site1.qtempurl.com${brand.logoUrl}` ||
                      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/85d1d12f-b0a5-49c0-bc81-6238cfc5d9ac/JORDAN+1+RETRO+HIGH+OG+%28PS%29.png"
                    }
                    alt=""
                  />
                  <div>
                    <h2 className="text-lg font-medium">{brand.name}</h2>
                    <p className="text-sm text-gray-400">{brand.slug || "slug"}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setModalType("edit");
                      setEdit(brand);
                    }}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteBrand(brand.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Brand;