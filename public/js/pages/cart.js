// ── Cart Page (Full Page View) ──
const CartPage = {
  async render() {
    const main = document.getElementById('app-main');

    try {
      const cart = await API.getCart();

      if (cart.items.length === 0) {
        main.innerHTML = `
          <div class="container">
            <div class="orders-empty fade-in">
              <div class="orders-empty-icon">🛒</div>
              <h2>Your cart is empty</h2>
              <p style="margin: 12px 0 24px; color: var(--text-muted);">Add some fresh groceries to get started!</p>
              <button class="btn-primary" onclick="App.navigate('')">Browse Products</button>
            </div>
          </div>
        `;
        return;
      }

      const itemsHTML = cart.items.map(item => `
        <div class="cart-page-item fade-in" id="cart-page-item-${item.productId}">
          <div class="cart-page-item-emoji">${item.product.emoji}</div>
          <div class="cart-page-item-info">
            <div class="cart-page-item-name">${item.product.name}</div>
            <div class="cart-page-item-meta">$${item.product.price.toFixed(2)} / ${item.product.unit}</div>
          </div>
          <div class="cart-page-item-controls">
            <button class="qty-btn" onclick="CartPage.updateQty(${item.productId}, ${item.quantity - 1})">−</button>
            <span class="qty-value">${item.quantity}</span>
            <button class="qty-btn" onclick="CartPage.updateQty(${item.productId}, ${item.quantity + 1})">+</button>
            <button class="cart-item-remove" onclick="CartPage.removeItem(${item.productId})" title="Remove">✕</button>
          </div>
          <div class="cart-page-item-subtotal">$${item.subtotal.toFixed(2)}</div>
        </div>
      `).join('');

      main.innerHTML = `
        <div class="container">
          <div class="page-header">
            <h1 class="page-title">🛒 Shopping Cart</h1>
            <p class="page-subtitle">${cart.totalItems} item${cart.totalItems !== 1 ? 's' : ''} in your cart</p>
          </div>

          <div class="cart-page-layout">
            <div class="cart-page-items">
              ${itemsHTML}
            </div>

            <div class="order-summary">
              <h3 class="order-summary-title">Order Summary</h3>
              <div class="summary-row">
                <span>Subtotal (${cart.totalItems} items)</span>
                <span>$${cart.totalPrice.toFixed(2)}</span>
              </div>
              <div class="summary-row">
                <span>Delivery</span>
                <span style="color: var(--accent);">Free</span>
              </div>
              <div class="summary-row">
                <span>Tax (estimated)</span>
                <span>$${(cart.totalPrice * 0.08).toFixed(2)}</span>
              </div>
              <div class="summary-row total">
                <span>Total</span>
                <span class="summary-value">$${(cart.totalPrice * 1.08).toFixed(2)}</span>
              </div>
              <div class="summary-actions">
                <button class="checkout-btn" onclick="App.navigate('checkout')" id="cart-page-checkout">
                  Proceed to Checkout →
                </button>
                <button class="clear-cart-btn" onclick="CartPage.clearCart()" id="clear-cart-btn">
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
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
  },

  async clearCart() {
    try {
      await API.clearCart();
      await this.render();
      await Header.updateCartBadge();
      Toast.info('Cart cleared');
    } catch (err) {
      Toast.error(err.message);
    }
  }
};
