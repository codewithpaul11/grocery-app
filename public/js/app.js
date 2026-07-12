// ── App Router & Initialization ──
const App = {
  routes: {
    '': () => HomePage.render(),
    'home': () => HomePage.render(),
    'cart': () => CartPage.render(),
    'checkout': () => CheckoutPage.render(),
    'orders': () => OrdersPage.render(),
  },

  init() {
    Header.render();
    Header.updateCartBadge();

    // Listen for hash changes
    window.addEventListener('hashchange', () => this.route());

    // Initial route
    this.route();
  },

  route() {
    const hash = window.location.hash.slice(1) || '';
    const page = hash.split('?')[0];
    const handler = this.routes[page] || this.routes[''];

    // Scroll to top on page change
    window.scrollTo({ top: 0, behavior: 'smooth' });

    handler();
  },

  navigate(page) {
    window.location.hash = page;
  }
};

// ── Boot ──
document.addEventListener('DOMContentLoaded', () => App.init());
