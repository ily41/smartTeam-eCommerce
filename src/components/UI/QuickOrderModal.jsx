import React, { useState } from 'react';
import { X, ShoppingBag, Loader2, Check } from 'lucide-react';
import { useQuickOrderMutation } from '../../store/API';

const QuickOrderModal = ({ isOpen, onClose, product, quantity }) => {
    console.log(product)
  const [formData, setFormData] = useState({
    customerName: '',
    phoneNumber: '0703569121',
    customerPhone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [createWPOrder, { isLoading: isOrderLoading }] = useQuickOrderMutation();
  

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const validateForm = () => {
    if (!formData.customerName.trim()) {
      setError('Please enter your name');
      return false;
    }
    if (!formData.customerPhone.trim()) {
      setError('Please enter your customer phone');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setError('');

    try {

        const orderPayload = {
          productId: product.id,
          quantity: quantity,
          phoneNumber: "+9940706740649",
          customerName: formData.customerName,
          customerPhone: formData.customerPhone
        }

      const response = await createWPOrder(orderPayload).unwrap();
      if (response.whatsAppUrl) {
          window.open(response.whatsAppUrl, "_blank");
      }

      setIsSuccess(true);
      
      setTimeout(() => {
        setFormData({
          customerName: '',
          phoneNumber: '',
          customerPhone: ''
        });
        setIsSuccess(false);
        onClose();
      }, 2000);

    } catch (err) {
      console.error('Quick order error:', err);
      setError('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({
        customerName: '',
        phoneNumber: '',
        customerPhone: ''
      });
      setError('');
      setIsSuccess(false);
      onClose();
    }
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-5000 flex items-center justify-center p-4"
        onClick={handleClose}
      >
        <div 
          className="bg-white rounded-lg max-w-md w-full shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <ShoppingBag className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Quick Order</h3>
            </div>
            <button
              onClick={handleClose}
              disabled={isSubmitting}
              className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Product Info */}
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <img 
                src={`https://smartteamaz-001-site1.qtempurl.com${product?.imageUrl}`}
                alt={product?.name}
                className="w-16 h-16 object-contain rounded-lg bg-white p-2"
                onError={(e) => {
                  e.target.src = "/Icons/logo.svg"
                }}
              />
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 line-clamp-2">{product?.name}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-red-600 font-semibold">{product?.prices[0]?.discountedPrice} AZN</span>
                  <span className="text-gray-500 text-sm">× {quantity}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="customerName"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  disabled={isSubmitting || isSuccess}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>

         

              <div>
                <label htmlFor="customerPhone" className="block text-sm font-medium text-gray-700 mb-1">
                  phone number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="customerPhone"
                  name="customerPhone"
                  value={formData.customerPhone}
                  onChange={handleInputChange}
                  disabled={isSubmitting || isSuccess}
                  placeholder="+994 XX XXX XX XX"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}
            </div>

            {/* Total */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 font-medium">Total Amount:</span>
                <span className="text-2xl font-bold text-gray-900">
                  {(product?.prices[0]?.discountedPrice * quantity).toFixed(2)} AZN
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || isSuccess}
              className={`w-full mt-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                isSuccess
                  ? 'bg-green-500 text-white cursor-default'
                  : isSubmitting
                  ? 'bg-red-400 text-white cursor-not-allowed'
                  : 'bg-red-500 hover:bg-red-600 text-white cursor-pointer'
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : isSuccess ? (
                <>
                  <Check className="w-5 h-5" />
                  Order Placed Successfully!
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" />
                  Place Order
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default QuickOrderModal;