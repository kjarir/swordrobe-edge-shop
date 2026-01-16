# Storage Setup Guide - Fix 400 Errors

If you're getting a 400 error when uploading images, follow these steps:

## Step 1: Create Storage Bucket

1. Go to your Supabase Dashboard
2. Navigate to **Storage** in the left sidebar
3. Click **"New bucket"** button
4. Set the name to: `product-images` (exactly this name, case-sensitive)
5. **Make it PUBLIC** (toggle "Public bucket" to ON)
6. Click **"Create bucket"**

## Step 2: Set Up Storage Policies

After creating the bucket, you need to add policies:

1. Go to **Storage** > **Policies** (or click on the bucket name)
2. Click **"New Policy"**
3. Select **"For full customization"**
4. Add these policies one by one:

### Policy 1: Allow Authenticated Upload
```sql
CREATE POLICY "Authenticated users can upload images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'product-images');
```

### Policy 2: Allow Authenticated Update
```sql
CREATE POLICY "Authenticated users can update images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'product-images');
```

### Policy 3: Allow Authenticated Delete
```sql
CREATE POLICY "Authenticated users can delete images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'product-images');
```

### Policy 4: Allow Public Read
```sql
CREATE POLICY "Public can view images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'product-images');
```

## Step 3: Verify Setup

1. Check that the bucket exists: **Storage** > **Buckets** > `product-images`
2. Check that it's marked as **Public**
3. Check that policies are active: **Storage** > **Policies**

## Common 400 Error Causes

### Error: "Bucket not found"
- **Solution**: Create the `product-images` bucket (Step 1)

### Error: "new row violates row-level security policy"
- **Solution**: Add the storage policies (Step 2)

### Error: "Invalid file format"
- **Solution**: Only upload JPEG, PNG, GIF, or WebP images under 5MB

### Error: "Permission denied"
- **Solution**: 
  1. Make sure you're logged in
  2. Check that storage policies are set correctly
  3. Verify the bucket is public

## Quick Test

After setup, try uploading an image. If you still get a 400 error:

1. Open browser console (F12)
2. Check the Network tab for the failed request
3. Look at the error response details
4. Check Supabase logs: **Logs** > **API Logs**

## Alternative: Use Image URLs

If storage continues to have issues, you can temporarily use image URLs:
- Use external image hosting (Imgur, Cloudinary, etc.)
- Or use placeholder images from services like Unsplash

The form will accept both uploaded files and image URLs.

