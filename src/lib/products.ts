import { supabase } from './supabase';
import { Product } from '@/data/products';

/**
 * Fetch all products from Supabase
 * Returns empty array if Supabase is not configured or no products exist
 */
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    if (data && data.length > 0) {
      // Transform Supabase data to match Product interface
      return data.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.original_price || undefined,
        category: product.category,
        images: product.images,
        sizes: product.sizes,
        description: product.description,
        material: product.material,
        inStock: product.in_stock,
        isNew: product.is_new || false,
        isFeatured: product.is_featured || false,
      }));
    }
    
    // Return empty array if no products found
    return [];
  } catch (error) {
    console.warn('Failed to fetch products from Supabase:', error);
    // Return empty array instead of mock data
    return [];
  }
};

/**
 * Fetch a single product by ID from Supabase
 * Returns null if product not found
 */
export const fetchProductById = async (id: string): Promise<Product | null> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    if (data) {
      return {
        id: data.id,
        name: data.name,
        price: data.price,
        originalPrice: data.original_price || undefined,
        category: data.category,
        images: data.images,
        sizes: data.sizes,
        description: data.description,
        material: data.material,
        inStock: data.in_stock,
        isNew: data.is_new || false,
        isFeatured: data.is_featured || false,
      };
    }
    
    return null;
  } catch (error) {
    console.warn('Failed to fetch product from Supabase:', error);
    // Return null instead of checking local data
    return null;
  }
};

/**
 * Fetch featured products from Supabase
 * Returns empty array if no featured products found
 */
export const fetchFeaturedProducts = async (): Promise<Product[]> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_featured', true)
      .order('created_at', { ascending: false });

    if (error) throw error;

    if (data && data.length > 0) {
      return data.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.original_price || undefined,
        category: product.category,
        images: product.images,
        sizes: product.sizes,
        description: product.description,
        material: product.material,
        inStock: product.in_stock,
        isNew: product.is_new || false,
        isFeatured: product.is_featured || false,
      }));
    }
    
    // Return empty array if no featured products found
    return [];
  } catch (error) {
    console.warn('Failed to fetch featured products from Supabase:', error);
    // Return empty array instead of mock data
    return [];
  }
};

/**
 * Fetch products by category from Supabase
 * Returns empty array if no products found in category
 */
export const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    const query = supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (category !== 'all') {
      query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) throw error;

    if (data && data.length > 0) {
      return data.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.original_price || undefined,
        category: product.category,
        images: product.images,
        sizes: product.sizes,
        description: product.description,
        material: product.material,
        inStock: product.in_stock,
        isNew: product.is_new || false,
        isFeatured: product.is_featured || false,
      }));
    }
    
    // Return empty array if no products found
    return [];
  } catch (error) {
    console.warn('Failed to fetch products by category from Supabase:', error);
    // Return empty array instead of mock data
    return [];
  }
};

