export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: 'tees' | 'outerwear' | 'denim' | 'cargos' | 'accessories';
  images: string[];
  sizes: string[];
  description: string;
  material: string;
  inStock: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Tactical Cargo Pants",
    price: 3499,
    category: "cargos",
    images: ["/placeholder.svg"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Premium tactical cargo pants with multiple utility pockets. Designed for urban warriors who demand both style and functionality.",
    material: "100% Cotton Ripstop",
    inStock: true,
    isNew: true,
    isFeatured: true,
  },
  {
    id: "2",
    name: "Shadow Oversized Tee",
    price: 1299,
    category: "tees",
    images: ["/placeholder.svg"],
    sizes: ["S", "M", "L", "XL"],
    description: "Heavyweight oversized tee with drop shoulders. Made from premium cotton for ultimate comfort.",
    material: "300 GSM Cotton",
    inStock: true,
    isFeatured: true,
  },
  {
    id: "3",
    name: "Urban Bomber Jacket",
    price: 5999,
    originalPrice: 7499,
    category: "outerwear",
    images: ["/placeholder.svg"],
    sizes: ["M", "L", "XL"],
    description: "Classic bomber silhouette with modern utility details. Water-resistant finish.",
    material: "Nylon Shell, Polyester Lining",
    inStock: true,
    isNew: true,
    isFeatured: true,
  },
  {
    id: "4",
    name: "Distressed Black Denim",
    price: 2999,
    category: "denim",
    images: ["/placeholder.svg"],
    sizes: ["28", "30", "32", "34", "36"],
    description: "Raw edge distressed denim with a relaxed fit. Authentic worn-in aesthetic.",
    material: "100% Cotton Denim",
    inStock: true,
    isFeatured: true,
  },
  {
    id: "5",
    name: "Utility Belt Bag",
    price: 1799,
    category: "accessories",
    images: ["/placeholder.svg"],
    sizes: ["ONE SIZE"],
    description: "Multi-compartment belt bag for the modern urban explorer.",
    material: "Cordura Nylon",
    inStock: true,
  },
  {
    id: "6",
    name: "Graphic Print Hoodie",
    price: 2499,
    category: "outerwear",
    images: ["/placeholder.svg"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Heavyweight hoodie featuring exclusive LavenderLily graphics. Kangaroo pocket with hidden zip.",
    material: "450 GSM French Terry",
    inStock: true,
    isNew: true,
  },
  {
    id: "7",
    name: "Essential Black Tee",
    price: 999,
    category: "tees",
    images: ["/placeholder.svg"],
    sizes: ["S", "M", "L", "XL"],
    description: "The foundation of any wardrobe. Premium basics for everyday wear.",
    material: "280 GSM Cotton",
    inStock: true,
  },
  {
    id: "8",
    name: "Tech Fleece Joggers",
    price: 2199,
    category: "cargos",
    images: ["/placeholder.svg"],
    sizes: ["S", "M", "L", "XL"],
    description: "Modern joggers with tech fleece construction. Tapered fit with zip pockets.",
    material: "Cotton Blend Tech Fleece",
    inStock: false,
  },
];

export const categories = [
  { id: 'all', name: 'All Products', count: products.length },
  { id: 'tees', name: 'Tees', count: products.filter(p => p.category === 'tees').length },
  { id: 'outerwear', name: 'Outerwear', count: products.filter(p => p.category === 'outerwear').length },
  { id: 'denim', name: 'Denim', count: products.filter(p => p.category === 'denim').length },
  { id: 'cargos', name: 'Cargos', count: products.filter(p => p.category === 'cargos').length },
  { id: 'accessories', name: 'Accessories', count: products.filter(p => p.category === 'accessories').length },
];

export const getFeaturedProducts = () => products.filter(p => p.isFeatured);
export const getNewArrivals = () => products.filter(p => p.isNew);
export const getProductById = (id: string) => products.find(p => p.id === id);
export const getProductsByCategory = (category: string) => 
  category === 'all' ? products : products.filter(p => p.category === category);
