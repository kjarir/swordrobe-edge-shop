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
      <div className="relative overflow-hidden bg-secondary rounded-xl">
        {/* Product Image */}
        <div className="aspect-[3/4] bg-gradient-to-br from-accent/30 to-secondary flex items-center justify-center">
          <span className="text-primary/30 font-heading text-sm tracking-widest">
            LavenderLily
          </span>
        </div>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-primary text-primary-foreground text-[10px] font-heading tracking-widest px-3 py-1 rounded-full">
              NEW
            </span>
          )}
          {product.originalPrice && (
            <span className="bg-destructive text-destructive-foreground text-[10px] font-heading tracking-widest px-3 py-1 rounded-full">
              SALE
            </span>
          )}
          {!product.inStock && (
            <span className="bg-muted text-muted-foreground text-[10px] font-heading tracking-widest px-3 py-1 rounded-full">
              SOLD OUT
            </span>
          )}
        </div>

        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-primary/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-xl">
          <span className="font-heading text-sm tracking-wide text-foreground bg-background/90 px-6 py-3 rounded-lg">
            Quick View
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <p className="text-[10px] text-primary tracking-widest uppercase mb-1">
          {product.category}
        </p>
        <h3 className="font-heading text-sm text-foreground mb-2 line-clamp-1">
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
