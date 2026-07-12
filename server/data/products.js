const products = [
  // ── Fruits ──
  { id: 1, name: "Organic Bananas", price: 1.29, category: "Fruits", emoji: "🍌", description: "Sweet and perfectly ripe organic bananas. Rich in potassium and great for smoothies.", unit: "bunch", inStock: true },
  { id: 2, name: "Fresh Strawberries", price: 3.99, category: "Fruits", emoji: "🍓", description: "Juicy red strawberries picked at peak ripeness. Perfect for desserts and snacking.", unit: "lb", inStock: true },
  { id: 3, name: "Honeycrisp Apples", price: 2.49, category: "Fruits", emoji: "🍎", description: "Crispy and sweet Honeycrisp apples. A perfect healthy snack any time of day.", unit: "lb", inStock: true },
  { id: 4, name: "Ripe Avocados", price: 1.99, category: "Fruits", emoji: "🥑", description: "Creamy Hass avocados, ready to eat. Ideal for guacamole, toast, or salads.", unit: "each", inStock: true },
  { id: 5, name: "Fresh Blueberries", price: 4.49, category: "Fruits", emoji: "🫐", description: "Plump, antioxidant-rich blueberries. Great for baking, smoothies, or by the handful.", unit: "pint", inStock: true },
  { id: 6, name: "Navel Oranges", price: 3.29, category: "Fruits", emoji: "🍊", description: "Seedless navel oranges bursting with vitamin C. Sweet, juicy, and easy to peel.", unit: "bag", inStock: true },

  // ── Vegetables ──
  { id: 7, name: "Baby Spinach", price: 3.49, category: "Vegetables", emoji: "🥬", description: "Tender baby spinach leaves, triple-washed and ready to eat. Perfect for salads.", unit: "5oz bag", inStock: true },
  { id: 8, name: "Roma Tomatoes", price: 2.29, category: "Vegetables", emoji: "🍅", description: "Firm Roma tomatoes ideal for sauces, salads, and sandwiches.", unit: "lb", inStock: true },
  { id: 9, name: "Sweet Bell Peppers", price: 3.99, category: "Vegetables", emoji: "🫑", description: "Colorful mix of red, yellow, and green bell peppers. Crunchy and sweet.", unit: "3-pack", inStock: true },
  { id: 10, name: "Organic Carrots", price: 1.99, category: "Vegetables", emoji: "🥕", description: "Sweet organic carrots, perfect for snacking, roasting, or juicing.", unit: "1lb bag", inStock: true },
  { id: 11, name: "Fresh Broccoli", price: 2.49, category: "Vegetables", emoji: "🥦", description: "Crisp broccoli crowns packed with vitamins. Great steamed, roasted, or stir-fried.", unit: "bunch", inStock: true },
  { id: 12, name: "Russet Potatoes", price: 3.99, category: "Vegetables", emoji: "🥔", description: "Classic Russet potatoes perfect for baking, mashing, or making fries.", unit: "5lb bag", inStock: true },

  // ── Dairy ──
  { id: 13, name: "Whole Milk", price: 4.29, category: "Dairy", emoji: "🥛", description: "Farm-fresh whole milk, pasteurized and homogenized. Rich and creamy taste.", unit: "gallon", inStock: true },
  { id: 14, name: "Greek Yogurt", price: 5.49, category: "Dairy", emoji: "🍶", description: "Thick and creamy Greek yogurt with double the protein. Plain, unsweetened.", unit: "32oz", inStock: true },
  { id: 15, name: "Sharp Cheddar", price: 4.99, category: "Dairy", emoji: "🧀", description: "Aged sharp cheddar cheese with a bold, tangy flavor. Perfect for snacking.", unit: "8oz block", inStock: true },
  { id: 16, name: "Large Eggs", price: 3.79, category: "Dairy", emoji: "🥚", description: "Grade A large eggs from cage-free hens. Fresh and perfect for any meal.", unit: "dozen", inStock: true },
  { id: 17, name: "Salted Butter", price: 4.49, category: "Dairy", emoji: "🧈", description: "Rich, creamy salted butter churned from fresh cream. Essential for cooking.", unit: "1lb", inStock: true },
  { id: 18, name: "Cream Cheese", price: 2.99, category: "Dairy", emoji: "🫕", description: "Smooth and spreadable cream cheese. Perfect for bagels, baking, and dips.", unit: "8oz", inStock: true },

  // ── Bakery ──
  { id: 19, name: "Sourdough Bread", price: 4.99, category: "Bakery", emoji: "🍞", description: "Artisan sourdough bread with a crispy crust and tangy, chewy interior.", unit: "loaf", inStock: true },
  { id: 20, name: "Chocolate Croissants", price: 5.99, category: "Bakery", emoji: "🥐", description: "Flaky, buttery croissants filled with rich dark chocolate. Baked fresh daily.", unit: "4-pack", inStock: true },
  { id: 21, name: "Whole Wheat Tortillas", price: 3.49, category: "Bakery", emoji: "🫓", description: "Soft whole wheat tortillas perfect for wraps, burritos, and quesadillas.", unit: "10-pack", inStock: true },
  { id: 22, name: "Blueberry Muffins", price: 4.99, category: "Bakery", emoji: "🧁", description: "Moist blueberry muffins topped with streusel. A delicious breakfast treat.", unit: "4-pack", inStock: true },
  { id: 23, name: "Bagels Variety", price: 4.49, category: "Bakery", emoji: "🥯", description: "Assorted bagels including plain, everything, and sesame. Chewy and satisfying.", unit: "6-pack", inStock: true },
  { id: 24, name: "Cinnamon Rolls", price: 5.49, category: "Bakery", emoji: "🧇", description: "Warm cinnamon rolls swirled with cinnamon sugar and topped with cream cheese icing.", unit: "4-pack", inStock: true },

  // ── Beverages ──
  { id: 25, name: "Cold Brew Coffee", price: 4.99, category: "Beverages", emoji: "☕", description: "Smooth, bold cold brew coffee concentrate. Just add water or milk and enjoy.", unit: "32oz", inStock: true },
  { id: 26, name: "Fresh Orange Juice", price: 5.99, category: "Beverages", emoji: "🧃", description: "Not-from-concentrate orange juice, freshly squeezed for maximum flavor.", unit: "52oz", inStock: true },
  { id: 27, name: "Sparkling Water", price: 4.49, category: "Beverages", emoji: "💧", description: "Refreshing sparkling mineral water with natural carbonation. Zero calories.", unit: "12-pack", inStock: true },
  { id: 28, name: "Green Tea", price: 3.99, category: "Beverages", emoji: "🍵", description: "Premium Japanese green tea bags. Rich in antioxidants with a smooth, mellow taste.", unit: "20 bags", inStock: true },
  { id: 29, name: "Almond Milk", price: 3.49, category: "Beverages", emoji: "🥜", description: "Unsweetened vanilla almond milk. Creamy, dairy-free, and low calorie.", unit: "64oz", inStock: true },
  { id: 30, name: "Coconut Water", price: 2.99, category: "Beverages", emoji: "🥥", description: "Pure coconut water with natural electrolytes. The ultimate hydration drink.", unit: "16oz", inStock: true },

  // ── Snacks ──
  { id: 31, name: "Mixed Nuts", price: 7.99, category: "Snacks", emoji: "🥜", description: "Premium roasted and salted mixed nuts with almonds, cashews, and pecans.", unit: "16oz", inStock: true },
  { id: 32, name: "Dark Chocolate Bar", price: 3.49, category: "Snacks", emoji: "🍫", description: "72% cacao dark chocolate bar. Rich, smooth, and slightly bittersweet.", unit: "3.5oz", inStock: true },
  { id: 33, name: "Tortilla Chips", price: 3.99, category: "Snacks", emoji: "🌮", description: "Crispy restaurant-style tortilla chips made with stone-ground corn. Lightly salted.", unit: "13oz", inStock: true },
  { id: 34, name: "Granola Bars", price: 4.49, category: "Snacks", emoji: "🍫", description: "Crunchy oat and honey granola bars with dark chocolate chips. Perfect on-the-go.", unit: "6-pack", inStock: true },
  { id: 35, name: "Dried Mangoes", price: 4.99, category: "Snacks", emoji: "🥭", description: "Sweet and chewy dried mango slices. No added sugar, just pure tropical flavor.", unit: "8oz", inStock: true },
  { id: 36, name: "Hummus Classic", price: 3.99, category: "Snacks", emoji: "🫘", description: "Smooth and creamy classic hummus made with chickpeas and tahini.", unit: "10oz", inStock: true }
];

module.exports = products;
