const CartUtils = {
    CART_KEY: 'ecommerce_cart',

    // ✅ Get cart from localStorage
    getCart() {
        try {
            const cart = localStorage.getItem(this.CART_KEY);
            return cart ? JSON.parse(cart) : {
                items: [],
                totalAmount: 0
            };
        } catch (error) {
            console.error('Error reading cart:', error);
            return {
                items: [],
                totalAmount: 0
            };
        }
    },

    // ✅ Save cart to localStorage + dispatch update event
    saveCart(cart) {
        try {
            localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
            // Trigger update event for listeners (e.g. Header)
            window.dispatchEvent(new CustomEvent('cartUpdated', {
                detail: cart
            }));
        } catch (error) {
            console.error('Error saving cart:', error);
        }
    },

    generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = (Math.random() * 16) | 0;
            const v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    },

    getProductPrice(product) {
        // Use product.currentPrice if present
        if (product.currentPrice) return Number(product.currentPrice);

        if (!product.prices || product.prices.length === 0) return 0;

        const price = product.prices[0];
        return price.discountedPrice > 0 ? price.discountedPrice : price.price;
    },

    addItem(product, quantity = 1) {
        console.log(product)
        const cart = this.getCart();

        const cartItem = {
            id: this.generateUUID(),
            cartId: this.generateUUID(),
            productId: product.id,
            productName: product.name,
            productSku: product.sku,
            productDescription: product.shortDescription || product.description,
            productImageUrl: product.primaryImageUrl || product.images ?.[0]?.imageUrl || '',
            quantity,   
            // totalDiscount: product.prices[0].,
            unitPrice: this.getProductPrice(product),
            totalPrice: this.getProductPrice(product) * quantity,
            createdAt: new Date().toISOString(),
        };

        const existingItemIndex = cart.items.findIndex(
            (item) => item.productId === product.id
        );

        if (existingItemIndex > -1) {
            // Update existing item
            const existingItem = cart.items[existingItemIndex];
            existingItem.quantity += quantity;
            existingItem.totalPrice = existingItem.quantity * existingItem.unitPrice;
        } else {
            // Add new item
            cart.items.push(cartItem);
        }

        // Update total amount
        cart.totalAmount = cart.items.reduce((sum, item) => sum + item.totalPrice, 0);

        this.saveCart(cart);
        return cart;
    },

    removeItem(itemId) {
        const cart = this.getCart();
        cart.items = cart.items.filter((item) => item.id !== itemId);
        cart.totalAmount = cart.items.reduce((sum, item) => sum + item.totalPrice, 0);
        this.saveCart(cart);
        return cart;
    },

    updateQuantity(itemId, quantity) {
        const cart = this.getCart();
        const item = cart.items.find((item) => item.id === itemId);

        if (item && quantity > 0) {
            item.quantity = quantity;
            item.totalPrice = item.quantity * item.unitPrice;
            cart.totalAmount = cart.items.reduce((sum, item) => sum + item.totalPrice, 0);
            this.saveCart(cart);
        }

        return cart;
    },

    clearCart() {
        localStorage.removeItem(this.CART_KEY);
        window.dispatchEvent(
            new CustomEvent('cartUpdated', {
                detail: {
                    items: [],
                    totalAmount: 0
                }
            })
        );
    },

    getItemCount() {
        const cart = this.getCart();
        return cart.items.reduce((sum, item) => sum + item.quantity, 0);
    },
};

export default CartUtils;