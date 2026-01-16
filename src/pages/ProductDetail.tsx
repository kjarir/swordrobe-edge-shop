import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { fetchProductById, fetchProductsByCategory } from "@/lib/products";
import { Product } from "@/data/products";
import ProductCard from "@/components/products/ProductCard";
import { Minus, Plus, ArrowLeft, Truck, RotateCcw, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCurrency } from "@/contexts/CurrencyContext";
import { trackProductView, trackAddToCart, trackPageView } from "@/lib/analytics";

const ProductDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const { formatPrice } = useCurrency();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        trackPageView();
        trackProductView(id);
        
        const productData = await fetchProductById(id);
        setProduct(productData);
        
        // Load related products from same category
        if (productData) {
          const related = await fetchProductsByCategory(productData.category);
          setRelatedProducts(related.filter(p => p.id !== id).slice(0, 4));
        }
      } catch (error) {
        console.error('Failed to load product:', error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    
    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="section-padding text-center">
          <p className="body-lg text-muted-foreground">Loading product...</p>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="section-padding text-center">
          <h1 className="heading-lg mb-4">Product Not Found</h1>
          <Link to="/shop">
            <Button variant="outline">Back to Shop</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        description: "Choose your size before adding to cart",
        variant: "destructive",
      });
      return;
    }
    if (id) {
      trackAddToCart(id, { size: selectedSize, quantity });
    }
    toast({
      title: "Added to cart",
      description: `${product.name} (${selectedSize}) x ${quantity}`,
    });
  };

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="py-6 bg-secondary">
        <div className="container-wide">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Shop
          </Link>
        </div>
      </div>

      {/* Product Section */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-[3/4] bg-secondary flex items-center justify-center">
                <span className="text-muted-foreground/30 font-heading text-2xl tracking-widest">
                  LavenderLily
                </span>
              </div>
            </div>

            {/* Product Info */}
            <div className="lg:py-8">
              {/* Category & Badges */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs text-muted-foreground tracking-[0.2em] uppercase">
                  {product.category}
                </span>
                {product.isNew && (
                  <span className="bg-foreground text-background text-[10px] font-heading tracking-widest px-2 py-1">
                    NEW
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="heading-lg mb-6">{product.name}</h1>

              {/* Price */}
              <div className="flex items-center gap-4 mb-8">
                <span className="font-heading text-2xl">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="body-md text-muted-foreground mb-8">
                {product.description}
              </p>

              {/* Size Selector */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="heading-sm">Size</span>
                  <button className="text-sm text-muted-foreground underline hover:text-foreground">
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[60px] h-12 px-4 border font-heading text-sm tracking-wider transition-all ${
                        selectedSize === size
                          ? "bg-foreground text-background border-foreground"
                          : "border-border hover:border-foreground"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-8">
                <span className="heading-sm block mb-4">Quantity</span>
                <div className="inline-flex items-center border border-border">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-12 w-12 flex items-center justify-center hover:bg-secondary transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-16 text-center font-heading">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-12 w-12 flex items-center justify-center hover:bg-secondary transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <Button
                variant="hero"
                size="xl"
                className="w-full mb-8"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                {product.inStock ? "Add to Cart" : "Sold Out"}
              </Button>

              {/* Features */}
              <div className="space-y-4 pt-8 border-t border-border">
                <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-muted-foreground" />
                  <span className="body-md text-muted-foreground">
                    Free shipping on orders above AED 200
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <RotateCcw className="h-5 w-5 text-muted-foreground" />
                  <span className="body-md text-muted-foreground">
                    Easy 7-day returns & exchanges
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-muted-foreground" />
                  <span className="body-md text-muted-foreground">
                    100% authentic products
                  </span>
                </div>
              </div>

              {/* Material */}
              <div className="mt-8 pt-8 border-t border-border">
                <span className="heading-sm block mb-2">Material</span>
                <p className="body-md text-muted-foreground">{product.material}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="section-padding bg-secondary">
          <div className="container-wide">
            <h2 className="heading-md mb-12 text-center">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default ProductDetail;
