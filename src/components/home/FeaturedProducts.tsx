import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/products/ProductCard";
import { getFeaturedProducts } from "@/data/products";
import { ArrowRight } from "lucide-react";

const FeaturedProducts = () => {
  const featuredProducts = getFeaturedProducts();

  return (
    <section className="section-padding bg-background">
      <div className="container-wide">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-3">
              Curated Selection
            </p>
            <h2 className="heading-lg">Featured Products</h2>
          </div>
          <Link to="/shop">
            <Button variant="minimal" className="group">
              View All Products
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
