import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { uploadImages, deleteImages } from '@/lib/storage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Upload, X, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Product {
  id: string;
  name: string;
  price: number;
  original_price: number | null;
  category: string;
  images: string[];
  sizes: string[];
  description: string;
  material: string;
  in_stock: boolean;
  is_new: boolean | null;
  is_featured: boolean | null;
  created_at: string;
}

const ProductManagement = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteProductId, setDeleteProductId] = useState<string | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    original_price: '',
    category: 'dresses',
    images: [] as string[],
    imageFiles: [] as File[],
    sizes: '',
    description: '',
    material: '',
    in_stock: true,
    is_new: false,
    is_featured: false,
  });
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to fetch products',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate that we have at least one image (existing or new)
    if (formData.images.length === 0 && formData.imageFiles.length === 0) {
      toast({
        title: 'Error',
        description: 'Please upload at least one image',
        variant: 'destructive',
      });
      return;
    }

    setUploading(true);

    try {
      let imageUrls = [...formData.images];

      // Upload new images if any
      if (formData.imageFiles.length > 0) {
        const productId = editingProduct?.id || undefined;
        const { urls, errors } = await uploadImages(formData.imageFiles, productId);
        
        // Show warnings for failed uploads
        if (errors.length > 0) {
          const errorMessages = errors.map(e => 
            `${e.file}: ${e.error?.message || 'Upload failed'}`
          ).join('; ');
          
          toast({
            title: 'Upload Warning',
            description: `Some images failed: ${errorMessages}`,
            variant: 'destructive',
          });
        }
        
        // If all uploads failed and we have no existing images, show error
        if (urls.length === 0 && imageUrls.length === 0) {
          const errorMsg = errors[0]?.error?.message || 'Failed to upload images';
          toast({
            title: 'Error',
            description: errorMsg.includes('bucket') 
              ? errorMsg 
              : 'Failed to upload images. Please check your storage configuration and try again.',
            variant: 'destructive',
          });
          setUploading(false);
          return;
        }
        
        // Add successfully uploaded images
        if (urls.length > 0) {
          imageUrls = [...imageUrls, ...urls];
        }
      }

      // Final validation - ensure we have at least one image URL
      if (imageUrls.length === 0) {
        toast({
          title: 'Error',
          description: 'No images available. Please upload at least one image.',
          variant: 'destructive',
        });
        setUploading(false);
        return;
      }

      // Validate required fields
      if (!formData.name.trim()) {
        toast({
          title: 'Error',
          description: 'Product name is required',
          variant: 'destructive',
        });
        setUploading(false);
        return;
      }

      if (!formData.price || isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
        toast({
          title: 'Error',
          description: 'Valid price is required',
          variant: 'destructive',
        });
        setUploading(false);
        return;
      }

      if (!formData.sizes.trim()) {
        toast({
          title: 'Error',
          description: 'At least one size is required',
          variant: 'destructive',
        });
        setUploading(false);
        return;
      }

      if (!formData.description.trim()) {
        toast({
          title: 'Error',
          description: 'Description is required',
          variant: 'destructive',
        });
        setUploading(false);
        return;
      }

      if (!formData.material.trim()) {
        toast({
          title: 'Error',
          description: 'Material is required',
          variant: 'destructive',
        });
        setUploading(false);
        return;
      }

      // Ensure arrays are not empty
      const sizesArray = formData.sizes.split(',').map(size => size.trim()).filter(Boolean);
      if (sizesArray.length === 0) {
        toast({
          title: 'Error',
          description: 'At least one size is required',
          variant: 'destructive',
        });
        setUploading(false);
        return;
      }

      if (imageUrls.length === 0) {
        toast({
          title: 'Error',
          description: 'At least one image is required',
          variant: 'destructive',
        });
        setUploading(false);
        return;
      }

      const productData = {
        name: formData.name.trim(),
        price: parseFloat(formData.price),
        original_price: formData.original_price && formData.original_price.trim() 
          ? parseFloat(formData.original_price) 
          : null,
        category: formData.category,
        images: imageUrls,
        sizes: sizesArray,
        description: formData.description.trim(),
        material: formData.material.trim(),
        in_stock: formData.in_stock,
        is_new: formData.is_new || false,
        is_featured: formData.is_featured || false,
        updated_at: new Date().toISOString(),
      };

      // Log data for debugging (remove in production)
      console.log('Submitting product data:', {
        ...productData,
        images: imageUrls.length,
        sizes: sizesArray.length,
      });

      let productId: string;

      if (editingProduct) {
        const { data, error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', editingProduct.id)
          .select()
          .single();

        if (error) {
          console.error('Update error:', error);
          throw new Error(error.message || `Failed to update product: ${JSON.stringify(error)}`);
        }
        productId = editingProduct.id;

        // Delete old images that were removed
        const removedImages = editingProduct.images.filter(img => !imageUrls.includes(img));
        if (removedImages.length > 0) {
          await deleteImages(removedImages);
        }

        toast({
          title: 'Success',
          description: 'Product updated successfully',
        });
      } else {
        const { data, error } = await supabase
          .from('products')
          .insert([productData])
          .select()
          .single();

        if (error) {
          console.error('Insert error:', error);
          console.error('Product data:', productData);
          
          // Provide more specific error messages
          let errorMessage = error.message || 'Failed to create product';
          
          if (error.code === '23502') {
            errorMessage = 'Missing required field. Please check all fields are filled.';
          } else if (error.code === '23505') {
            errorMessage = 'A product with this name already exists.';
          } else if (error.message?.includes('check constraint')) {
            errorMessage = 'Invalid data format. Please check category and other fields.';
          } else if (error.message?.includes('array')) {
            errorMessage = 'Invalid images or sizes format. Please ensure they are properly formatted.';
          }
          
          throw new Error(errorMessage);
        }
        
        if (!data) {
          throw new Error('Product created but no data returned');
        }
        
        productId = data.id;

        // Move temp images to product folder (optional - can be done later)
        toast({
          title: 'Success',
          description: 'Product created successfully',
        });
      }

      setIsDialogOpen(false);
      resetForm();
      fetchProducts();
    } catch (error: any) {
      console.error('Product save error:', error);
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
      });
      
      let errorMessage = error.message || 'Failed to save product';
      
      // Handle specific Supabase errors
      if (error.code) {
        switch (error.code) {
          case '23502':
            errorMessage = 'Missing required field. Please fill in all required fields.';
            break;
          case '23505':
            errorMessage = 'A product with this name already exists.';
            break;
          case 'PGRST116':
            errorMessage = 'No rows returned. Please check your data and try again.';
            break;
          case '42501':
            errorMessage = 'Permission denied. Please check your Supabase RLS policies.';
            break;
          default:
            if (error.message) {
              errorMessage = error.message;
            }
        }
      }
      
      // Check for common validation errors
      if (error.message?.includes('check constraint')) {
        errorMessage = 'Invalid category or data format. Please check all fields.';
      } else if (error.message?.includes('null value')) {
        errorMessage = 'Required field is missing. Please fill in all required fields.';
      } else if (error.message?.includes('array')) {
        errorMessage = 'Invalid images or sizes format. Please ensure proper formatting.';
      }
      
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
        duration: 5000,
      });
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      original_price: product.original_price?.toString() || '',
      category: product.category,
      images: product.images,
      imageFiles: [],
      sizes: product.sizes.join(', '),
      description: product.description,
      material: product.material,
      in_stock: product.in_stock,
      is_new: product.is_new || false,
      is_featured: product.is_featured || false,
    });
    setIsDialogOpen(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const maxFiles = 10; // Limit to 10 images per product
    const maxSize = 5 * 1024 * 1024; // 5MB per file
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

    const validFiles: File[] = [];
    const errors: string[] = [];

    files.slice(0, maxFiles).forEach(file => {
      // Check file type
      if (!allowedTypes.includes(file.type.toLowerCase())) {
        errors.push(`${file.name}: Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.`);
        return;
      }

      // Check file size
      if (file.size > maxSize) {
        errors.push(`${file.name}: File too large. Maximum size is 5MB.`);
        return;
      }

      // Check if we've reached the limit
      if (formData.imageFiles.length + validFiles.length >= maxFiles) {
        errors.push(`Maximum ${maxFiles} images allowed. Some files were not added.`);
        return;
      }

      validFiles.push(file);
    });

    // Show errors if any
    if (errors.length > 0) {
      toast({
        title: 'Upload Issues',
        description: errors.join(' '),
        variant: 'destructive',
      });
    }

    // Add valid files
    if (validFiles.length > 0) {
      setFormData(prev => ({
        ...prev,
        imageFiles: [...prev.imageFiles, ...validFiles],
      }));

      toast({
        title: 'Images Added',
        description: `${validFiles.length} image(s) added successfully`,
      });
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeImage = (index: number, isFile: boolean) => {
    if (isFile) {
      setFormData(prev => ({
        ...prev,
        imageFiles: prev.imageFiles.filter((_, i) => i !== index),
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index),
      }));
    }
  };

  const handleDelete = async () => {
    if (!deleteProductId) return;

    try {
      // First, fetch the product to get its images
      const productToDelete = products.find(p => p.id === deleteProductId);
      
      if (productToDelete && productToDelete.images && productToDelete.images.length > 0) {
        // Delete all images from storage
        try {
          await deleteImages(productToDelete.images);
        } catch (imageError: any) {
          // Log error but continue with product deletion
          // Some images might already be deleted or URLs might be invalid
          console.warn('Some images could not be deleted from storage:', imageError);
        }
      }

      // Delete the product from the database
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', deleteProductId);

      if (error) throw error;
      
      toast({
        title: 'Success',
        description: 'Product and its images deleted successfully',
      });
      setDeleteProductId(null);
      fetchProducts();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete product',
        variant: 'destructive',
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      original_price: '',
      category: 'dresses',
      images: [],
      imageFiles: [],
      sizes: '',
      description: '',
      material: '',
      in_stock: true,
      is_new: false,
      is_featured: false,
    });
    setEditingProduct(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading products...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="heading-md">Product Management</h2>
          <p className="body-md text-muted-foreground mt-2">
            Add, edit, or delete products from your store
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button variant="hero" onClick={() => resetForm()}>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="heading-md">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </DialogTitle>
              <DialogDescription>
                {editingProduct ? 'Update product information' : 'Fill in the details to add a new product'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="heading-sm">Product Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="rounded-none"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category" className="heading-sm">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger className="rounded-none">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dresses">Dresses</SelectItem>
                      <SelectItem value="tops">Tops</SelectItem>
                      <SelectItem value="bottoms">Bottoms</SelectItem>
                      <SelectItem value="outerwear">Outerwear</SelectItem>
                      <SelectItem value="accessories">Accessories</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price" className="heading-sm">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                    className="rounded-none"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="original_price" className="heading-sm">Original Price (Optional)</Label>
                  <Input
                    id="original_price"
                    type="number"
                    step="0.01"
                    value={formData.original_price}
                    onChange={(e) => setFormData({ ...formData, original_price: e.target.value })}
                    className="rounded-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="images" className="heading-sm">Product Images</Label>
                <div className="space-y-4">
                  {/* File Upload Input */}
                  <div className="border-2 border-dashed border-border rounded-none p-6 text-center hover:border-primary transition-colors bg-secondary/30">
                    <input
                      ref={fileInputRef}
                      type="file"
                      id="images"
                      multiple
                      accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={uploading}
                    />
                    <label 
                      htmlFor="images" 
                      className={cn(
                        "cursor-pointer block",
                        uploading && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm font-heading tracking-wider uppercase text-muted-foreground mb-1">
                        {uploading ? 'Uploading...' : 'Click to upload images'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        JPEG, PNG, GIF, WebP up to 5MB each (max 10 images)
                      </p>
                      {(formData.images.length > 0 || formData.imageFiles.length > 0) && (
                        <p className="text-xs text-primary mt-2 font-heading">
                          {formData.images.length + formData.imageFiles.length} image(s) ready
                        </p>
                      )}
                    </label>
                  </div>

                  {/* Alternative: URL Input (fallback) */}
                  <div className="border-t border-border pt-4">
                    <Label htmlFor="image-urls" className="text-xs font-heading tracking-wider uppercase text-muted-foreground mb-2 block">
                      Or Add Image URLs (comma-separated)
                    </Label>
                    <Input
                      id="image-urls"
                      type="text"
                      placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                      onChange={(e) => {
                        const urls = e.target.value.split(',').map(url => url.trim()).filter(Boolean);
                        setFormData(prev => ({
                          ...prev,
                          images: [...prev.images.filter(img => !img.startsWith('http')), ...urls],
                        }));
                      }}
                      className="rounded-none text-sm"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Use this if file upload isn't working. Paste image URLs separated by commas.
                    </p>
                  </div>

                  {/* Existing Images Preview */}
                  {formData.images.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs font-heading tracking-wider uppercase text-muted-foreground">
                        Existing Images
                      </p>
                      <div className="grid grid-cols-4 gap-2">
                        {formData.images.map((url, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={url}
                              alt={`Product ${index + 1}`}
                              className="w-full h-24 object-cover border border-border"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index, false)}
                              className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* New Images Preview */}
                  {formData.imageFiles.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs font-heading tracking-wider uppercase text-muted-foreground">
                        New Images ({formData.imageFiles.length})
                      </p>
                      <div className="grid grid-cols-4 gap-2">
                        {formData.imageFiles.map((file, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`New ${index + 1}`}
                              className="w-full h-24 object-cover border border-border"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index, true)}
                              className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="h-3 w-3" />
                            </button>
                            <p className="text-[10px] text-muted-foreground truncate mt-1">
                              {file.name}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Empty State */}
                  {formData.images.length === 0 && formData.imageFiles.length === 0 && (
                    <div className="text-center py-8 border border-dashed border-border">
                      <ImageIcon className="h-12 w-12 mx-auto mb-2 text-muted-foreground/30" />
                      <p className="text-sm text-muted-foreground">No images uploaded yet</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sizes" className="heading-sm">Sizes (comma-separated)</Label>
                <Input
                  id="sizes"
                  value={formData.sizes}
                  onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
                  placeholder="XS, S, M, L, XL"
                  required
                  className="rounded-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="heading-sm">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows={4}
                  className="rounded-none resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="material" className="heading-sm">Material</Label>
                <Input
                  id="material"
                  value={formData.material}
                  onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                  required
                  className="rounded-none"
                />
              </div>

              <div className="flex gap-6">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="in_stock"
                    checked={formData.in_stock}
                    onCheckedChange={(checked) => setFormData({ ...formData, in_stock: checked as boolean })}
                  />
                  <Label htmlFor="in_stock" className="cursor-pointer">In Stock</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="is_new"
                    checked={formData.is_new}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_new: checked as boolean })}
                  />
                  <Label htmlFor="is_new" className="cursor-pointer">New Arrival</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="is_featured"
                    checked={formData.is_featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked as boolean })}
                  />
                  <Label htmlFor="is_featured" className="cursor-pointer">Featured</Label>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="hero" disabled={uploading}>
                  {uploading ? 'Uploading...' : editingProduct ? 'Update' : 'Create'} Product
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="product-card">
        <CardHeader>
          <CardTitle className="heading-sm">All Products</CardTitle>
          <CardDescription>{products.length} products in total</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-heading text-xs tracking-wider uppercase">Name</TableHead>
                <TableHead className="font-heading text-xs tracking-wider uppercase">Category</TableHead>
                <TableHead className="font-heading text-xs tracking-wider uppercase">Price</TableHead>
                <TableHead className="font-heading text-xs tracking-wider uppercase">Stock</TableHead>
                <TableHead className="font-heading text-xs tracking-wider uppercase">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    No products found. Add your first product!
                  </TableCell>
                </TableRow>
              ) : (
                products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-body">{product.name}</TableCell>
                    <TableCell className="font-heading text-xs uppercase">{product.category}</TableCell>
                    <TableCell className="font-heading">${product.price}</TableCell>
                    <TableCell>
                      <span className={cn(
                        "px-2 py-1 text-xs font-heading tracking-wider uppercase",
                        product.in_stock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      )}>
                        {product.in_stock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(product)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDeleteProductId(product.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AlertDialog open={!!deleteProductId} onOpenChange={() => setDeleteProductId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="heading-md">Delete Product</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this product? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ProductManagement;

