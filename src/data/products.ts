import { Product, Category } from '../types';

export const categories: Category[] = [
  {
    id: 'produce',
    name: 'Fresh Produce',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop',
    icon: '🥬',
    productCount: 45
  },
  {
    id: 'dairy',
    name: 'Dairy & Eggs',
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=300&fit=crop',
    icon: '🥛',
    productCount: 28
  },
  {
    id: 'meat',
    name: 'Meat & Seafood',
    image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&h=300&fit=crop',
    icon: '🥩',
    productCount: 32
  },
  {
    id: 'pantry',
    name: 'Pantry Staples',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop',
    icon: '🥫',
    productCount: 67
  },
  {
    id: 'bakery',
    name: 'Bakery',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop',
    icon: '🍞',
    productCount: 23
  },
  {
    id: 'frozen',
    name: 'Frozen Foods',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
    icon: '🧊',
    productCount: 41
  }
];

export const products: Product[] = [
  // Fresh Produce
  {
    id: '1',
    name: 'Organic Bananas',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=400&fit=crop',
    category: 'produce',
    description: 'Fresh organic bananas, perfect for snacking or smoothies',
    unit: 'per bunch',
    inStock: true,
    rating: 4.5,
    reviewCount: 128,
    nutritionalInfo: {
      calories: 105,
      protein: '1.3g',
      carbs: '27g',
      fat: '0.4g'
    },
    tags: ['organic', 'fresh', 'potassium']
  },
  {
    id: '2',
    name: 'Fresh Avocados',
    price: 1.99,
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&h=400&fit=crop',
    category: 'produce',
    description: 'Ripe and creamy avocados, great for toast or salads',
    unit: 'each',
    inStock: true,
    rating: 4.7,
    reviewCount: 89,
    nutritionalInfo: {
      calories: 234,
      protein: '2.9g',
      carbs: '12g',
      fat: '21g'
    },
    tags: ['healthy fats', 'fresh', 'versatile']
  },
  {
    id: '3',
    name: 'Organic Baby Spinach',
    price: 3.49,
    originalPrice: 3.99,
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop',
    category: 'produce',
    description: 'Fresh organic baby spinach leaves, pre-washed and ready to eat',
    unit: '5oz bag',
    inStock: true,
    rating: 4.3,
    reviewCount: 156,
    nutritionalInfo: {
      calories: 7,
      protein: '0.9g',
      carbs: '1.1g',
      fat: '0.1g'
    },
    tags: ['organic', 'iron', 'vitamins', 'salad']
  },
  {
    id: '4',
    name: 'Roma Tomatoes',
    price: 2.49,
    image: 'https://images.unsplash.com/photo-1546470427-e5ac89cd0b31?w=400&h=400&fit=crop',
    category: 'produce',
    description: 'Fresh Roma tomatoes, perfect for cooking and sauces',
    unit: 'per kg',
    inStock: false,
    rating: 4.2,
    reviewCount: 73,
    nutritionalInfo: {
      calories: 18,
      protein: '0.9g',
      carbs: '3.9g',
      fat: '0.2g'
    },
    tags: ['fresh', 'cooking', 'vitamin C']
  },

  // Dairy & Eggs
  {
    id: '5',
    name: 'Organic Whole Milk',
    price: 4.29,
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=400&fit=crop',
    category: 'dairy',
    description: 'Fresh organic whole milk from grass-fed cows',
    unit: '1 gallon',
    inStock: true,
    rating: 4.6,
    reviewCount: 234,
    nutritionalInfo: {
      calories: 150,
      protein: '8g',
      carbs: '12g',
      fat: '8g'
    },
    tags: ['organic', 'calcium', 'protein', 'grass-fed']
  },
  {
    id: '6',
    name: 'Free-Range Eggs',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&h=400&fit=crop',
    category: 'dairy',
    description: 'Farm-fresh free-range eggs from happy hens',
    unit: 'dozen',
    inStock: true,
    rating: 4.8,
    reviewCount: 189,
    nutritionalInfo: {
      calories: 70,
      protein: '6g',
      carbs: '0.6g',
      fat: '5g'
    },
    tags: ['free-range', 'protein', 'fresh', 'farm']
  },
  {
    id: '7',
    name: 'Greek Yogurt',
    price: 6.49,
    originalPrice: 7.99,
    image: 'https://images.unsplash.com/photo-1571212515416-fca88c2d2c3e?w=400&h=400&fit=crop',
    category: 'dairy',
    description: 'Creamy Greek yogurt, high in protein and probiotics',
    unit: '32oz container',
    inStock: true,
    rating: 4.4,
    reviewCount: 167,
    nutritionalInfo: {
      calories: 100,
      protein: '17g',
      carbs: '6g',
      fat: '0g'
    },
    tags: ['protein', 'probiotics', 'healthy', 'greek']
  },

  // Meat & Seafood
  {
    id: '8',
    name: 'Grass-Fed Ground Beef',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1588347818133-0c4de2b4b6e8?w=400&h=400&fit=crop',
    category: 'meat',
    description: 'Premium grass-fed ground beef, 85% lean',
    unit: 'per kg',
    inStock: true,
    rating: 4.7,
    reviewCount: 92,
    nutritionalInfo: {
      calories: 250,
      protein: '22g',
      carbs: '0g',
      fat: '17g'
    },
    tags: ['grass-fed', 'protein', 'premium', 'lean']
  },
  {
    id: '9',
    name: 'Atlantic Salmon Fillet',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=400&h=400&fit=crop',
    category: 'meat',
    description: 'Fresh Atlantic salmon fillet, rich in omega-3',
    unit: 'per kg',
    inStock: false,
    rating: 4.5,
    reviewCount: 78,
    nutritionalInfo: {
      calories: 206,
      protein: '22g',
      carbs: '0g',
      fat: '12g'
    },
    tags: ['omega-3', 'fresh', 'protein', 'healthy']
  },

  // Pantry Staples
  {
    id: '10',
    name: 'Organic Quinoa',
    price: 7.99,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop',
    category: 'pantry',
    description: 'Organic tri-color quinoa, complete protein grain',
    unit: '1kg bag',
    inStock: true,
    rating: 4.6,
    reviewCount: 145,
    nutritionalInfo: {
      calories: 222,
      protein: '8g',
      carbs: '39g',
      fat: '4g'
    },
    tags: ['organic', 'protein', 'gluten-free', 'superfood']
  },
  {
    id: '11',
    name: 'Extra Virgin Olive Oil',
    price: 9.99,
    originalPrice: 12.99,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop',
    category: 'pantry',
    description: 'Cold-pressed extra virgin olive oil from Italy',
    unit: '500ml bottle',
    inStock: true,
    rating: 4.8,
    reviewCount: 203,
    nutritionalInfo: {
      calories: 884,
      protein: '0g',
      carbs: '0g',
      fat: '100g'
    },
    tags: ['cold-pressed', 'italian', 'healthy fats', 'cooking']
  },

  // Bakery
  {
    id: '12',
    name: 'Artisan Sourdough Bread',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop',
    category: 'bakery',
    description: 'Fresh-baked artisan sourdough bread, made daily',
    unit: 'per loaf',
    inStock: true,
    rating: 4.7,
    reviewCount: 112,
    nutritionalInfo: {
      calories: 80,
      protein: '3g',
      carbs: '15g',
      fat: '1g'
    },
    tags: ['artisan', 'fresh-baked', 'sourdough', 'daily']
  }
];

export const featuredProducts = products.filter(p => p.originalPrice || p.rating >= 4.5).slice(0, 8);