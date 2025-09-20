import { Loader2, Pen, Trash, Package, DollarSign, Palette, Ruler } from "lucide-react";
import { useState } from "react";
import { useActivateUserMutation, useDeActivateUserMutation, useDeleteProductMutation, useGetProductsQuery, useGetProductsSummaryQuery } from "../../store/API";
import Modal from "../../components/UI/Modal";
import AddCategoryUIStatic from "../../components/admin/Product/AddProduct";
import AddProductStatic from "../../components/admin/Product/AddProduct";
import { toast } from "react-toastify";
import EditProduct from "../../components/admin/Product/EditProduct";

const ProductsUI = () => {
    const { data: products, isLoading, error, refetch } = useGetProductsQuery();
    const { data: productsSummary, isSummaryLoading } = useGetProductsSummaryQuery();
    
    
    const [open, setOpen] = useState(false)
    const [modalType, setModalType] = useState(null); 
    const [cat, setCat] = useState(null)

    const [deleteCategory] =   useDeleteProductMutation();


    const handleDeleteProduct = async (id) => {
      try {
        await deleteCategory({ id }).unwrap();
        toast.success("Product deleted successfully");
        handleCloseModal();
      } catch (error) {
        console.log(error);
        toast.error(error?.data || "Deleting Product Failed");
      }
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
    console.log("works")
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
        <EditProduct setOpen={handleCloseModal}  edit ={cat}/>
      </Modal>


      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-4xl font-bold text-white mb-2">Products</h2>
            <p className="text-gray-400">Manage your product inventory</p>
          </div>
          <button
            onClick={() => setModalType("add")}
            className="md:px-6 md:py-3 px-4 py-2 bg-white text-sm md:text-base transition-all duration-300 rounded-lg font-semibold text-gray-900 shadow-lg transform hover:bg-gray-100 hover:scale-105"
          >
            Add New Product
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
                    <p className="text-blue-100 text-sm">Total Products</p>
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
                    <p className="text-green-100 text-sm">In Stock</p>
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
                    <p className="text-orange-100 text-sm">Low Stock</p>
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
                    <p className="text-red-100 text-sm">Out of Stock</p>
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
                console.log(product.primaryImageUrl)
              return(
                <div 
                  key={product.id} 
                  className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  {/* Product Image */}
                  <div className="relative h-48 bg-gray-700">
                    <img
                      className="w-full h-full object-cover"
                      src={`http://localhost:5056${product.primaryImageUrl}`}
                      alt={product.name}
                      onError={(e) => {
                        e.target.src = "";
                      }}
                    />
                    <div className="absolute top-3 right-3 flex gap-2">
                      <button
                        onClick={() => {
                          setModalType("edit")
                          setCat(product)
                        }}
                        className="bg-blue-600 hover:bg-blue-700 p-2 rounded-lg shadow-lg transform hover:scale-110 transition-all duration-200"
                      >
                        <Pen className="w-4 h-4 text-white" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="bg-red-600 hover:bg-red-700 p-2 rounded-lg shadow-lg transform hover:scale-110 transition-all duration-200"
                      >
                        <Trash className="w-4 h-4 text-white" />
                      </button>
                    </div>
                    {/* Stock Status Badge */}
                    <div className="absolute top-3 left-3">
                      {product.stockQuantity === 0 ? (
                        <span className="bg-red-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                          Out of Stock
                        </span>
                      ) : product.stockQuantity <= 10 ? (
                        <span className="bg-orange-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                          Low Stock
                        </span>
                      ) : (
                        <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                          In Stock
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-5">
                    <div className="mb-3">
                      <h3 className="text-lg font-semibold text-white mb-1 truncate">
                        {product.name}
                      </h3>
                      <p className="text-gray-400 text-sm truncate">
                        {product.slug}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="mb-4">
                      <span className="text-2xl font-bold text-green-400">
                        ${product.currentPrice}
                      </span>
                    </div>

                    {/* Product Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400 flex items-center gap-1">
                          <Package className="w-4 h-4" />
                          Stock
                        </span>
                        <span className="text-white font-medium">{product.stock}</span>
                      </div>

                      {product.colors && product.colors.length > 0 && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400 flex items-center gap-1">
                            <Palette className="w-4 h-4" />
                            Colors
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
                            Sizes
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
                        <p className="text-xs text-gray-400 mb-2">Available Colors:</p>
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
                              +{product.colors.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Sizes Preview */}
                    {product.sizes && product.sizes.length > 0 && (
                      <div>
                        <p className="text-xs text-gray-400 mb-2">Available Sizes:</p>
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
                              +{product.sizes.length - 4} more
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
                <h3 className="text-xl font-semibold text-gray-400 mb-2">No products found</h3>
                <p className="text-gray-500 mb-6">Get started by adding your first product</p>
                <button
                onClick={() => setModalType("add")}
                  className="px-6 py-3 bg-white transition rounded-lg font-semibold text-gray-900 hover:bg-gray-100"
                >
                  Add Product
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