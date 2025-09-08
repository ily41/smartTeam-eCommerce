import { useState } from 'react';
import { toast } from 'react-toastify';
import Modal from '../../components/UI/Modal';
import AddCategoryUIStatic from '../../components/admin/Category/addCategory';
import { Loader2 } from 'lucide-react';
import { useAddCategoryMutation, useDeleteCategoryMutation, useGetCategoriesQuery } from '../../store/API';
import EditCategoryUI from '../../components/admin/Category/EditCategory';
const Category = () => {
  const [modalType, setModalType] = useState(null); 
  const [edit, setEdit] = useState(null);
  const { data: categories, isLoading, error, refetch } = useGetCategoriesQuery();
  const [deleteCategory, { isDeleteLoading }] = useDeleteCategoryMutation();
  


  const handleDeleteCategory  = async ( id) =>{
       try {
        const result = await deleteCategory({
            id
        }).unwrap()

        toast.success("Category deleted succesfully")
        handleCloseModal()

      }catch (error){
        console.log(error)
          toast.error(error?.data || "Deleting Category Failed");

      }
    }


  const handleCloseModal = () => {
    setModalType(null);
    setEdit(null);
    refetch();
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Categories</h1>
        <button
          onClick={() => setModalType('add')}
          className="px-6 py-3 font-semibold rounded-lg bg-white text-black hover:bg-gray-200 transition-all"
        >
          Add New Category
        </button>
      </div>

      {/* Modals */}
      <Modal open={modalType === 'add'} setOpen={handleCloseModal}>
        <AddCategoryUIStatic setOpen={handleCloseModal} />
      </Modal>

      <Modal open={modalType === 'edit'} setOpen={handleCloseModal}>
        {!isLoading && <EditCategoryUI setOpen={handleCloseModal} item={edit} />}
      </Modal>

      {/* Category List */}
      <ul className="space-y-4">
        {isLoading ?  <Loader2 className="w-12 h-12 text-white animate-spin" /> :
        categories?.map(item => (
            <li
            className="flex justify-between items-center p-4 bg-[#1f1f1f] text-white rounded-xl shadow hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-4">
              <img className='w-10 h-10 rounded-full' src={item.imageUrl || "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/85d1d12f-b0a5-49c0-bc81-6238cfc5d9ac/JORDAN+1+RETRO+HIGH+OG+%28PS%29.png"} alt="" />
              <div>
                <h2 className="text-lg font-medium">{item.name}</h2>
                <p className="text-sm text-gray-400">slug</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setModalType('edit')
                  setEdit(item)
                  
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteCategory(item.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </li>
        )) 
        } 


        
          
      </ul>
    </div>
  );
};

export default Category;
