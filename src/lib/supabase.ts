import { createClient } from '@supabase/supabase-js';

// These should be set as environment variables in production
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

// Check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return supabaseUrl !== 'https://your-project.supabase.co' && 
         supabaseAnonKey !== 'your-anon-key' &&
         supabaseUrl.startsWith('https://') &&
         supabaseAnonKey.length > 0;
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string;
          email: string | null;
          full_name: string | null;
          avatar_url: string | null;
          role: 'user' | 'admin';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: 'user' | 'admin';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: 'user' | 'admin';
          created_at?: string;
          updated_at?: string;
        };
      };
      products: {
        Row: {
          id: string;
          name: string;
          price: number;
          original_price: number | null;
          category: 'dresses' | 'tops' | 'bottoms' | 'outerwear' | 'accessories';
          images: string[];
          sizes: string[];
          description: string;
          material: string;
          in_stock: boolean;
          is_new: boolean | null;
          is_featured: boolean | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          price: number;
          original_price?: number | null;
          category: 'dresses' | 'tops' | 'bottoms' | 'outerwear' | 'accessories';
          images: string[];
          sizes: string[];
          description: string;
          material: string;
          in_stock: boolean;
          is_new?: boolean | null;
          is_featured?: boolean | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          price?: number;
          original_price?: number | null;
          category?: 'dresses' | 'tops' | 'bottoms' | 'outerwear' | 'accessories';
          images?: string[];
          sizes?: string[];
          description?: string;
          material?: string;
          in_stock?: boolean;
          is_new?: boolean | null;
          is_featured?: boolean | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      analytics: {
        Row: {
          id: string;
          event_type: 'page_view' | 'product_view' | 'add_to_cart' | 'purchase' | 'search';
          page_path: string | null;
          product_id: string | null;
          user_id: string | null;
          metadata: Record<string, any> | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          event_type: 'page_view' | 'product_view' | 'add_to_cart' | 'purchase' | 'search';
          page_path?: string | null;
          product_id?: string | null;
          user_id?: string | null;
          metadata?: Record<string, any> | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          event_type?: 'page_view' | 'product_view' | 'add_to_cart' | 'purchase' | 'search';
          page_path?: string | null;
          product_id?: string | null;
          user_id?: string | null;
          metadata?: Record<string, any> | null;
          created_at?: string;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          created_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          user_id: string | null;
          total_amount: number;
          currency: string;
          status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
          items: Record<string, any>[];
          shipping_address: Record<string, any> | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          total_amount: number;
          currency: string;
          status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
          items: Record<string, any>[];
          shipping_address?: Record<string, any> | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          total_amount?: number;
          currency?: string;
          status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
          items?: Record<string, any>[];
          shipping_address?: Record<string, any> | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}

