import React, { useState, useCallback, useMemo } from 'react'
import SearchUI from '../../components/UI/SearchUI'
import { Breadcrumb } from '../../products/Breadcrumb'
import { ArrowLeft, Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { Link, useParams } from 'react-router';
import { useGetCartItemsQuery, useUpdateCartItemQuantityMutation, useRemoveCartItemMutation, useRemoveCartMutation, useGetMeQuery, useCreateWhatsappOrderMutation } from '../../store/API';
import { toast } from 'react-toastify';





// Debounce utility function (if you don't have lodash)
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

// Skeleton Components (keeping your existing ones)
const CartItemSkeletonMobile = () => (
  <div className="space-y-4 lg:hidden animate-pulse">
    <div className="flex items-start rounded-lg">
      <div className="w-30 h-30 bg-gray-300 rounded-lg mr-4"></div>
      <div className="flex-1 space-y-2">
        <div className="h-5 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/3"></div>
      </div>
      <div className="w-10 h-10 bg-gray-300 rounded-lg"></div>
    </div>
    <div className="flex items-center justify-between">
      <div className="flex items-center border border-gray-300 rounded-lg">
        <div className="w-10 h-10 bg-gray-300 rounded"></div>
        <div className="w-12 h-10 bg-gray-300 mx-2 rounded"></div>
        <div className="w-10 h-10 bg-gray-300 rounded"></div>
      </div>
      <div className="h-6 bg-gray-300 rounded w-20"></div>
    </div>
  </div>
);

const CartItemSkeletonDesktop = () => (
  <div className="hidden lg:flex gap-4 animate-pulse">
    <div className="flex-1 flex">
      <div className="w-30 h-30 bg-gray-300 rounded-lg mr-4"></div>
      <div className="flex-1">
        <div className="space-y-2 mb-4">
          <div className="h-5 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/3"></div>
        </div>
        <div className="h-8 bg-gray-300 rounded w-20 mt-7"></div>
      </div>
    </div>
    <div className="flex flex-col items-end justify-around px-4">
      <div className="h-6 bg-gray-300 rounded w-20"></div>
      <div className="flex items-center border border-gray-300 rounded-lg">
        <div className="w-10 h-10 bg-gray-300 rounded"></div>
        <div className="w-12 h-10 bg-gray-300 mx-2 rounded"></div>
        <div className="w-10 h-10 bg-gray-300 rounded"></div>
      </div>
    </div>
  </div>
);

const CartSummarySkeleton = () => (
  <div className="lg:bg-white lg:p-5 lg:shadow-sm py-1 lg:h-fit flex-2 lg:rounded-lg animate-pulse">
    <div className="border-t lg:border-none border-gray-200 pt-4 space-y-3">
      <div className="flex justify-between">
        <div className="h-5 bg-gray-300 rounded w-20"></div>
        <div className="h-5 bg-gray-300 rounded w-16"></div>
      </div>
      <div className="flex justify-between">
        <div className="h-5 bg-gray-300 rounded w-20"></div>
        <div className="h-5 bg-gray-300 rounded w-16"></div>
      </div>
      <div className="flex justify-between pt-2 border-t border-gray-200">
        <div className="h-6 bg-gray-300 rounded w-16"></div>
        <div className="h-6 bg-gray-300 rounded w-20"></div>
      </div>
    </div>
    <div className="w-full h-14 bg-gray-300 rounded-lg mt-4"></div>
  </div>
);

const EmptyCartSkeleton = () => (
  <div className="flex-5 flex gap-5 p-4 flex-col bg-white lg:rounded-lg animate-pulse">
    {[...Array(3)].map((_, index) => (
      <div key={index}>
        <CartItemSkeletonMobile />
        <CartItemSkeletonDesktop />
        {index < 2 && <hr className="mx-2 border-[#dee2e6] my-4" />}
      </div>
    ))}
    <hr className="mx-2 border-[#dee2e6] hidden lg:block" />
    <div className="justify-between hidden lg:flex">
      <div className="h-10 bg-gray-300 rounded w-32"></div>
      <div className="h-10 bg-gray-300 rounded w-24"></div>
    </div>
  </div>
);

const Cart = () => {
  const { data: cartItemsD, isLoading, isError } = useGetCartItemsQuery();
  console.log(cartItemsD)

  const {data: me} = useGetMeQuery()
  const [updateCartItemQuantity, { isLoading: isUpdating }] = useUpdateCartItemQuantityMutation();
  const [removeCartItem, {isLoading: isRemoveLoading}] = useRemoveCartItemMutation();
  const [removeCart, {isLoading: isCartremoveLoading}] = useRemoveCartMutation();
  const [createWPOrder, {isLoading: isOrderLoading}] = useCreateWhatsappOrderMutation();


  
const createOrder = async () => {
  try {
    const orderPayload = {
      phoneNumber: "0506740649", 
      customerName: me?.fullName || "",
      customerPhone: me?.phoneNumber?.replace(/\D/g, '') || "0000000",
      items: cartItemsD?.items?.map(item => ({
        id: item.id,
        cartId: item.cartId,
        productId: item.productId,
        productName: item.productName,
        productSku: item.productSku,
        productDescription: item.productDescription,
        productImageUrl: item.productImageUrl || "",
        quantity: Number(item.quantity),
        unitPrice: Number(item.unitPrice),
        totalPrice: Number(item.totalPrice),
        createdAt: new Date(item.createdAt).toISOString(),
      })) ?? [],
      totalAmount: Number(cartItemsD?.totalAmount) || 0,
      currency: "AZN",
    };



    const response = await createWPOrder(orderPayload).unwrap();

     if (response.whatsAppUrl) {
      window.open(response.whatsAppUrl, "_blank"); // opens WhatsApp Web or app
    }

    toast.success("Order created successfully!");
  } catch (error) {
    console.error( error?.data);
    // Log the full error object to see what's wrong
    console.error("Error details:", JSON.stringify(error, null, 2));
    toast.error(error?.data);
  }
};

  


  

  // Local state for optimistic updates
  const [localQuantities, setLocalQuantities] = useState({});
  const [updatingItems, setUpdatingItems] = useState(new Set());

  // Debounced update function - FIXED VERSION
  const debouncedUpdate = useMemo(
    () => debounce(async (cartItemId, quantity) => {
      try {
        setUpdatingItems(prev => new Set(prev).add(cartItemId));
        await updateCartItemQuantity({ cartItemId, quantity }).unwrap();
        
        // Don't remove from local state immediately - let it persist until server data updates
        // The query will refetch automatically and the new server data will eventually override local state
        
      } catch (error) {
        console.error('Failed to update cart item:', error);
        // On error, revert to server state
        setLocalQuantities(prev => {
          const newState = { ...prev };
          delete newState[cartItemId];
          return newState;
        });
      } finally {
        setUpdatingItems(prev => {
          const newSet = new Set(prev);
          newSet.delete(cartItemId);
          return newSet;
        });
      }
    }, 500), // 500ms delay
    [updateCartItemQuantity]
  );

  // Clean up local quantities when server data updates - ADDED THIS
  React.useEffect(() => {
    if (cartItemsD?.items) {
      // Remove local quantities that match server state to prevent memory leaks
      setLocalQuantities(prev => {
        const newState = { ...prev };
        let hasChanges = false;
        
        cartItemsD.items.forEach(item => {
          if (newState[item.id] === item.quantity) {
            delete newState[item.id];
            hasChanges = true;
          }
        });
        
        return hasChanges ? newState : prev;
      });
    }
  }, [cartItemsD]);

  // Get effective quantity (local or server)
  const getEffectiveQuantity = useCallback((item) => {
    return localQuantities[item.id] !== undefined ? localQuantities[item.id] : item.quantity;
  }, [localQuantities]);

  // Handle quantity change
  const handleQuantityChange = useCallback((item, newQuantity) => {
    if (newQuantity < 1) return; // Prevent negative quantities
    
    // Update local state immediately for responsive UI
    setLocalQuantities(prev => ({
      ...prev,
      [item.id]: newQuantity
    }));
    
    // Debounced API call
    debouncedUpdate(item.id, newQuantity);
  }, [debouncedUpdate]);

  // Handle increment
  const handleIncrement = useCallback((item) => {
    const currentQuantity = getEffectiveQuantity(item);
    handleQuantityChange(item, currentQuantity + 1);
  }, [getEffectiveQuantity, handleQuantityChange]);

  // Handle decrement
  const handleDecrement = useCallback((item) => {
    const currentQuantity = getEffectiveQuantity(item);
    if (currentQuantity > 1) {
      handleQuantityChange(item, currentQuantity - 1);
    }
  }, [getEffectiveQuantity, handleQuantityChange]);

  // Handle remove item
  const handleRemoveItem = async (id) => {
    try {
      await removeCartItem({id }).unwrap();

      

    } catch (error) {
      console.error('Failed to remove cart item:', error);
    }
  };

  const handleRemoveCart = async () => {
    try {
      await removeCart().unwrap();
    } catch (error) {
      console.error('Failed to remove cart item:', error);
    }
  }

  // Calculate totals with local quantities
  const calculateTotals = useMemo(() => {
    if (!cartItemsD?.items) return { subtotal: 0, total: 0 };
    
    const subtotal = cartItemsD.items.reduce((sum, item) => {
      const quantity = getEffectiveQuantity(item);
      return sum + (item.unitPrice * quantity);
    }, 0);
    
    const discount = 15; // You might want to get this from API
    const total = subtotal - discount;
    
    return { subtotal, discount, total };
  }, [cartItemsD?.items, getEffectiveQuantity]);

  if (isError) {
    return (
      <section className="inter bg-[#f7fafc] min-h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error loading cart</h2>
          <p className="text-gray-600">Please try again later</p>
        </div>
      </section>
    );
  }

  return (
    <section className="inter bg-[#f7fafc] whitepsace-nowrap">
      {/* Mobile Search + Breadcrumb */}
      <div className="lg:hidden px-4 pl-7 py-4 border-y bg-white lg:border-transparent border-[#dee2e6] ">
        <div className="mb-4 lg:hidden">
          <SearchUI />
        </div>
        <Breadcrumb />
      </div>

      <div className="min-h-[80vh] lg:max-w-[90vw] lg:mx-auto border border-[#dee2e6] lg:border-0">
        <div className='p-4 pl-7 pb-0 hidden lg:block'>
          <Breadcrumb />
        </div>
        
        <div className="p-4 pl-7 text-xl font-semibold bg-white lg:bg-transparent border-b lg:border-0 border-[#dee2e6] mb-3">
          {isLoading ? (
            <div className="h-7 bg-gray-300 rounded w-40 animate-pulse"></div>
          ) : (
            <h1>My Cart ({cartItemsD?.items?.length || 0})</h1>
          )}
        </div>

        <div className="bg-white lg:bg-transparent rounded-lg flex flex-col lg:flex-row lg:gap-4 shadow-sm lg:shadow-none p-4 space-y-4">
          {isLoading ? (
            <>
              <EmptyCartSkeleton />
              <CartSummarySkeleton />
            </>
          ) : (
            <>
              <div className='flex-5 flex gap-5 p-4 flex-col bg-white lg:rounded-lg'>
                {cartItemsD?.items?.length === 0 ? (
                  <div className="text-center py-12">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Your cart is empty</h3>
                    <p className="text-gray-600">Add some items to get started</p>
                  </div>
                ) : (
                  cartItemsD?.items?.map((item, index) => {
                    const effectiveQuantity = getEffectiveQuantity(item);
                    const isItemUpdating = updatingItems.has(item.id);
                    
                    return (
                      <div key={item.id}>
                        {/* Mobile View */}
                        <div className="space-y-4 lg:hidden">
                          <div className="flex items-start rounded-lg">
                            <div className="w-30 h-30 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center mr-4 overflow-hidden">
                              <img
                                src={`https://smartteamaz-001-site1.qtempurl.com${item.productImageUrl}`}
                                alt={item.productName}
                                className="w-full h-full object-cover"
                              />
                            </div>

                            <div className="flex-1">
                              <h3 className="font-semibold text-lg text-gray-900 mb-1">
                                {item.productName}
                              </h3>
                            </div>

                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                              disabled={isItemUpdating}
                            >
                              <Trash2 size={24} />
                            </button>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center border border-gray-300 rounded-lg">
                              <button 
                                className="p-2 hover:bg-gray-100  transition-colors disabled:opacity-50"
                                onClick={() => handleDecrement(item)}
                                disabled={effectiveQuantity <= 1 || isItemUpdating}
                              >
                                <Minus size={16} />
                              </button>
                              <span className={`px-4 py-2 border-x border-[#dee2e6] text-center ${isItemUpdating ? 'opacity-50' : ''}`}>
                                {effectiveQuantity}
                              </span>
                              <button 
                                className="p-2 hover:bg-gray-100 transition-colors disabled:opacity-50"
                                onClick={() => handleIncrement(item)}
                                disabled={isItemUpdating}
                              >
                                <Plus size={16} />
                              </button>
                            </div>

                            <div className="text-xl font-semibold text-gray-900">
                              {(item.unitPrice * effectiveQuantity).toFixed(2)} AZN
                            </div>
                          </div>
                        </div>

                        {/* Desktop View */}
                        <div className='hidden lg:flex gap-4'>
                          <div className='flex-1 flex'>
                            <div className="w-30 h-30 rounded-lg flex items-center justify-center mr-4 overflow-hidden">
                              <img
                                src={`https://smartteamaz-001-site1.qtempurl.com${item.productImageUrl}`}
                                alt={item.productName}
                                className="w-full h-full object-cover"
                              />
                            </div>

                            <div>
                              <div className="flex-1">
                                <h3 className="font-semibold text-lg text-gray-900 mb-1">
                                  {item.productName}
                                </h3>
                              </div>

                              <button 
                                className='px-3 p-1 mt-7 shadow-md bg-white hover:bg-gray-100 cursor-pointer text-red-500 rounded-lg border-1 border-[#dee2e6] disabled:opacity-50'
                                onClick={() => handleRemoveItem(item.id)}
                                disabled={isItemUpdating}
                              >
                                {isRemoveLoading ? 'Removing' : 'Remove'}
                                
                              </button>
                            </div>
                          </div>

                          <div className="flex flex-col items-end justify-around px-4">
                            <div className="text-lg font-semibold text-gray-900">
                              {(item.unitPrice * effectiveQuantity).toFixed(2)} AZN
                            </div>
                            
                            <div className="flex items-center border border-gray-300 rounded-lg">
                              <button 
                                className="p-2  hover:bg-gray-100  h-full cursor-pointer transition-colors disabled:opacity-50"
                                onClick={() => handleDecrement(item)}
                                disabled={effectiveQuantity <= 1 || isItemUpdating}
                              >
                                <Minus size={16} />
                              </button>
                              <span className={`px-4 py-2 border-x border-[#dee2e6] text-center ${isItemUpdating ? 'opacity-50' : ''}`}>
                                {effectiveQuantity}
                              </span>
                              <button 
                                className="p-2 h-full hover:bg-gray-100 cursor-pointer transition-colors disabled:opacity-50"
                                onClick={() => handleIncrement(item)}
                                disabled={isItemUpdating}
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                          </div>
                        </div>

                        {index < (cartItemsD?.items?.length - 1) && (
                          <hr className="mx-2 border-[#dee2e6] my-4" />
                        )}
                      </div>
                    )
                  })
                )}

                {cartItemsD?.items?.length > 0 && (
                  <>
                    <hr className="mx-2 border-[#dee2e6] hidden lg:block" />
                    <div className='justify-between hidden lg:flex'>
                      <Link to='/' className='flex items-center gap-2 text-white bg-black inter p-2 rounded-lg'>
                        <ArrowLeft size={20} />
                        <p>Back to Shop</p>
                      </Link>
                      <button onClick={() => handleRemoveCart()} className='px-3 bg-white hover:bg-gray-100 cursor-pointer text-red-500 rounded-lg border-1 border-[#bfc2c6]'>
                        {isCartremoveLoading ? "Removing All ..." : "Remove all"}
                      </button>
                    </div>
                  </>
                )}
              </div>

              <div className='lg:bg-white lg:p-5 lg:shadow-sm py-1 lg:h-fit flex-2 lg:rounded-lg'>
                <div className="border-t lg:border-none border-gray-200 pt-4 space-y-3">
                  <div className="flex justify-between text-gray-600 text-lg">
                    <span>Subtotal:</span>
                    <span>{calculateTotals.subtotal.toFixed(2)} AZN</span>
                  </div>
                  <div className="flex justify-between text-red-500 text-lg">
                    <span>Discount:</span>
                    <span>- {calculateTotals.discount?.toFixed(2) || '0.00'} AZN</span>
                  </div>
                  <div className="flex justify-between text-lg mb-7 font-bold text-gray-900 pt-2 border-t border-gray-200">
                    <span>Total:</span>
                    <span>{calculateTotals.total.toFixed(2)} AZN</span>
                  </div>
                </div>

                <button onClick={() => createOrder()} className="w-full cursor-pointer bg-red-500 hover:bg-red-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2">
                  <ShoppingCart size={20} />
                  <span>Buy Now</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Cart;