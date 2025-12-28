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
        <div className="aspect-[3/4] bg-gradient-to-br from-secondary via-muted/50 to-secondary flex items-center justify-center relative overflow-hidden">
          <span className="text-muted-foreground/20 font-heading text-sm tracking-[0.3em] transition-all duration-300 group-hover:scale-110 group-hover:opacity-30">
            SWORDROBE
          </span>
          
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300" />
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="bg-foreground text-background text-[9px] font-heading tracking-[0.15em] px-2 py-1 transition-transform duration-200 group-hover:translate-x-0.5">
              NEW
            </span>
          )}
          {product.originalPrice && (
            <span className="bg-destructive text-destructive-foreground text-[9px] font-heading tracking-[0.15em] px-2 py-1">
              SALE
            </span>
          )}
          {!product.inStock && (
            <span className="bg-muted text-muted-foreground text-[9px] font-heading tracking-[0.15em] px-2 py-1">
              SOLD OUT
            </span>
          )}
        </div>

        {/* Quick View */}
        <div className="absolute bottom-0 left-0 right-0 bg-foreground text-background py-3 text-center translate-y-full group-hover:translate-y-0 transition-transform duration-200">
          <span className="font-heading text-xs tracking-[0.2em]">QUICK VIEW</span>
        </div>
      </div>

      {/* Product Info */}
      <div className="pt-4 pb-2">
        <p className="text-[10px] text-muted-foreground tracking-[0.2em] uppercase mb-1.5">
          {product.category}
        </p>
        <h3 className="font-heading text-sm tracking-wide uppercase text-foreground mb-2 line-clamp-1 transition-colors duration-200 group-hover:text-muted-foreground">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="font-heading text-sm text-foreground">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
