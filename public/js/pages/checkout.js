// ── Checkout Page ──
const CheckoutPage = {
  async render() {
    const main = document.getElementById('app-main');

    try {
      const cart = await API.getCart();

      if (cart.items.length === 0) {
        main.innerHTML = `
          <div class="container">
            <div class="orders-empty fade-in">
              <div class="orders-empty-icon">🛒</div>
              <h2>Nothing to checkout</h2>
              <p style="margin: 12px 0 24px; color: var(--text-muted);">Add items to your cart first!</p>
              <button class="btn-primary" onclick="App.navigate('')">Browse Products</button>
            </div>
          </div>
        `;
        return;
      }

      const taxAmount = (cart.totalPrice * 0.08).toFixed(2);
      const finalTotal = (cart.totalPrice * 1.08).toFixed(2);

      main.innerHTML = `
        <div class="container">
          <div class="page-header">
            <h1 class="page-title">📦 Checkout</h1>
            <p class="page-subtitle">Complete your order</p>
          </div>

          <div class="checkout-layout">
            <div class="checkout-form-card fade-in">
              <h3 class="form-section-title">📍 Delivery Information</h3>

              <form id="checkout-form" onsubmit="CheckoutPage.submitOrder(event)">
                <div class="form-row">
                  <div class="form-group">
                    <label class="form-label" for="checkout-name">Full Name *</label>
                    <input type="text" class="form-input" id="checkout-name" placeholder="John Doe" required />
                  </div>
                  <div class="form-group">
                    <label class="form-label" for="checkout-email">Email *</label>
                    <input type="email" class="form-input" id="checkout-email" placeholder="john@example.com" required />
                  </div>
                </div>

                <div class="form-group">
                  <label class="form-label" for="checkout-phone">Phone Number</label>
                  <input type="tel" class="form-input" id="checkout-phone" placeholder="+1 (555) 123-4567" />
                </div>

                <div class="form-group">
                  <label class="form-label" for="checkout-address">Delivery Address *</label>
                  <textarea class="form-input" id="checkout-address" placeholder="123 Main St, Apt 4B, New York, NY 10001" required></textarea>
                </div>

                <button type="submit" class="place-order-btn" id="place-order-btn">
                  🛒 Place Order — $${finalTotal}
                </button>
              </form>
            </div>

            <div class="order-summary fade-in">
              <h3 class="order-summary-title">Order Summary</h3>
              ${cart.items.map(item => `
                <div class="summary-row">
                  <span>${item.product.emoji} ${item.product.name} × ${item.quantity}</span>
                  <span>$${item.subtotal.toFixed(2)}</span>
                </div>
              `).join('')}
              <div class="summary-row">
                <span>Subtotal</span>
                <span>$${cart.totalPrice.toFixed(2)}</span>
              </div>
              <div class="summary-row">
                <span>Delivery</span>
                <span style="color: var(--accent);">Free</span>
              </div>
              <div class="summary-row">
                <span>Tax</span>
                <span>$${taxAmount}</span>
              </div>
              <div class="summary-row total">
                <span>Total</span>
                <span class="summary-value">$${finalTotal}</span>
              </div>
            </div>
          </div>
        </div>
      `;
    } catch (err) {
      Toast.error('Failed to load checkout');
    }
  },

  async submitOrder(e) {
    e.preventDefault();
    const btn = document.getElementById('place-order-btn');
    btn.disabled = true;
    btn.innerHTML = '⏳ Placing Order...';

    try {
      const customerInfo = {
        name: document.getElementById('checkout-name').value.trim(),
        email: document.getElementById('checkout-email').value.trim(),
        phone: document.getElementById('checkout-phone').value.trim(),
        address: document.getElementById('checkout-address').value.trim()
      };

      const order = await API.placeOrder(customerInfo);
      await Header.updateCartBadge();

      // Show success page
      this.showSuccess(order);
    } catch (err) {
      btn.disabled = false;
      btn.innerHTML = '🛒 Place Order';
      Toast.error(err.message);
    }
  },

  showSuccess(order) {
    const main = document.getElementById('app-main');
    main.innerHTML = `
      <div class="container">
        <div class="order-success fade-in">
          <div class="success-icon">✓</div>
          <h2>Order Placed Successfully!</h2>
          <p>Thank you for shopping with Fresh Basket. Your groceries are on the way!</p>
          <div class="order-id-badge">Order #${order.id}</div>
          <div style="margin-bottom: 16px;">
            <div style="font-size: 1.3rem; font-weight: 700; color: var(--accent-light);">$${(order.total * 1.08).toFixed(2)}</div>
            <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 4px;">${order.totalItems} item${order.totalItems !== 1 ? 's' : ''}</div>
          </div>
          <div class="success-actions">
            <button class="btn-primary" onclick="App.navigate('')">Continue Shopping</button>
            <button class="btn-secondary" onclick="App.navigate('orders')">View Orders</button>
          </div>
        </div>
      </div>
    `;
  }
};
