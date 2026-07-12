const products = require('../data/products');

// ── In-Memory Store ──
const store = {
  products: [...products],
  cart: [],       // Array of { productId, quantity }
  orders: [],     // Array of completed orders
  nextOrderId: 1001,

  // ── Product Methods ──
  getAllProducts(category, search) {
    let result = this.products;
    if (category && category !== 'All') {
      result = result.filter(p => p.category === category);
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }
    return result;
  },

  getProductById(id) {
    return this.products.find(p => p.id === parseInt(id));
  },

  getCategories() {
    return [...new Set(this.products.map(p => p.category))];
  },

  // ── Cart Methods ──
  getCart() {
    const items = this.cart.map(item => {
      const product = this.getProductById(item.productId);
      return {
        ...item,
        product,
        subtotal: product ? +(product.price * item.quantity).toFixed(2) : 0
      };
    });
    const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
    const totalPrice = +items.reduce((sum, i) => sum + i.subtotal, 0).toFixed(2);
    return { items, totalItems, totalPrice };
  },

  addToCart(productId, quantity = 1) {
    const product = this.getProductById(productId);
    if (!product) return { error: 'Product not found' };
    if (!product.inStock) return { error: 'Product out of stock' };

    const existing = this.cart.find(i => i.productId === productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.cart.push({ productId, quantity });
    }
    return this.getCart();
  },

  updateCartItem(productId, quantity) {
    const idx = this.cart.findIndex(i => i.productId === parseInt(productId));
    if (idx === -1) return { error: 'Item not in cart' };
    if (quantity <= 0) {
      this.cart.splice(idx, 1);
    } else {
      this.cart[idx].quantity = quantity;
    }
    return this.getCart();
  },

  removeFromCart(productId) {
    this.cart = this.cart.filter(i => i.productId !== parseInt(productId));
    return this.getCart();
  },

  clearCart() {
    this.cart = [];
    return this.getCart();
  },

  // ── Order Methods ──
  placeOrder(customerInfo) {
    const cart = this.getCart();
    if (cart.items.length === 0) return { error: 'Cart is empty' };

    const order = {
      id: this.nextOrderId++,
      items: cart.items.map(i => ({
        productId: i.productId,
        name: i.product.name,
        emoji: i.product.emoji,
        price: i.product.price,
        quantity: i.quantity,
        subtotal: i.subtotal
      })),
      total: cart.totalPrice,
      totalItems: cart.totalItems,
      customerInfo,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    this.orders.unshift(order);
    this.cart = [];
    return order;
  },

  getOrders() {
    return this.orders;
  }
};

module.exports = store;
