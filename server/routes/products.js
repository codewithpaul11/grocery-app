const express = require('express');
const router = express.Router();
const store = require('../store');

// GET /api/products — List all products (with optional filters)
router.get('/', (req, res) => {
  const { category, search } = req.query;
  const products = store.getAllProducts(category, search);
  const categories = store.getCategories();
  res.json({ products, categories, total: products.length });
});

// GET /api/products/:id — Get single product
router.get('/:id', (req, res) => {
  const product = store.getProductById(req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

module.exports = router;
