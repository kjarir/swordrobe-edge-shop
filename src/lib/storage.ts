import { supabase } from './supabase';

const BUCKET_NAME = 'product-images';

/**
 * Check if storage bucket exists and is accessible
 * Note: listBuckets() requires admin privileges, so we directly test bucket access instead
 */
export const checkStorageBucket = async (): Promise<boolean> => {
  try {
    // Directly try to list files in the bucket to verify access
    // This is more reliable than listBuckets() which requires admin privileges
    const { data, error } = await supabase.storage.from(BUCKET_NAME).list('', { limit: 1 });
    
    if (error) {
      // If we get a "not found" error, the bucket doesn't exist or isn't accessible
      if (error.message?.includes('not found') || error.message?.includes('Bucket not found') || error.statusCode === 404) {
        console.error(`Bucket "${BUCKET_NAME}" not found or not accessible:`, error.message);
        return false;
      }
      // Other errors might be permissions-related, but we'll let the upload try anyway
      console.warn('Bucket access check warning:', error.message);
      // Return true anyway - might be a permissions issue that upload will handle
      return true;
    }
    
    // If we can list files (even if empty), the bucket exists and is accessible
    return true;
  } catch (error: any) {
    console.error('Error checking storage bucket:', error);
    // On exception, return true anyway - let the actual upload determine if it works
    return true;
  }
};

/**
 * Upload a single image file to Supabase Storage
 */
export const uploadImage = async (file: File, productId?: string): Promise<{ url: string | null; error: any }> => {
  try {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      return { url: null, error: { message: 'File must be an image' } };
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return { url: null, error: { message: 'File size must be less than 5MB' } };
    }

    // Generate unique filename
    const fileExt = file.name.split('.').pop() || 'jpg';
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 15);
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_').substring(0, 50);
    const fileName = `${timestamp}-${randomStr}-${sanitizedName}.${fileExt}`;
    const filePath = productId ? `${productId}/${fileName}` : `temp/${timestamp}-${randomStr}/${fileName}`;

    // Upload file
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type,
      });

    if (error) {
      console.error('Storage upload error:', error);
      console.error('Upload details:', { filePath, fileName: file.name, fileSize: file.size, fileType: file.type });
      console.error('Bucket name:', BUCKET_NAME);
      
      // Handle specific errors
      if (error.message?.includes('not found') || error.message?.includes('Bucket not found') || error.statusCode === 404) {
        return { 
          url: null, 
          error: { 
            message: `Storage bucket "${BUCKET_NAME}" not found or not accessible. Please verify: 1) The bucket exists in Supabase Storage, 2) It is named exactly "product-images", 3) It is set to public, 4) Storage policies allow authenticated users to upload files.` 
          } 
        };
      }
      
      if (error.statusCode === 400) {
        // 400 could mean bucket not found or permission issue
        if (error.message?.includes('Bucket not found') || error.message?.includes('not found')) {
          return {
            url: null,
            error: {
              message: `Storage bucket "${BUCKET_NAME}" not found or not accessible. Please verify: 1) The bucket exists in Supabase Storage, 2) It is named exactly "product-images", 3) It is set to public, 4) Storage policies allow authenticated users to upload files.`,
              details: error
            }
          };
        }
        
        return {
          url: null,
          error: {
            message: error.message || 'Invalid file or request. Please check file format and size. If this persists, verify the bucket exists and has proper permissions.',
            details: error
          }
        };
      }
      
      if (error.statusCode === 413) {
        return {
          url: null,
          error: {
            message: 'File too large. Maximum size is 5MB.'
          }
        };
      }
      
      return {
        url: null,
        error: {
          message: error.message || 'Failed to upload image',
          details: error
        }
      };
    }

    if (!data) {
      return { url: null, error: { message: 'Upload failed - no data returned' } };
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(data.path);

    if (!urlData?.publicUrl) {
      return { url: null, error: { message: 'Failed to get image URL' } };
    }

    return { url: urlData.publicUrl, error: null };
  } catch (error: any) {
    console.error('Error uploading image:', error);
    return { 
      url: null, 
      error: { 
        message: error.message || 'Failed to upload image. Please try again.' 
      } 
    };
  }
};

/**
 * Upload multiple images
 */
export const uploadImages = async (files: File[], productId?: string): Promise<{ urls: string[]; errors: any[] }> => {
  // Upload files sequentially to avoid overwhelming the server
  // We skip the bucket check since listBuckets() requires admin privileges
  // and the upload itself will provide better error messages if there's an issue
  const urls: string[] = [];
  const errors: any[] = [];
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const result = await uploadImage(file, productId);
    
    if (result.url) {
      urls.push(result.url);
    } else {
      errors.push({ 
        file: file.name, 
        error: result.error || { message: 'Unknown upload error' } 
      });
    }
  }
  
  return { urls, errors };
};

/**
 * Delete an image from storage
 */
export const deleteImage = async (url: string): Promise<{ error: any }> => {
  try {
    // Extract file path from Supabase public URL
    // URL format: https://[project].supabase.co/storage/v1/object/public/[bucket-name]/[path]
    let filePath: string;
    
    if (url.includes(BUCKET_NAME)) {
      // Supabase storage URL - extract path after bucket name
      const urlParts = url.split('/');
      const bucketIndex = urlParts.indexOf(BUCKET_NAME);
      
      if (bucketIndex === -1) {
        // Try alternative URL format
        const match = url.match(new RegExp(`${BUCKET_NAME}/(.+)$`));
        if (match) {
          filePath = match[1].split('?')[0]; // Remove query params if any
        } else {
          throw new Error(`Could not extract file path from URL: ${url}`);
        }
      } else {
        filePath = urlParts.slice(bucketIndex + 1).join('/').split('?')[0]; // Remove query params
      }
    } else {
      // If it's not a Supabase URL, it might be stored as a relative path
      // Remove leading slash if present
      filePath = url.startsWith('/') ? url.slice(1) : url;
      filePath = filePath.split('?')[0]; // Remove query params
    }
    
    // Validate that we have a file path
    if (!filePath || filePath.trim() === '') {
      throw new Error(`Invalid file path extracted from URL: ${url}`);
    }
    
    console.log(`Deleting image from storage: ${filePath}`);
    
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([filePath]);

    if (error) throw error;
    return { error: null };
  } catch (error: any) {
    console.error('Error deleting image:', error);
    console.error('URL:', url);
    return { error };
  }
};

/**
 * Delete multiple images
 */
export const deleteImages = async (urls: string[]): Promise<void> => {
  const deletePromises = urls.map(url => deleteImage(url));
  await Promise.all(deletePromises);
};

