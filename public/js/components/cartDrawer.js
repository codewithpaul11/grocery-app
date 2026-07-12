// ── Cart Drawer Component (Slide-in panel) ──
const CartDrawer = {
  isOpen: false,

  toggle() {
    this.isOpen ? this.close() : this.open();
  },

  async open() {
    this.isOpen = true;
    await this.render();
    document.getElementById('cart-drawer').classList.add('open');
    document.getElementById('cart-overlay').classList.add('open');
    document.body.style.overflow = 'hidden';
  },

  close() {
    this.isOpen = false;
    document.getElementById('cart-drawer').classList.remove('open');
    document.getElementById('cart-overlay').classList.remove('open');
    document.body.style.overflow = '';
  },

  async render() {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-overlay');

    try {
      const cart = await API.getCart();

      let itemsHTML = '';
      if (cart.items.length === 0) {
        itemsHTML = `
          <div class="cart-empty">
            <span class="cart-empty-icon">🛒</span>
            <p>Your cart is empty</p>
            <button class="btn-primary" onclick="CartDrawer.close(); App.navigate('');">
              Start Shopping
            </button>
          </div>
        `;
      } else {
        itemsHTML = cart.items.map(item => `
          <div class="cart-item" id="drawer-item-${item.productId}">
            <div class="cart-item-emoji">${item.product.emoji}</div>
            <div class="cart-item-info">
              <div class="cart-item-name">${item.product.name}</div>
              <div class="cart-item-price">$${item.product.price.toFixed(2)} × ${item.quantity} = $${item.subtotal.toFixed(2)}</div>
            </div>
            <div class="cart-item-controls">
              <button class="qty-btn" onclick="CartDrawer.updateQty(${item.productId}, ${item.quantity - 1})">−</button>
              <span class="qty-value">${item.quantity}</span>
              <button class="qty-btn" onclick="CartDrawer.updateQty(${item.productId}, ${item.quantity + 1})">+</button>
              <button class="cart-item-remove" onclick="CartDrawer.removeItem(${item.productId})" title="Remove">✕</button>
            </div>
          </div>
        `).join('');
      }

      drawer.innerHTML = `
        <div class="cart-drawer-header">
          <div class="cart-drawer-title">
            🛒 Your Cart
            <span class="cart-drawer-count">${cart.totalItems} items</span>
          </div>
          <button class="cart-close-btn" onclick="CartDrawer.close()">✕</button>
        </div>
        <div class="cart-drawer-items">
          ${itemsHTML}
        </div>
        ${cart.items.length > 0 ? `
          <div class="cart-drawer-footer">
            <div class="cart-total-row">
              <span class="cart-total-label">Total</span>
              <span class="cart-total-value">$${cart.totalPrice.toFixed(2)}</span>
            </div>
            <button class="checkout-btn" onclick="CartDrawer.close(); App.navigate('checkout');" id="drawer-checkout-btn">
              Proceed to Checkout →
            </button>
          </div>
        ` : ''}
      `;

      // Close on overlay click
      overlay.onclick = () => this.close();

    } catch (err) {
      Toast.error('Failed to load cart');
    }
  },

  async updateQty(productId, quantity) {
    try {
      if (quantity <= 0) {
        await API.removeFromCart(productId);
      } else {
        await API.updateCartItem(productId, quantity);
      }
      await this.render();
      await Header.updateCartBadge();
    } catch (err) {
      Toast.error(err.message);
    }
  },

  async removeItem(productId) {
    try {
      await API.removeFromCart(productId);
      await this.render();
      await Header.updateCartBadge();
      Toast.info('Item removed');
    } catch (err) {
      Toast.error(err.message);
    }
  }
};
