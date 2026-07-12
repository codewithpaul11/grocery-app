// ── API Client Module ──
const API = {
  base: '/api',

  async request(endpoint, options = {}) {
    const url = `${this.base}${endpoint}`;
    const config = {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    };
    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }
    const res = await fetch(url, config);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Request failed');
    return data;
  },

  // ── Products ──
  getProducts(category, search) {
    const params = new URLSearchParams();
    if (category && category !== 'All') params.set('category', category);
    if (search) params.set('search', search);
    const qs = params.toString();
    return this.request(`/products${qs ? '?' + qs : ''}`);
  },

  getProduct(id) {
    return this.request(`/products/${id}`);
  },

  // ── Cart ──
  getCart() {
    return this.request('/cart');
  },

  addToCart(productId, quantity = 1) {
    return this.request('/cart', {
      method: 'POST',
      body: { productId, quantity }
    });
  },

  updateCartItem(productId, quantity) {
    return this.request(`/cart/${productId}`, {
      method: 'PUT',
      body: { quantity }
    });
  },

  removeFromCart(productId) {
    return this.request(`/cart/${productId}`, { method: 'DELETE' });
  },

  clearCart() {
    return this.request('/cart', { method: 'DELETE' });
  },

  // ── Orders ──
  placeOrder(customerInfo) {
    return this.request('/orders', {
      method: 'POST',
      body: customerInfo
    });
  },

  getOrders() {
    return this.request('/orders');
  }
};
