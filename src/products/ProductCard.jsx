import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { Link } from 'react-router';

export function ProductCard({
  col,
  info,
  handleAddToCart,
  isAddingToCart,
  toggleFavorite, // RTK Query mutation hook
  isFavorite = false
}) {
  const { url, name, price, id, seller, description } = info;
  const [localFavorite, setLocalFavorite] = useState(isFavorite);

  const handleCartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (handleAddToCart) {
      handleAddToCart(id);
    }
  };

  const handleFavoriteClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Optimistically update local state
    setLocalFavorite(!localFavorite);
    
    try {
      // Call the RTK Query mutation
      await toggleFavorite({ productId: id }).unwrap();
    } catch (error) {
      // Revert on error
      setLocalFavorite(localFavorite);
      console.error('Failed to toggle favorite:', error);
    }
  };

  if (col) {
    // Column layout (grid view)
    return (
      <Link
        to={`/details/${id}`}
        className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden block"
      >
        <div className="aspect-square p-4 bg-gray-50">
          <img
            src={`http://localhost:5056${url}`}
            alt={name || 'Product'}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="p-4 relative">
          <div className="mb-8">
            {description && (
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                {description}
              </p>
            )}
            <p className="text-lg lg:text-xl font-semibold text-gray-900">
              {price} AZN
            </p>
            <p className="text-sm lg:text-md text-gray-600">
              {seller || 'Pos Komputer'}
            </p>
          </div>

          <button
            onClick={handleCartClick}
            disabled={isAddingToCart}
            className="w-full text-sm lg:text-md bg-red-500 hover:bg-red-600 disabled:bg-red-400 disabled:cursor-not-allowed text-white py-2 px-4 rounded-md font-medium transition-colors duration-200"
          >
            {isAddingToCart ? 'Adding...' : 'Add to the cart'}
          </button>

          <button
            onClick={handleFavoriteClick}
            className="absolute top-4 right-4 p-3 rounded-lg border border-gray-300 bg-white shadow-sm hover:bg-gray-50 transition-colors"
          >
            <Heart
              className={`w-4 h-4 lg:w-5 lg:h-5 transition-colors ${
                localFavorite
                  ? 'fill-red-500 text-red-500'
                  : 'text-gray-400'
              }`}
            />
          </button>
        </div>
      </Link>
    );
  } else {
    // Row layout (list view)
    return (
      <Link
        to={`/details/${id}`}
        className="border rounded-xl p-4 bg-white flex items-center gap-6 block"
      >
        {/* Product Image */}
        <div className="flex-shrink-0">
          <img
            src={`http://localhost:5056${url}`}
            alt={name || 'Product'}
            className="max-w-[150px] object-cover rounded-lg"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col flex-1 space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-semibold">{name}</h2>
              {description && (
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {description}
                </p>
              )}
              <p className="text-gray-500 mt-2">{price} ₼</p>
            </div>

            <button
              onClick={handleFavoriteClick}
              className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <Heart
                className={`w-6 h-6 transition-colors ${
                  localFavorite
                    ? 'fill-red-500 text-red-500'
                    : 'text-red-500'
                }`}
              />
            </button>
          </div>

          <div className="grid grid-cols-2">
            {/* Features */}
            <div className="flex flex-wrap gap-2 mb-9">
              {info.features?.length > 0 ? (
                info.features.map((feature, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-md border text-gray-700 text-sm"
                  >
                    {feature}
                  </span>
                ))
              ) : (
                <>
                  <span className="px-3 py-1 rounded-md border text-gray-700 text-sm">
                    16GB RAM
                  </span>
                  <span className="px-3 py-1 rounded-md border text-gray-700 text-sm">
                    Intel® Core™ i7
                  </span>
                  <span className="px-3 py-1 rounded-md border text-gray-700 text-sm">
                    Gray
                  </span>
                  <span className="px-3 py-1 rounded-md border text-gray-700 text-sm">
                    512GB SSD
                  </span>
                  <span className="px-3 py-1 rounded-md border text-gray-700 text-sm">
                    15.6" Display
                  </span>
                </>
              )}
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleCartClick}
              disabled={isAddingToCart}
              className="w-[80%] h-fit self-end mx-auto text-sm lg:text-md bg-red-500 hover:bg-red-600 disabled:bg-red-400 disabled:cursor-not-allowed text-white py-3 px-4 rounded-md font-medium transition-colors duration-200"
            >
              {isAddingToCart ? 'Adding...' : 'Add to the cart'}
            </button>
          </div>
        </div>
      </Link>
    );
  }
}

// Demo usage example showing how to use with RTK Query
export default function ProductCardDemo() {
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState(new Set(['1'])); // Simulate some favorites
  const [addingToCart, setAddingToCart] = useState(new Set());

  const sampleProducts = [
    {
      id: '1',
      name: 'iPhone 12 Mini 128GB Blue',
      price: 680,
      seller: 'Pos Komputer',
      url: '/api/placeholder/400/400',
      description: 'Latest model with amazing features',
      features: [
        '128GB Storage',
        'A14 Bionic',
        'Blue',
        '5G Capable',
        'OLED Display'
      ]
    },
    {
      id: '2',
      name: 'MacBook Pro 16" M3',
      price: 2499,
      seller: 'Tech Store',
      url: '/api/placeholder/400/400',
      description: 'Professional laptop for creative work',
      features: [
        '16GB RAM',
        'M3 Chip',
        'Space Gray',
        '512GB SSD',
        '16" Retina'
      ]
    }
  ];

  const handleAddToCart = async (productId) => {
    setAddingToCart((prev) => new Set(prev).add(productId));
    await new Promise((resolve) => setTimeout(resolve, 800));
    setCartItems((prev) => [...prev, productId]);
    setAddingToCart((prev) => {
      const newSet = new Set(prev);
      newSet.delete(productId);
      return newSet;
    });
  };

  // Mock RTK Query mutation for demo
  const mockToggleFavorite = ({ productId }) => ({
    unwrap: async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      setFavorites((prev) => {
        const newFavorites = new Set(prev);
        if (newFavorites.has(productId)) {
          newFavorites.delete(productId);
        } else {
          newFavorites.add(productId);
        }
        return newFavorites;
      });
      return { success: true };
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Product Card with RTK Query</h1>
        <p className="text-gray-600 mb-8">
          Integrated with favorites toggle mutation
        </p>

        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4">
            Grid View (Column Layout)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleProducts.map((product) => (
              <ProductCard
                key={product.id}
                col={true}
                info={product}
                handleAddToCart={handleAddToCart}
                isAddingToCart={addingToCart.has(product.id)}
                toggleFavorite={mockToggleFavorite}
                isFavorite={favorites.has(product.id)}
              />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">List View (Row Layout)</h2>
          <div className="space-y-4">
            {sampleProducts.map((product) => (
              <ProductCard
                key={product.id}
                col={false}
                info={product}
                handleAddToCart={handleAddToCart}
                isAddingToCart={addingToCart.has(product.id)}
                toggleFavorite={mockToggleFavorite}
                isFavorite={favorites.has(product.id)}
              />
            ))}
          </div>
        </div>

        <div className="mt-8 p-4 bg-white rounded-lg">
          <h3 className="font-semibold mb-2">
            Cart Items: {cartItems.length}
          </h3>
          <h3 className="font-semibold">Favorites: {favorites.size}</h3>
        </div>
      </div>
    </div>
  );
}