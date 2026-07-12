// ── Product Card Component ──
const ProductCard = {
  render(product, index = 0) {
    const delay = Math.min(index * 0.05, 0.5);
    return `
      <div class="product-card" style="animation-delay: ${delay}s" id="product-${product.id}">
        <div class="product-card-emoji">
          ${product.emoji}
        </div>
        <div class="product-card-body">
          <span class="product-category-tag">${product.category}</span>
          <h3 class="product-card-name">${product.name}</h3>
          <p class="product-card-desc">${product.description}</p>
          <div class="product-card-footer">
            <div>
              <span class="product-price">$${product.price.toFixed(2)}</span>
              <span class="product-unit">/ ${product.unit}</span>
            </div>
            <button
              class="add-to-cart-btn"
              onclick="ProductCard.addToCart(${product.id}, this)"
              id="add-btn-${product.id}"
            >
              + Add
            </button>
          </div>
        </div>
      </div>
    `;
  },

  async addToCart(productId, btnElement) {
    try {
      btnElement.disabled = true;
      btnElement.classList.add('added');
      btnElement.innerHTML = '✓ Added';

      await API.addToCart(productId);
      await Header.updateCartBadge();
      Toast.success('Added to cart!');

      setTimeout(() => {
        btnElement.disabled = false;
        btnElement.classList.remove('added');
        btnElement.innerHTML = '+ Add';
      }, 1200);
    } catch (err) {
      btnElement.disabled = false;
      btnElement.classList.remove('added');
      btnElement.innerHTML = '+ Add';
      Toast.error(err.message);
    }
  }
};
