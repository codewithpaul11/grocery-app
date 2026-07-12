const express = require('express');
const router = express.Router();
const store = require('../store');

// POST /api/orders — Place a new order
router.post('/', (req, res) => {
  const { name, email, phone, address } = req.body;

  if (!name || !email || !address) {
    return res.status(400).json({ error: 'Name, email, and address are required' });
  }

  const result = store.placeOrder({ name, email, phone, address });
  if (result.error) {
    return res.status(400).json(result);
  }
  res.status(201).json(result);
});

// GET /api/orders — Get order history
router.get('/', (req, res) => {
  res.json(store.getOrders());
});

module.exports = router;
