import { Loader2, Pen, Trash, Package, DollarSign, Palette, Ruler } from "lucide-react";
import { useState } from "react";
import { useGetProductsQuery } from "../../store/API";

const ProductsUI = () => {
    const { data: products, isLoading, error, status } = useGetProductsQuery();
    if(isLoading) {
        console.log("loading...")
    }else {console.log(products)}
    console.log(status)

  
  
  // Mock data for demonstration
  const mockData = [
    {
      id: 1,
      name: "Premium Cotton T-Shirt",
      slug: "premium-cotton-tshirt",
      price: 29.99,
      stock: 45,
      images: [{ url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=200&fit=crop" }],
      colors: ["Black", "White", "Navy", "Gray", "Red"],
      sizes: ["XS", "S", "M", "L", "XL"]
    },
    {
      id: 2,
      name: "Denim Jacket",
      slug: "denim-jacket",
      price: 89.99,
      stock: 8,
      images: [{ url: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=300&h=200&fit=crop" }],
      colors: ["Blue", "Black", "Light Blue"],
      sizes: ["S", "M", "L", "XL"]
    },
    {
      id: 3,
      name: "Running Shoes",
      slug: "running-shoes",
      price: 129.99,
      stock: 0,
      images: [{ url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=200&fit=crop" }],
      colors: ["White", "Black", "Blue", "Red", "Green", "Yellow"],
      sizes: ["7", "8", "9", "10", "11", "12"]
    },
    {
      id: 4,
      name: "Leather Wallet",
      slug: "leather-wallet",
      price: 49.99,
      stock: 23,
      images: [{ url: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=300&h=200&fit=crop" }],
      colors: ["Brown", "Black", "Tan"],
      sizes: []
    },
    {
      id: 5,
      name: "Wireless Headphones",
      slug: "wireless-headphones",
      price: 199.99,
      stock: 5,
      images: [{ url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop" }],
      colors: ["Black", "White", "Silver"],
      sizes: []
    },
    {
      id: 6,
      name: "Backpack",
      slug: "backpack",
      price: 79.99,
      stock: 12,
      images: [{ url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=200&fit=crop" }],
      colors: ["Black", "Gray", "Navy", "Olive"],
      sizes: ["One Size"]
    }
  ];

  const data = mockData;

  const handleDeleteProduct = async (id) => {
    // Mock delete functionality
    if (window.confirm("Are you sure you want to delete this product?")) {
      alert(`Product with ID ${id} deleted successfully!`);
    }
  };

  const handleEditProduct = (id) => {
    alert(`Edit product with ID: ${id}`);
  };

  const handleAddProduct = () => {
    alert("Add new product clicked!");
  };

  return (
    <div className=" text-white p-4 min-h-screen">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-4xl font-bold text-white mb-2">Products</h2>
            <p className="text-gray-400">Manage your product inventory</p>
          </div>
          <button
            onClick={handleAddProduct}
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
                    <p className="text-white text-2xl font-bold">{products?.length || 0}</p>
                  </div>
                  <Package className="w-8 h-8 text-blue-200" />
                </div>
              </div>
              <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 rounded-xl shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">In Stock</p>
                    <p className="text-white text-2xl font-bold">
                      {data?.filter(p => p.stock > 0).length || 0}
                    </p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-200" />
                </div>
              </div>
              <div className="bg-gradient-to-r from-orange-600 to-orange-700 p-6 rounded-xl shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm">Low Stock</p>
                    <p className="text-white text-2xl font-bold">
                      {data?.filter(p => p.stock > 0 && p.stock <= 10).length || 0}
                    </p>
                  </div>
                  <Package className="w-8 h-8 text-orange-200" />
                </div>
              </div>
              <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 rounded-xl shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-red-100 text-sm">Out of Stock</p>
                    <p className="text-white text-2xl font-bold">
                      {data?.filter(p => p.stock === 0).length || 0}
                    </p>
                  </div>
                  <Package className="w-8 h-8 text-red-200" />
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products?.map((product) => (
                <div 
                  key={product.id} 
                  className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  {/* Product Image */}
                  <div className="relative h-48 bg-gray-700">
                    <img
                      className="w-full h-full object-cover"
                      src={product.primaryImageUrl}
                      alt={product.name}
                      onError={(e) => {
                        e.target.src = "";
                      }}
                    />
                    <div className="absolute top-3 right-3 flex gap-2">
                      <button
                        onClick={() => handleEditProduct(product.id)}
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
              ))}
            </div>

            {data && data.length === 0 && (
              <div className="text-center py-20">
                <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">No products found</h3>
                <p className="text-gray-500 mb-6">Get started by adding your first product</p>
                <button
                  onClick={handleAddProduct}
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