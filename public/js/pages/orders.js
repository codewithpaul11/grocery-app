// ── Orders Page ──
const OrdersPage = {
  async render() {
    const main = document.getElementById('app-main');

    try {
      const orders = await API.getOrders();

      if (orders.length === 0) {
        main.innerHTML = `
          <div class="container">
            <div class="page-header">
              <h1 class="page-title">📋 Order History</h1>
            </div>
            <div class="orders-empty fade-in">
              <div class="orders-empty-icon">📦</div>
              <h2>No orders yet</h2>
              <p style="margin: 12px 0 24px; color: var(--text-muted);">Place your first order and it will show up here!</p>
              <button class="btn-primary" onclick="App.navigate('')">Start Shopping</button>
            </div>
          </div>
        `;
        return;
      }

      const ordersHTML = orders.map((order, index) => {
        const date = new Date(order.createdAt);
        const dateStr = date.toLocaleDateString('en-US', {
          year: 'numeric', month: 'short', day: 'numeric',
          hour: '2-digit', minute: '2-digit'
        });

        return `
          <div class="order-card fade-in" style="animation-delay: ${index * 0.1}s" id="order-${order.id}">
            <div class="order-card-header">
              <span class="order-card-id">Order #${order.id}</span>
              <div class="order-status">
                <span class="order-status-dot"></span>
                ${order.status}
              </div>
            </div>
            <div class="order-card-items">
              ${order.items.map(item => `
                <span class="order-item-chip">
                  ${item.emoji} ${item.name} × ${item.quantity}
                </span>
              `).join('')}
            </div>
            <div class="order-card-footer">
              <span class="order-date">${dateStr}</span>
              <span class="order-total">$${(order.total * 1.08).toFixed(2)}</span>
            </div>
          </div>
        `;
      }).join('');

      main.innerHTML = `
        <div class="container">
          <div class="page-header">
            <h1 class="page-title">📋 Order History</h1>
            <p class="page-subtitle">${orders.length} order${orders.length !== 1 ? 's' : ''} placed</p>
          </div>
          <div class="orders-list">
            ${ordersHTML}
          </div>
        </div>
      `;
    } catch (err) {
      Toast.error('Failed to load orders');
    }
  }
};
