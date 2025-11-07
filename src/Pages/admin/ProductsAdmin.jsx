import { Loader2, Pen, Trash, Package, DollarSign, Palette, Ruler, Eye } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useActivateUserMutation, useDeActivateUserMutation, useDeleteProductMutation, useGetProductsQuery, useGetProductsSummaryQuery } from "../../store/API";
import Modal from "../../components/UI/Modal";
import AddProductStatic from "../../components/admin/Product/AddProduct";
import EditProduct from "../../components/admin/Product/EditProduct";
import { toast } from "react-toastify";
import { useTranslation } from 'react-i18next';

const ProductsUI = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { data: products, isLoading, error, refetch } = useGetProductsQuery();
    const { data: productsSummary, isSummaryLoading } = useGetProductsSummaryQuery();
    
    
    const [open, setOpen] = useState(false)
    const [modalType, setModalType] = useState(null); 
    const [cat, setCat] = useState(null)

    const [deleteCategory] =   useDeleteProductMutation();


    const handleDeleteProduct = async (id) => {
      try {
        await deleteCategory({ id }).unwrap();
        toast.success(t('admin.productDeletedSuccess'));
        handleCloseModal();
      } catch (error) {
        toast.error(error?.data || t('admin.deletingProductFailed'));
      }
    };

    const handleViewProduct = (product) => {
      navigate(`/admin/products/${product.id}`);
    };

    


  
  
    const getImageUrl = (imagePath) => {
      if (!imagePath) return '/placeholder-image.jpg';

      // If running locally, you might need to add your backend URL
      const baseUrl = process.env.NODE_ENV === 'production' 
        ? '' // Use relative path in production
        : 'http://localhost:3001'; // Your backend URL in development

      return `${baseUrl}${imagePath}`;
    };

  const handleCloseModal = () => {
    setModalType(false)
    setOpen(false);
    refetch();
  };


  

  return (
    <div className=" text-white p-4 min-h-screen">

      <Modal open={modalType == "add"} setOpen={handleCloseModal}>
        <AddProductStatic setOpen={handleCloseModal}/>
      </Modal>
      
      <Modal open={modalType === "edit"} setOpen={handleCloseModal}>
        <EditProduct setOpen={handleCloseModal}  idPr = {cat}/>
      </Modal>


      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-4xl font-bold text-white mb-2">{t('admin.products')}</h2>
            <p className="text-gray-400">{t('admin.manageProducts')}</p>
          </div>
          <button
            onClick={() => setModalType("add")}
            className="md:px-6 md:py-3 px-4 py-2 bg-white text-sm md:text-base transition-all duration-300 rounded-lg font-semibold text-gray-900 shadow-lg transform hover:bg-gray-100 hover:scale-105"
          >
            {t('admin.addNewProduct')}
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-indigo-500" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-xl shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Ümumi məhsullar</p> 
                    {isLoading ? (
                      <div className="flex justify-center items-center py-20">
                        <Loader2 className="w-12 h-12 animate-spin text-indigo-500" />
                      </div>
                    ) : (
                    <p className="text-white text-2xl font-bold">{productsSummary?.totalProducts}</p>
                    )}
                  </div>
                  <Package className="w-8 h-8 text-blue-200" />
                </div>
              </div>
              <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 rounded-xl shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">Anbarda var</p>
                    {isLoading ? (
                      <div className="flex justify-center items-center py-20">
                        <Loader2 className="w-12 h-12 animate-spin text-indigo-500" />
                      </div>
                    ) : (
                    <p className="text-white text-2xl font-bold">{productsSummary?.inStockProducts}</p>
                    )}
                  </div>
                  <DollarSign className="w-8 h-8 text-green-200" />
                </div>
              </div>
              <div className="bg-gradient-to-r from-orange-600 to-orange-700 p-6 rounded-xl shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm">Az qalıb</p>
                    {isLoading ? (
                      <div className="flex justify-center items-center py-20">
                        <Loader2 className="w-12 h-12 animate-spin text-indigo-500" />
                      </div>
                    ) : (
                    <p className="text-white text-2xl font-bold">{productsSummary?.lowStockProducts}</p>
                    )}
                  </div>
                  <Package className="w-8 h-8 text-orange-200" />
                </div>
              </div>
              <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 rounded-xl shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-red-100 text-sm">Anbarda yoxdur</p>
                    {isLoading ? (
                      <div className="flex justify-center items-center py-20">
                        <Loader2 className="w-12 h-12 animate-spin text-indigo-500" />
                      </div>
                    ) : (
                    <p className="text-white text-2xl font-bold">{productsSummary?.outOfStockProducts}</p>
                    )}
                  </div>
                  <Package className="w-8 h-8 text-red-200" />
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products?.map((product) => {
              return(
                <div 
                  key={product.id} 
                  className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  {/* Product Image */}
                  <div className="relative h-48 bg-gray-700">
                    <img
                      className="w-full h-full object-cover cursor-pointer"
                      src={`https://smartteamaz2-001-site1.ntempurl.com${product.primaryImageUrl}`}
                      alt={product.name}
                      onClick={() => handleViewProduct(product)}
                      onError={(e) => {
                        e.target.src = "";
                      }}
                    />
                    <div className="absolute top-3 right-3 flex gap-2">
                      {/* View Product Button */}
                      <button
                        onClick={() => handleViewProduct(product)}
                        className="bg-green-600 hover:bg-green-700 p-2 rounded-lg shadow-lg transform hover:scale-110 transition-all duration-200"
                        title="Məhsula bax"
                      >
                        <Eye className="w-4 h-4 text-white" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setModalType("edit")
                          setCat(product.id)
                        }}
                        className="bg-blue-600 hover:bg-blue-700 p-2 rounded-lg shadow-lg transform hover:scale-110 transition-all duration-200"
                        title="Məhsulu redaktə et"
                      >
                        <Pen className="w-4 h-4 text-white" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteProduct(product.id);
                        }}
                        className="bg-red-600 hover:bg-red-700 p-2 rounded-lg shadow-lg transform hover:scale-110 transition-all duration-200"
                        title="Məhsulu sil"
                      >
                        <Trash className="w-4 h-4 text-white" />
                      </button>
                    </div>
                    {/* Stock Status Badge */}
                    <div className="absolute top-3 left-3">
                      {product.stockQuantity === 0 ? (
                        <span className="bg-red-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                          Anbarda yoxdur
                        </span>
                      ) : product.stockQuantity <= 10 ? (
                        <span className="bg-orange-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                          Anbarda azdır
                        </span>
                      ) : (
                        <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                          Anbarda var
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Product Info - Clickable */}
                  <div 
                    className="p-5 cursor-pointer"
                    onClick={() => handleViewProduct(product)}
                  >
                    <div className="mb-3">
                      <h3 className="text-lg font-semibold text-white mb-1 truncate hover:text-blue-400 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-gray-400 text-sm truncate">
                        {product.slug}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="mb-4">
                      <span className="text-2xl font-bold text-green-400">
                        {product.currentPrice} AZN
                      </span>
                    </div>

                    {/* Product Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400 flex items-center gap-1">
                          <Package className="w-4 h-4" />
                          Stok
                        </span>
                        <span className="text-white font-medium">{product.stockQuantity}</span>
                      </div>

                      {product.colors && product.colors.length > 0 && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400 flex items-center gap-1">
                            <Palette className="w-4 h-4" />
                            Rənglər
                          </span>
                          <span className="text-white font-medium">
                            {product.colors.length}
                          </span>
                        </div>
                      )}

                      {product.sizes && product.sizes.length > 0 && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400 flex items-center gap-1">
                            <Ruler className="w-4 h-4" />
                            Ölçülər
                          </span>
                          <span className="text-white font-medium">
                            {product.sizes.length}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Colors Preview */}
                    {product.colors && product.colors.length > 0 && (
                      <div className="mb-3">
                        <p className="text-xs text-gray-400 mb-2">Mövcud rənglər:</p>
                        <div className="flex flex-wrap gap-1">
                          {product.colors.slice(0, 4).map((color, index) => (
                            <span
                              key={index}
                              className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs"
                            >
                              {color}
                            </span>
                          ))}
                          {product.colors.length > 4 && (
                            <span className="text-gray-400 text-xs self-center">
                              +{product.colors.length - 4} daha çox
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Sizes Preview */}
                    {product.sizes && product.sizes.length > 0 && (
                      <div>
                        <p className="text-xs text-gray-400 mb-2">Mövcud ölçülər:</p>
                        <div className="flex flex-wrap gap-1">
                          {product.sizes.slice(0, 4).map((size, index) => (
                            <span
                              key={index}
                              className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs"
                            >
                              {size}
                            </span>
                          ))}
                          {product.sizes.length > 4 && (
                            <span className="text-gray-400 text-xs self-center">
                              +{product.sizes.length - 4} daha çox
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )})}
            </div>

            {products && products.length === 0 && (
              <div className="text-center py-20">
                <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">Heç bir məhsul tapılmadı</h3>
                <p className="text-gray-500 mb-6">İlk məhsulunu əlavə etməklə başla</p>
                <button
                onClick={() => setModalType("add")}
                  className="px-6 py-3 bg-white transition rounded-lg font-semibold text-gray-900 hover:bg-gray-100"
                >
                  Məhsul əlavə et
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductsUI;