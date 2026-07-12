// ── Home Page — Product Listing ──
const HomePage = {
  currentCategory: 'All',
  products: [],
  categories: [],

  async render() {
    const main = document.getElementById('app-main');
    main.innerHTML = `
      <div class="container">
        <section class="hero">
          <div class="hero-badge">🌿 Fresh & Organic</div>
          <h1>
            Shop <span class="gradient-text">Fresh Groceries</span><br>
            Delivered to Your Door
          </h1>
          <p>Browse our curated selection of premium groceries. From farm-fresh produce to artisan bakery items.</p>
        </section>

        <div class="category-bar" id="category-bar">
          <div class="skeleton" style="width:100%;height:40px;"></div>
        </div>

        <div class="product-stats" id="product-stats"></div>

        <div class="product-grid" id="product-grid">
          ${Array(8).fill('<div class="product-card"><div class="skeleton" style="height:280px;"></div></div>').join('')}
        </div>
      </div>
    `;

    await this.loadProducts();
  },

  async loadProducts(category, search) {
    try {
      const data = await API.getProducts(category, search);
      this.products = data.products;
      this.categories = data.categories;
      this.renderCategories();
      this.renderProducts();
    } catch (err) {
      Toast.error('Failed to load products');
    }
  },

  renderCategories() {
    const bar = document.getElementById('category-bar');
    const allCategories = ['All', ...this.categories];

    bar.innerHTML = allCategories.map(cat => {
      const emojis = {
        'All': '🏪', 'Fruits': '🍎', 'Vegetables': '🥬',
        'Dairy': '🧀', 'Bakery': '🍞', 'Beverages': '☕', 'Snacks': '🍫'
      };
      return `
        <button
          class="category-chip ${cat === this.currentCategory ? 'active' : ''}"
          onclick="HomePage.filterCategory('${cat}')"
          id="cat-${cat.toLowerCase()}"
        >
          ${emojis[cat] || '📦'} ${cat}
        </button>
      `;
    }).join('');
  },

  renderProducts() {
    const grid = document.getElementById('product-grid');
    const stats = document.getElementById('product-stats');

    stats.innerHTML = `
      <span>Showing ${this.products.length} product${this.products.length !== 1 ? 's' : ''}${this.currentCategory !== 'All' ? ` in ${this.currentCategory}` : ''}</span>
    `;

    if (this.products.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 0; color: var(--text-muted);">
          <div style="font-size: 3rem; margin-bottom: 16px; opacity: 0.4;">🔍</div>
          <p>No products found. Try a different search or category.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = this.products.map((p, i) => ProductCard.render(p, i)).join('');
  },

  filterCategory(category) {
    this.currentCategory = category;
    this.loadProducts(category);
  },

  search(query) {
    this.currentCategory = 'All';
    this.loadProducts(null, query);
  }
};
