export type Category = "All" | "Raw" | "Roasted" | "Sweet";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  weight: string;
  category: Category;
  image: string;
  isBestseller?: boolean;
}

export const products: Product[] = [
  {
    id: "plain-prasadam",
    name: "Plain Prasadam (Raw)",
    description: "Premium, unroasted raw Makhana. Large, dense, and pure. Perfect for roasting at home or using in traditional Kheer.",
    price: 199,
    originalPrice: 249,
    weight: "100g",
    category: "Raw",
    image: "/Plain Prasadam.png",
    isBestseller: true,
  },
  {
    id: "himalayan-pink-salt",
    name: "Himalayan Pink Salt",
    description: "Lightly roasted with pure Himalayan Pink Salt for a perfect, guilt-free savory crunch.",
    price: 249,
    originalPrice: 299,
    weight: "100g",
    category: "Roasted",
    image: "/Himalyan Pink salt.png",
    isBestseller: true,
  },
  {
    id: "feirly-peri-peri",
    name: "Feirly Peri Peri",
    description: "A spicy, tangy kick! Roasted to perfection and dusted with our signature authentic Peri Peri blend.",
    price: 279,
    weight: "100g",
    category: "Roasted",
    image: "/Feirly Peri Peri.png",
  },
  {
    id: "white-chedaar",
    name: "White Cheddar",
    description: "Creamy, cheesy, and irresistible. The rich taste of white cheddar meets the crunch of Mithila Makhana.",
    price: 279,
    originalPrice: 329,
    weight: "100g",
    category: "Roasted",
    image: "/White Chedaar.png",
    isBestseller: true,
  },
  {
    id: "tandoori-spices",
    name: "Tandoori Spices",
    description: "Infused with smoky, aromatic tandoori spices. A classic Indian flavor experience.",
    price: 279,
    weight: "100g",
    category: "Roasted",
    image: "/Tandoori Spices.png",
  },
  {
    id: "pudina-tadka",
    name: "Pudina Tadka",
    description: "Refreshing mint combined with a zingy tadka. The ultimate cooling yet spicy snack.",
    price: 279,
    weight: "100g",
    category: "Roasted",
    image: "/Pudina Tadka.png",
  },
  {
    id: "garlic-chilli",
    name: "Garlic and Chilli",
    description: "A bold, punchy combination of roasted garlic and fiery chili flakes.",
    price: 279,
    weight: "100g",
    category: "Roasted",
    image: "/Garlic and Chilli.png",
  },
  {
    id: "coastal-spices",
    name: "Coastal Spices",
    description: "A unique blend of coastal herbs and spices that brings the flavor of the sea breeze to every bite.",
    price: 279,
    weight: "100g",
    category: "Roasted",
    image: "/Coastal Spices.png",
  },
  {
    id: "caramel",
    name: "Caramel",
    description: "Sweet, crunchy, and absolutely decadent. Glazed in rich, golden caramel for a perfect dessert snack.",
    price: 299,
    originalPrice: 349,
    weight: "100g",
    category: "Sweet",
    image: "/Caramel.png",
    isBestseller: true,
  }
];
