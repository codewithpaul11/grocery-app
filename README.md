# 🛒 Fresh Basket — Grocery Shopping App

A premium, full-stack grocery shopping application built with Node.js, Express, and vanilla JavaScript.

## Quick Start

```bash
# 1. Navigate to the project folder
cd "c:\Users\Dell\OneDrive\Desktop\demo for antigravity\grocery-app"

# 2. Install dependencies
npm install

# 3. Start the server
npm start
```

Then open **http://localhost:3000** in your browser!

## Features

- 🏪 **Browse 36+ Products** across 6 categories (Fruits, Vegetables, Dairy, Bakery, Beverages, Snacks)
- 🔍 **Search & Filter** by product name or category
- 🛒 **Shopping Cart** with slide-in drawer and full page view
- 📦 **Checkout** with delivery form and order summary
- 📋 **Order History** to track past orders
- ✨ **Premium UI** with dark theme, glassmorphism, and smooth animations

## Tech Stack

| Layer | Technology |
|:------|:-----------|
| Backend | Node.js + Express |
| Frontend | Vanilla HTML, CSS, JavaScript |
| Data | In-memory store (no database needed) |

## API Endpoints

| Method | Endpoint | Description |
|:-------|:---------|:------------|
| GET | `/api/products` | List products (with `?category=` and `?search=`) |
| GET | `/api/products/:id` | Get single product |
| GET | `/api/cart` | Get current cart |
| POST | `/api/cart` | Add item to cart |
| PUT | `/api/cart/:productId` | Update item quantity |
| DELETE | `/api/cart/:productId` | Remove item from cart |
| DELETE | `/api/cart` | Clear cart |
| POST | `/api/orders` | Place order |
| GET | `/api/orders` | Get order history |

## Project Structure

```
grocery-app/
├── server/
│   ├── index.js              # Express server
│   ├── routes/
│   │   ├── products.js       # Product API
│   │   ├── cart.js            # Cart API
│   │   └── orders.js         # Order API
│   ├── data/
│   │   └── products.js       # 36 seed products
│   └── store/
│       └── index.js           # In-memory data store
├── public/
│   ├── index.html             # SPA shell
│   ├── css/styles.css         # Premium design system
│   └── js/
│       ├── app.js             # SPA router
│       ├── api.js             # API client
│       ├── components/        # Reusable UI components
│       └── pages/             # Page modules
├── package.json
└── README.md
```

## Author

**Chinmay Paul**
[LinkedIn](https://www.linkedin.com/in/chinmay-paul-93ba06380?utm_source=share_via&utm_content=profile&utm_medium=member_android) · [GitHub](https://github.com/codewithpaul11)