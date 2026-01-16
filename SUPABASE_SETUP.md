# Supabase Integration Guide

This project is integrated with Supabase for data storage and analytics. Follow these steps to set up your Supabase database.

## 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Create a new project
4. Note your project URL and anon key from Settings > API

## 2. Set Up Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Add your Supabase credentials:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

## 2.5. Set Up Storage Bucket

1. Go to your Supabase project dashboard
2. Navigate to **Storage** in the left sidebar
3. Click **New bucket**
4. Name it `product-images`
5. Make it **Public** (so images can be accessed via URL)
6. Click **Create bucket**

### Storage Policies

After creating the bucket, go to **Storage** > **Policies** and add these policies:

```sql
-- Allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'product-images');

-- Allow authenticated users to update images
CREATE POLICY "Authenticated users can update images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'product-images');

-- Allow authenticated users to delete images
CREATE POLICY "Authenticated users can delete images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'product-images');

-- Allow public read access to images
CREATE POLICY "Public can view images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'product-images');
```

## 3. Create Database Tables

Run these SQL commands in your Supabase SQL Editor:

### User Profiles Table
```sql
-- Create user profiles table
CREATE TABLE user_profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to view their own profile
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

-- Create policy to allow users to update their own profile
CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

-- Create policy to allow users to insert their own profile
CREATE POLICY "Users can insert own profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create policy to allow authenticated users to view all profiles (for admin)
CREATE POLICY "Authenticated users can view all profiles" ON user_profiles
  FOR SELECT USING (auth.role() = 'authenticated');

-- Function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile when user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### Products Table
```sql
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  original_price DECIMAL(10, 2),
  category TEXT NOT NULL CHECK (category IN ('dresses', 'tops', 'bottoms', 'outerwear', 'accessories')),
  images TEXT[] NOT NULL,
  sizes TEXT[] NOT NULL,
  description TEXT NOT NULL,
  material TEXT NOT NULL,
  in_stock BOOLEAN DEFAULT true,
  is_new BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Public products are viewable by everyone" ON products
  FOR SELECT USING (true);

-- Create policy to allow authenticated users to insert/update/delete
CREATE POLICY "Authenticated users can manage products" ON products
  FOR ALL USING (auth.role() = 'authenticated');
```

### Analytics Table
```sql
CREATE TABLE analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL CHECK (event_type IN ('page_view', 'product_view', 'add_to_cart', 'purchase', 'search')),
  page_path TEXT,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public insert (for tracking)
CREATE POLICY "Anyone can insert analytics events" ON analytics
  FOR INSERT WITH CHECK (true);

-- Create policy to allow authenticated users to read analytics
CREATE POLICY "Authenticated users can view analytics" ON analytics
  FOR SELECT USING (auth.role() = 'authenticated');
```

### Categories Table
```sql
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Public categories are viewable by everyone" ON categories
  FOR SELECT USING (true);

-- Create policy to allow authenticated users to manage categories
CREATE POLICY "Authenticated users can manage categories" ON categories
  FOR ALL USING (auth.role() = 'authenticated');
```

### Orders Table
```sql
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'AED',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  items JSONB[] NOT NULL,
  shipping_address JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to view their own orders
CREATE POLICY "Users can view their own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

-- Create policy to allow users to create orders
CREATE POLICY "Users can create orders" ON orders
  FOR INSERT WITH CHECK (true);

-- Create policy to allow authenticated users to view all orders (for admin)
CREATE POLICY "Authenticated users can view all orders" ON orders
  FOR SELECT USING (auth.role() = 'authenticated');
```

## 4. Seed Initial Data (Optional)

You can insert sample products using the Supabase dashboard or SQL editor:

```sql
INSERT INTO products (name, price, category, images, sizes, description, material, in_stock, is_new, is_featured)
VALUES
  ('Floral Dream Midi Dress', 299, 'dresses', ARRAY['/placeholder.svg'], ARRAY['XS', 'S', 'M', 'L', 'XL'], 'Elegant midi dress with delicate floral print.', '100% Premium Cotton', true, true, true),
  ('Lavender Lace Blouse', 149, 'tops', ARRAY['/placeholder.svg'], ARRAY['XS', 'S', 'M', 'L'], 'Romantic lace blouse in soft lavender.', 'Polyester & Lace', true, false, true),
  ('Cozy Knit Cardigan', 199, 'outerwear', ARRAY['/placeholder.svg'], ARRAY['S', 'M', 'L', 'XL'], 'Soft and warm cardigan perfect for cooler days.', 'Acrylic Blend', true, true, true);
```

## 5. Features

### Analytics Tracking
The app automatically tracks:
- Page views
- Product views
- Add to cart events
- Purchases
- Search queries

### Admin Panel
Access the admin panel at `/admin` (requires authentication) to:
- View comprehensive analytics (products, orders, revenue, views)
- View sales trends and charts
- **Manage Products**: Add, edit, and delete products
- **Manage Categories**: Add, edit, and delete categories
- View category distribution
- View top products
- View recent orders
- View event analytics

### Authentication
- Login/Signup page at `/login`
- Protected admin routes require authentication
- User menu in header shows login/logout options

### Data Fallback
If Supabase is not configured, the app will fall back to local data from `src/data/products.ts`, ensuring the app works even without a database connection.

## 6. Next Steps

1. Set up authentication if you want user-specific features
2. Configure storage buckets for product images
3. Set up email triggers for order confirmations
4. Add more analytics events as needed

For more information, visit the [Supabase Documentation](https://supabase.com/docs).

