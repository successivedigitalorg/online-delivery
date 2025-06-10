import { Product } from "./types";

export const products: Product[] = [
  {
    id: 1,
    name: "Margherita Pizza",
    description: "Classic pizza with tomato sauce, mozzarella, and basil",
    price: 12.99,
    image: "/pizzas/margherita.svg",
    category: "pizza",
    popular: true,
    vegetarian: true
  },
  {
    id: 2,
    name: "Pepperoni Pizza",
    description: "Pizza with tomato sauce, mozzarella, and pepperoni",
    price: 14.99,
    image: "/pizzas/pepperoni.svg",
    category: "pizza",
    popular: true
  },
  {
    id: 3,
    name: "Hawaiian Pizza",
    description: "Pizza with tomato sauce, mozzarella, ham, and pineapple",
    price: 15.99,
    image: "/pizzas/hawaiian.svg",
    category: "pizza"
  },
  {
    id: 4,
    name: "Veggie Supreme Pizza",
    description: "Pizza with tomato sauce, mozzarella, bell peppers, mushrooms, onions, and olives",
    price: 16.99,
    image: "/pizzas/veggie.svg",
    category: "pizza",
    vegetarian: true
  },
  {
    id: 5,
    name: "BBQ Chicken Pizza",
    description: "Pizza with BBQ sauce, mozzarella, chicken, and red onions",
    price: 17.99,
    image: "/pizzas/bbq-chicken.svg",
    category: "pizza",
    popular: true
  },
  {
    id: 6,
    name: "French Fries",
    description: "Crispy fried potatoes served with ketchup",
    price: 4.99,
    image: "/sides/fries.svg",
    category: "sides",
    vegetarian: true
  },
  {
    id: 7,
    name: "Onion Rings",
    description: "Crispy fried onion rings served with dipping sauce",
    price: 5.99,
    image: "/sides/onion-rings.svg",
    category: "sides",
    vegetarian: true
  },
  {
    id: 8,
    name: "Garlic Bread",
    description: "Fresh bread with garlic butter and herbs",
    price: 3.99,
    image: "/sides/garlic-bread.svg",
    category: "sides",
    vegetarian: true,
    popular: true
  },
  {
    id: 9,
    name: "Caesar Salad",
    description: "Fresh romaine lettuce with Caesar dressing, croutons, and parmesan",
    price: 7.99,
    image: "/sides/caesar-salad.svg",
    category: "sides",
    vegetarian: true
  },
  {
    id: 10,
    name: "Coca Cola",
    description: "Classic refreshing cola drink",
    price: 2.49,
    image: "/drinks/coke.svg",
    category: "drinks"
  },
  {
    id: 11,
    name: "Sprite",
    description: "Crisp, lemon-lime soda",
    price: 2.49,
    image: "/drinks/sprite.svg",
    category: "drinks"
  },
  {
    id: 12,
    name: "Water Bottle",
    description: "Purified bottled water",
    price: 1.99,
    image: "/drinks/water.svg",
    category: "drinks"
  }
];

export const categories = [
  {
    id: "pizza",
    name: "Pizzas",
    image: "/categories/pizza.svg"
  },
  {
    id: "sides",
    name: "Sides",
    image: "/categories/sides.svg"
  },
  {
    id: "drinks",
    name: "Drinks",
    image: "/categories/drinks.svg"
  }
];

export function getProductsByCategory(category: string): Product[] {
  return products.filter(product => product.category === category);
}

export function getPopularProducts(): Product[] {
  return products.filter(product => product.popular);
}

export function getProductById(id: number): Product | undefined {
  return products.find(product => product.id === id);
}