const express = require('express');
const router = express.Router();
const store = require('../store');

// GET /api/cart — Get current cart
router.get('/', (req, res) => {
  res.json(store.getCart());
});

// POST /api/cart — Add item to cart
router.post('/', (req, res) => {
  const { productId, quantity } = req.body;
  if (!productId) {
    return res.status(400).json({ error: 'productId is required' });
  }
  const result = store.addToCart(parseInt(productId), parseInt(quantity) || 1);
  if (result.error) {
    return res.status(400).json(result);
  }
  res.json(result);
});

// PUT /api/cart/:productId — Update item quantity
router.put('/:productId', (req, res) => {
  const { quantity } = req.body;
  if (quantity === undefined) {
    return res.status(400).json({ error: 'quantity is required' });
  }
  const result = store.updateCartItem(req.params.productId, parseInt(quantity));
  if (result.error) {
    return res.status(400).json(result);
  }
  res.json(result);
});

// DELETE /api/cart/:productId — Remove item from cart
router.delete('/:productId', (req, res) => {
  const result = store.removeFromCart(req.params.productId);
  res.json(result);
});

// DELETE /api/cart — Clear entire cart
router.delete('/', (req, res) => {
  res.json(store.clearCart());
});

module.exports = router;
