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
    name: "Phantom Tactical Cargo",
    price: 3499,
    category: "cargos",
    images: ["/placeholder.svg"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Multi-pocket tactical cargo pants with reinforced stitching. Built for the urban battlefield with water-resistant ripstop fabric.",
    material: "100% Cotton Ripstop",
    inStock: true,
    isNew: true,
    isFeatured: true,
  },
  {
    id: "2",
    name: "Void Oversized Tee",
    price: 1299,
    category: "tees",
    images: ["/placeholder.svg"],
    sizes: ["S", "M", "L", "XL"],
    description: "Heavyweight drop-shoulder tee in pitch black. Premium 300GSM cotton for that structured drape.",
    material: "300 GSM Cotton",
    inStock: true,
    isFeatured: true,
  },
  {
    id: "3",
    name: "Shadow Bomber MK-II",
    price: 5999,
    originalPrice: 7499,
    category: "outerwear",
    images: ["/placeholder.svg"],
    sizes: ["M", "L", "XL"],
    description: "Military-inspired bomber with matte black hardware. Water-resistant shell with quilted lining for all-season wear.",
    material: "Nylon Shell, Polyester Lining",
    inStock: true,
    isNew: true,
    isFeatured: true,
  },
  {
    id: "4",
    name: "Wraith Distressed Denim",
    price: 2999,
    category: "denim",
    images: ["/placeholder.svg"],
    sizes: ["28", "30", "32", "34", "36"],
    description: "Raw-edge distressed black denim with relaxed tapered fit. Authentic worn-in aesthetic with reinforced knees.",
    material: "100% Cotton Denim",
    inStock: true,
    isFeatured: true,
  },
  {
    id: "5",
    name: "Stealth Utility Bag",
    price: 1799,
    category: "accessories",
    images: ["/placeholder.svg"],
    sizes: ["ONE SIZE"],
    description: "Multi-compartment crossbody utility bag. Military-grade hardware with quick-release buckles.",
    material: "Cordura Nylon",
    inStock: true,
    isNew: true,
  },
  {
    id: "6",
    name: "Nocturnal Hoodie",
    price: 2499,
    category: "outerwear",
    images: ["/placeholder.svg"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Ultra-heavyweight hoodie with hidden zip kangaroo pocket. Exclusive Swordrobe embroidery on back.",
    material: "450 GSM French Terry",
    inStock: true,
    isFeatured: true,
  },
  {
    id: "7",
    name: "Obsidian Essential Tee",
    price: 999,
    category: "tees",
    images: ["/placeholder.svg"],
    sizes: ["S", "M", "L", "XL"],
    description: "The foundation piece. Premium basics cut for movement with pre-shrunk construction.",
    material: "280 GSM Cotton",
    inStock: true,
  },
  {
    id: "8",
    name: "Apex Tech Joggers",
    price: 2199,
    category: "cargos",
    images: ["/placeholder.svg"],
    sizes: ["S", "M", "L", "XL"],
    description: "Modern joggers with articulated knees and hidden zip pockets. Tech fleece construction for stealth comfort.",
    material: "Cotton Blend Tech Fleece",
    inStock: true,
    isNew: true,
  },
  {
    id: "9",
    name: "Cipher Long Sleeve",
    price: 1599,
    category: "tees",
    images: ["/placeholder.svg"],
    sizes: ["S", "M", "L", "XL"],
    description: "Extended length long sleeve with thumbhole cuffs. Layering essential for the tactical wardrobe.",
    material: "280 GSM Cotton",
    inStock: true,
  },
  {
    id: "10",
    name: "Recon Windbreaker",
    price: 3999,
    category: "outerwear",
    images: ["/placeholder.svg"],
    sizes: ["M", "L", "XL"],
    description: "Lightweight packable windbreaker with reflective detailing. Stows into internal pocket.",
    material: "Ripstop Nylon",
    inStock: true,
    isNew: true,
  },
];

export const categories = [
  { id: 'all', name: 'All', count: products.length },
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
