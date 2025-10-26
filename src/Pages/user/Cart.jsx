import React, { useState, useCallback, useMemo, useEffect } from 'react'
import SearchUI from '../../components/UI/SearchUI'
import { Breadcrumb } from '../../products/Breadcrumb'
import { ArrowLeft, Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { Link, useParams } from 'react-router';
import { useGetCartItemsQuery, useUpdateCartItemQuantityMutation, useRemoveCartItemMutation, useRemoveCartMutation, useGetMeQuery, useCreateWhatsappOrderMutation } from '../../store/API';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { translateDynamicField } from '../../i18n';

const AuthUtils = {
  isAuthenticated() {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [name] = cookie.trim().split('=');
      if (name === 'token' || name === 'authToken' || name === 'accessToken' || name === 'jwt') {
        return true;
      }
    }
    return false;
  }
};

const CartUtils = {
  CART_KEY: 'ecommerce_cart',

  getCart() {
    try {
      const cart = localStorage.getItem(this.CART_KEY);
      return cart ? JSON.parse(cart) : { 
        items: [], 
        totalPriceBeforeDiscount: 0, 
        totalDiscount: 0, 
        totalAmount: 0 
      };
    } catch (error) {
      console.error('Error reading cart:', error);
      return { 
        items: [], 
        totalPriceBeforeDiscount: 0, 
        totalDiscount: 0, 
        totalAmount: 0 
      };
    }
  },

  saveCart(cart) {
    try {
      cart.totalPriceBeforeDiscount = cart.totalPriceBeforeDiscount || 0;
      cart.totalDiscount = cart.totalDiscount || 0;
      cart.totalAmount = cart.totalAmount || 0;
      
      localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
      window.dispatchEvent(new CustomEvent('cartUpdated', { detail: cart }));
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  },

  removeItem(itemId) {
    const cart = this.getCart();
    cart.items = cart.items.filter(item => item.id !== itemId);
    this.updateCartTotals(cart);
    return cart;
  },

  updateQuantity(itemId, quantity) {
    const cart = this.getCart();
    const item = cart.items.find(item => item.id === itemId);
    
    if (!item) {
      console.warn(`Item with id ${itemId} not found`);
      return cart;
    }
    
    if (quantity <= 0) {
      return this.removeItem(itemId);
    }

    item.quantity = quantity;
    const originalUnitPrice = item.unitPrice + (item.productDiscount || 0);
    item.totalPriceBeforeDiscount = originalUnitPrice * quantity;
    item.totalPrice = item.unitPrice * quantity;

    this.updateCartTotals(cart);
    return cart;
  },

  clearCart() {
    const emptyCart = { 
      items: [], 
      totalPriceBeforeDiscount: 0, 
      totalDiscount: 0, 
      totalAmount: 0 
    };
    localStorage.setItem(this.CART_KEY, JSON.stringify(emptyCart));
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: emptyCart }));
  },

  updateCartTotals(cart) {
    const totalPriceBeforeDiscount = cart.items.reduce(
      (sum, item) => sum + (item.totalPriceBeforeDiscount || 0),
      0
    );

    const totalDiscount = cart.items.reduce(
      (sum, item) => sum + ((item.productDiscount || 0) * (item.quantity || 0)),
      0
    );

    const totalAmount = cart.items.reduce(
      (sum, item) => sum + (item.totalPrice || 0),
      0
    );

    cart.totalPriceBeforeDiscount = isNaN(totalPriceBeforeDiscount) ? 0 : totalPriceBeforeDiscount;
    cart.totalDiscount = isNaN(totalDiscount) ? 0 : totalDiscount;
    cart.totalAmount = isNaN(totalAmount) ? 0 : totalAmount;

    this.saveCart(cart);
  }
};

// Debounce utility function
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

// Skeleton Components
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
  const { t, i18n } = useTranslation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [localCart, setLocalCart] = useState({ 
    items: [], 
    totalPriceBeforeDiscount: 0,
    totalDiscount: 0,
    totalAmount: 0 
  });
  
  const [translatedCartItems, setTranslatedCartItems] = useState(null);
  
  const { data: cartItemsD, isLoading: apiLoading, isError } = useGetCartItemsQuery(undefined, {
    skip: !isAuthenticated
  });
  
  const { data: me } = useGetMeQuery();
  const [updateCartItemQuantity] = useUpdateCartItemQuantityMutation();
  const [removeCartItem] = useRemoveCartItemMutation();
  const [removeCart] = useRemoveCartMutation();
  const [createWPOrder, { isLoading: isOrderLoading }] = useCreateWhatsappOrderMutation();

  const [removingItems, setRemovingItems] = useState(new Set());
  const [isRemovingCart, setIsRemovingCart] = useState(false);
  const [localQuantities, setLocalQuantities] = useState({});
  const [updatingItems, setUpdatingItems] = useState(new Set());

  useEffect(() => {
    const authStatus = AuthUtils.isAuthenticated();
    setIsAuthenticated(authStatus);
    
    if (!authStatus) {
      setLocalCart(CartUtils.getCart());
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      const handleCartUpdate = (e) => {
        setLocalCart(e.detail);
      };
      
      window.addEventListener('cartUpdated', handleCartUpdate);
      return () => window.removeEventListener('cartUpdated', handleCartUpdate);
    }
  }, [isAuthenticated]);

  const cartItems = isAuthenticated ? cartItemsD : localCart;
  const isLoading = isAuthenticated ? apiLoading : false;

  useEffect(() => {
    async function translateCartItems() {
      if (!cartItems?.items || cartItems.items.length === 0) return;
      
      const targetLang = i18n.language;
      if (targetLang === 'en') {
        const translated = {
          ...cartItems,
          items: await Promise.all(
            cartItems.items.map(async (item) => ({
              ...item,
              productName: await translateDynamicField(item.productName, targetLang),
              productDescription: item.productDescription ? 
                await translateDynamicField(item.productDescription, targetLang) : 
                item.productDescription
            }))
          )
        };
        setTranslatedCartItems(translated);
      } else {
        setTranslatedCartItems(cartItems);
      }
    }
    translateCartItems();
  }, [i18n.language, cartItems]);

  const createOrder = async () => {
    try {
      const orderPayload = {
        phoneNumber: "0506740649",
        customerName: me?.fullName || "",
        customerPhone: me?.phoneNumber?.replace(/\D/g, '') || "0000000",
        items: cartItems?.items?.map(item => ({
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
        totalAmount: Number(cartItems?.totalAmount) || 0,
        currency: "AZN",
      };

      const response = await createWPOrder(orderPayload).unwrap();

      if (response.whatsAppUrl) {
        window.open(response.whatsAppUrl, "_blank");
        
        if (isAuthenticated) {
          await removeCart().unwrap();
        } else {
          CartUtils.clearCart();
          setLocalCart({ 
            items: [], 
            totalPriceBeforeDiscount: 0,
            totalDiscount: 0,
            totalAmount: 0 
          });
        }
        
        toast.success(t('cartCleared'));
      }
    } catch (error) {
      console.error(error?.data);
      console.error("Error details:", JSON.stringify(error, null, 2));
      toast.error(error?.data || "Error creating order");
    }
  };

  const debouncedUpdate = useMemo(
    () => debounce(async (cartItemId, quantity) => {
      if (!isAuthenticated) return;
      
      try {
        setUpdatingItems(prev => new Set(prev).add(cartItemId));
        await updateCartItemQuantity({ cartItemId, quantity }).unwrap();
      } catch (error) {
        console.error('Failed to update cart item:', error);
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
    }, 500),
    [updateCartItemQuantity, isAuthenticated]
  );

  useEffect(() => {
    if (isAuthenticated && cartItemsD?.items) {
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
  }, [cartItemsD, isAuthenticated]);

  const getEffectiveQuantity = useCallback((item) => {
    return localQuantities[item.id] !== undefined ? localQuantities[item.id] : item.quantity;
  }, [localQuantities]);

  const handleQuantityChange = useCallback((item, newQuantity) => {
    if (newQuantity < 1) return;

    if (isAuthenticated) {
      setLocalQuantities(prev => ({
        ...prev,
        [item.id]: newQuantity
      }));
      debouncedUpdate(item.id, newQuantity);
    } else {
      const updatedCart = CartUtils.updateQuantity(item.id, newQuantity);
      setLocalCart(updatedCart);
    }
  }, [isAuthenticated, debouncedUpdate]);

  const handleIncrement = useCallback((item) => {
    const currentQuantity = getEffectiveQuantity(item);
    handleQuantityChange(item, currentQuantity + 1);
  }, [getEffectiveQuantity, handleQuantityChange]);

  const handleDecrement = useCallback((item) => {
    const currentQuantity = getEffectiveQuantity(item);
    if (currentQuantity > 1) {
      handleQuantityChange(item, currentQuantity - 1);
    }
  }, [getEffectiveQuantity, handleQuantityChange]);

  const handleRemoveItem = async (id) => {
    try {
      setRemovingItems(prev => new Set(prev).add(id));
      
      if (isAuthenticated) {
        await removeCartItem({ id }).unwrap();
      } else {
        const updatedCart = CartUtils.removeItem(id);
        setLocalCart(updatedCart);
      }
      
      toast.success(t('itemRemoved'));
    } catch (error) {
      console.error('Failed to remove cart item:', error);
      toast.error('Failed to remove item');
    } finally {
      setRemovingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  const handleRemoveCart = async () => {
    try {
      setIsRemovingCart(true);
      
      if (isAuthenticated) {
        await removeCart().unwrap();
      } else {
        CartUtils.clearCart();
        setLocalCart({ 
          items: [], 
          totalPriceBeforeDiscount: 0,
          totalDiscount: 0,
          totalAmount: 0 
        });
      }
      
      toast.success(t('cartCleared'));
    } catch (error) {
      console.error('Failed to remove cart:', error);
      toast.error('Failed to clear cart');
    } finally {
      setIsRemovingCart(false);
    }
  };

  if (isError) {
    return (
      <section className="inter bg-[#f7fafc] min-h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">{t('errorLoadingCart')}</h2>
          <p className="text-gray-600">{t('pleaseTryAgainLater')}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="inter bg-[#f7fafc] whitepsace-nowrap">
      <div className="lg:hidden px-4 pl-7 py-4 border-y bg-white lg:border-transparent border-[#dee2e6]">
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
            <h1>{t('myCart')} ({(translatedCartItems || cartItems)?.items?.length || 0})</h1>
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
                {(translatedCartItems || cartItems)?.items?.length === 0 ? (
                  <div className="text-center py-12">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('yourCartIsEmpty')}</h3>
                    <p className="text-gray-600">{t('addItemsToStart')}</p>
                  </div>
                ) : (
                  (translatedCartItems || cartItems)?.items?.map((item, index) => {
                    const effectiveQuantity = getEffectiveQuantity(item);
                    const isItemUpdating = updatingItems.has(item.id);
                    const isItemRemoving = removingItems.has(item.id);

                    return (
                      <div key={item.id}>
                        {/* Mobile View */}
                        <div className="space-y-4 lg:hidden">
                          <div className="flex items-start rounded-lg">
                            <div className="w-30 h-30 rounded-lg flex items-center justify-center mr-4 overflow-hidden">
                              <img
                                className='w-full rounded-lg p-3 aspect-square'
                                src={`https://smartteamaz-001-site1.qtempurl.com${item?.productImageUrl}`}
                                alt={item?.productName || 'Product'}
                                onError={(e) => {
                                  e.target.src = "/Icons/logo.svg"
                                }}
                              />
                            </div>

                            <div className="flex-1">
                              <h3 className="font-semibold text-lg text-gray-900 mb-1">
                                {item.productName}
                              </h3>
                            </div>

                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                              disabled={isItemRemoving || isItemUpdating}
                            >
                              <Trash2 size={24} />
                            </button>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center border border-gray-300 rounded-lg">
                              <button
                                className="p-2 hover:bg-gray-100 transition-colors disabled:opacity-50"
                                onClick={() => handleDecrement(item)}
                                disabled={effectiveQuantity <= 1 || isItemUpdating || isItemRemoving}
                              >
                                <Minus size={16} />
                              </button>
                              <span className={`px-4 py-2 border-x border-[#dee2e6] text-center ${isItemUpdating ? 'opacity-50' : ''}`}>
                                {effectiveQuantity}
                              </span>
                              <button
                                className="p-2 hover:bg-gray-100 transition-colors disabled:opacity-50"
                                onClick={() => handleIncrement(item)}
                                disabled={isItemUpdating || isItemRemoving}
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
                                className="w-full rounded-lg p-3 aspect-square"
                                src={`https://smartteamaz-001-site1.qtempurl.com${item?.productImageUrl}`}
                                alt={item?.productName || "Product"}
                                onError={(e) => {
                                  e.currentTarget.src = "/Icons/logo.svg";
                                }}
                              />
                            </div>

                            <div>
                              <div className="flex-1">
                                <h3 className="font-semibold text-lg text-gray-900 mb-1">
                                  {item.productName}
                                </h3>
                              </div>

                              <button
                                className='px-3 p-1 mt-7 shadow-md bg-white hover:bg-gray-100 cursor-pointer text-red-500 rounded-lg border-1 border-[#dee2e6] disabled:opacity-50 disabled:cursor-not-allowed'
                                onClick={() => handleRemoveItem(item.id)}
                                disabled={isItemRemoving || isItemUpdating}
                              >
                                {isItemRemoving ? t('removing') : t('remove')}
                              </button>
                            </div>
                          </div>

                          <div className="flex flex-col items-end justify-around px-4">
                            <div className="text-lg font-semibold text-gray-900">
                              {(item.unitPrice * effectiveQuantity).toFixed(2)} AZN
                            </div>

                            <div className="flex items-center border border-gray-300 rounded-lg">
                              <button
                                className="p-2 hover:bg-gray-100 h-full cursor-pointer transition-colors disabled:opacity-50"
                                onClick={() => handleDecrement(item)}
                                disabled={effectiveQuantity <= 1 || isItemUpdating || isItemRemoving}
                              >
                                <Minus size={16} />
                              </button>
                              <span className={`px-4 py-2 border-x border-[#dee2e6] text-center ${isItemUpdating ? 'opacity-50' : ''}`}>
                                {effectiveQuantity}
                              </span>
                              <button
                                className="p-2 h-full hover:bg-gray-100 cursor-pointer transition-colors disabled:opacity-50"
                                onClick={() => handleIncrement(item)}
                                disabled={isItemUpdating || isItemRemoving}
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                          </div>
                        </div>

                        {index < ((translatedCartItems || cartItems)?.items?.length - 1) && (
                          <hr className="mx-2 border-[#dee2e6] my-4" />
                        )}
                      </div>
                    )
                  })
                )}

                {(translatedCartItems || cartItems)?.items?.length > 0 && (
                  <>
                    <hr className="mx-2 border-[#dee2e6] hidden lg:block" />
                    <div className='justify-between hidden lg:flex'>
                      <Link to='/' className='flex items-center gap-2 text-white bg-black inter p-2 rounded-lg'>
                        <ArrowLeft size={20} />
                        <p>{t('backToShop')}</p>
                      </Link>
                      <button
                        onClick={() => handleRemoveCart()}
                        className='px-3 bg-white hover:bg-gray-100 cursor-pointer text-red-500 rounded-lg border-1 border-[#bfc2c6] disabled:opacity-50 disabled:cursor-not-allowed'
                        disabled={isRemovingCart}
                      >
                        {isRemovingCart ? t('removingAll') : t('removeAll')}
                      </button>
                    </div>
                  </>
                )}
              </div>

              <div className='lg:bg-white lg:p-5 lg:shadow-sm py-1 lg:h-fit flex-2 lg:rounded-lg'>
                <div className="border-t lg:border-none border-gray-200 pt-4 space-y-3">
                  <div className="flex justify-between text-gray-600 text-lg">
                    <span>{t('subtotal')}:</span>
                    <span>{((translatedCartItems || cartItems)?.totalPriceBeforeDiscount || 0).toFixed(2)} AZN</span>
                  </div>
                  <div className="flex justify-between text-red-500 text-lg">
                    <span>{t('discount')}:</span>
                    <span>- {((translatedCartItems || cartItems)?.totalDiscount || 0).toFixed(2)} AZN</span>
                  </div>
                  <div className="flex justify-between text-lg mb-7 font-bold text-gray-900 pt-2 border-t border-gray-200">
                    <span>{t('total')}:</span>
                    <span>{((translatedCartItems || cartItems)?.totalAmount || 0).toFixed(2)} AZN</span>
                  </div>
                </div>

                <button
                  onClick={() => createOrder()}
                  className="w-full cursor-pointer bg-red-500 hover:bg-red-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isOrderLoading || !(translatedCartItems || cartItems)?.items?.length}
                >
                  <ShoppingCart size={20} />
                  <span>{isOrderLoading ? 'Processing...' : t('buyNow')}</span>
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