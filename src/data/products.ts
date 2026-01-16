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

// Empty products array - owner will add products through admin panel
export const products: Product[] = [];

// Empty categories array - will be populated from database
export const categories = [
  { id: 'all', name: 'All', count: 0 },
  { id: 'dresses', name: 'Dresses', count: 0 },
  { id: 'tops', name: 'Tops', count: 0 },
  { id: 'bottoms', name: 'Bottoms', count: 0 },
  { id: 'outerwear', name: 'Outerwear', count: 0 },
  { id: 'accessories', name: 'Accessories', count: 0 },
];

export const getFeaturedProducts = () => products.filter(p => p.isFeatured);
export const getNewArrivals = () => products.filter(p => p.isNew);
export const getProductById = (id: string) => products.find(p => p.id === id);
export const getProductsByCategory = (category: string) => 
  category === 'all' ? products : products.filter(p => p.category === category);
