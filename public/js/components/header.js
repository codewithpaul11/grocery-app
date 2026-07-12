// ── Header Component ──
const Header = {
  cartCount: 0,

  render() {
    const header = document.getElementById('app-header');
    header.innerHTML = `
      <div class="header-inner">
        <a class="logo" onclick="App.navigate('')" id="logo-link">
          <span class="logo-icon">🛒</span>
          <span class="logo-text">Fresh Basket</span>
        </a>

        <div class="search-wrapper">
          <span class="search-icon">🔍</span>
          <input
            type="text"
            class="search-input"
            id="search-input"
            placeholder="Search groceries..."
            autocomplete="off"
          />
        </div>

        <div class="header-actions">
          <a class="header-btn" onclick="App.navigate('orders')" id="orders-link">
            📋 Orders
          </a>
          <button class="header-btn cart-btn" onclick="CartDrawer.toggle()" id="cart-toggle-btn">
            🛒 Cart
            <span class="cart-badge ${this.cartCount === 0 ? 'hidden' : ''}" id="cart-badge">${this.cartCount}</span>
          </button>
        </div>
      </div>
    `;

    // Search with debounce
    const searchInput = document.getElementById('search-input');
    let debounceTimer;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        if (window.location.hash === '' || window.location.hash === '#' || window.location.hash === '#home') {
          HomePage.search(e.target.value);
        }
      }, 300);
    });
  },

  async updateCartBadge() {
    try {
      const cart = await API.getCart();
      this.cartCount = cart.totalItems;
      const badge = document.getElementById('cart-badge');
      if (badge) {
        badge.textContent = cart.totalItems;
        badge.classList.toggle('hidden', cart.totalItems === 0);
        // Trigger re-animation
        badge.style.animation = 'none';
        badge.offsetHeight; // force reflow
        badge.style.animation = '';
      }
    } catch (e) {
      console.error('Failed to update cart badge:', e);
    }
  }
};
