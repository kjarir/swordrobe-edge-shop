import { Link } from "react-router-dom";
import { Product } from "@/data/products";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard = ({ product, className }: ProductCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className={cn("product-card block group", className)}
    >
      <div className="relative overflow-hidden bg-secondary">
        {/* Product Image */}
        <div className="aspect-[3/4] bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
          <span className="text-muted-foreground/50 font-heading text-sm tracking-widest">
            SWORDROBE
          </span>
        </div>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-foreground text-background text-[10px] font-heading tracking-widest px-3 py-1">
              NEW
            </span>
          )}
          {product.originalPrice && (
            <span className="bg-destructive text-destructive-foreground text-[10px] font-heading tracking-widest px-3 py-1">
              SALE
            </span>
          )}
          {!product.inStock && (
            <span className="bg-muted text-muted-foreground text-[10px] font-heading tracking-widest px-3 py-1">
              SOLD OUT
            </span>
          )}
        </div>

        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="font-heading text-sm tracking-[0.2em] text-foreground">
            QUICK VIEW
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <p className="text-[10px] text-muted-foreground tracking-widest uppercase mb-1">
          {product.category}
        </p>
        <h3 className="font-heading text-sm tracking-wide uppercase text-foreground mb-2 line-clamp-1">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="font-heading text-base text-foreground">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
