export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: 'dresses' | 'tops' | 'bottoms' | 'outerwear' | 'accessories';
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
    name: "Floral Dream Midi Dress",
    price: 299,
    category: "dresses",
    images: ["/placeholder.svg"],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Elegant midi dress with delicate floral print. Perfect for any occasion, from brunch dates to evening events. Flowing silhouette with a flattering A-line cut.",
    material: "100% Premium Cotton",
    inStock: true,
    isNew: true,
    isFeatured: true,
  },
  {
    id: "2",
    name: "Lavender Lace Blouse",
    price: 149,
    category: "tops",
    images: ["/placeholder.svg"],
    sizes: ["XS", "S", "M", "L"],
    description: "Romantic lace blouse in soft lavender. Feminine and sophisticated, perfect for layering or wearing alone. Delicate details that make every outfit special.",
    material: "Polyester & Lace",
    inStock: true,
    isFeatured: true,
  },
  {
    id: "3",
    name: "Cozy Knit Cardigan",
    price: 199,
    originalPrice: 249,
    category: "outerwear",
    images: ["/placeholder.svg"],
    sizes: ["S", "M", "L", "XL"],
    description: "Soft and warm cardigan perfect for those cooler days. Versatile piece that adds elegance to any outfit. Available in beautiful pastel shades.",
    material: "Acrylic Blend",
    inStock: true,
    isNew: true,
    isFeatured: true,
  },
  {
    id: "4",
    name: "High-Waisted Wide Leg Pants",
    price: 179,
    category: "bottoms",
    images: ["/placeholder.svg"],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Comfortable and stylish wide-leg pants with a flattering high waist. Perfect for both casual and semi-formal occasions. Flowing fabric that moves with you.",
    material: "Viscose Blend",
    inStock: true,
    isFeatured: true,
  },
  {
    id: "5",
    name: "Elegant Pearl Handbag",
    price: 129,
    category: "accessories",
    images: ["/placeholder.svg"],
    sizes: ["ONE SIZE"],
    description: "Chic handbag with pearl accents. Spacious enough for all your essentials while maintaining a sophisticated look. Perfect finishing touch to any outfit.",
    material: "Faux Leather with Pearl Details",
    inStock: true,
    isNew: true,
  },
  {
    id: "6",
    name: "Ribbed Knit Sweater",
    price: 169,
    category: "outerwear",
    images: ["/placeholder.svg"],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Comfortable ribbed sweater in soft pastel colors. Perfect for layering or wearing on its own. Cozy and stylish for everyday wear.",
    material: "Cotton Blend",
    inStock: true,
    isFeatured: true,
  },
  {
    id: "7",
    name: "Classic White Tee",
    price: 49,
    category: "tops",
    images: ["/placeholder.svg"],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "The perfect wardrobe essential. Soft, comfortable white tee that pairs with everything. Premium quality fabric that maintains its shape.",
    material: "100% Organic Cotton",
    inStock: true,
  },
  {
    id: "8",
    name: "Floral Print Skirt",
    price: 139,
    category: "bottoms",
    images: ["/placeholder.svg"],
    sizes: ["XS", "S", "M", "L"],
    description: "Beautiful A-line skirt with vibrant floral print. Flattering fit that twirls beautifully. Perfect for spring and summer days.",
    material: "Polyester",
    inStock: true,
    isNew: true,
  },
  {
    id: "9",
    name: "Long Sleeve Blouse",
    price: 119,
    category: "tops",
    images: ["/placeholder.svg"],
    sizes: ["XS", "S", "M", "L"],
    description: "Elegant long-sleeve blouse with delicate details. Versatile piece that works for office or casual wear. Timeless design.",
    material: "Silk Blend",
    inStock: true,
  },
  {
    id: "10",
    name: "Lightweight Denim Jacket",
    price: 219,
    category: "outerwear",
    images: ["/placeholder.svg"],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Classic denim jacket with a modern fit. Perfect layering piece for any season. Comfortable and stylish.",
    material: "100% Cotton Denim",
    inStock: true,
    isNew: true,
  },
];

export const categories = [
  { id: 'all', name: 'All', count: products.length },
  { id: 'dresses', name: 'Dresses', count: products.filter(p => p.category === 'dresses').length },
  { id: 'tops', name: 'Tops', count: products.filter(p => p.category === 'tops').length },
  { id: 'bottoms', name: 'Bottoms', count: products.filter(p => p.category === 'bottoms').length },
  { id: 'outerwear', name: 'Outerwear', count: products.filter(p => p.category === 'outerwear').length },
  { id: 'accessories', name: 'Accessories', count: products.filter(p => p.category === 'accessories').length },
];

export const getFeaturedProducts = () => products.filter(p => p.isFeatured);
export const getNewArrivals = () => products.filter(p => p.isNew);
export const getProductById = (id: string) => products.find(p => p.id === id);
export const getProductsByCategory = (category: string) => 
  category === 'all' ? products : products.filter(p => p.category === category);
