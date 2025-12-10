import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/products/ProductCard";
import { products, categories, getProductsByCategory } from "@/data/products";
import { cn } from "@/lib/utils";

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || "all";

  const filteredProducts = getProductsByCategory(activeCategory);

  const handleCategoryChange = (categoryId: string) => {
    if (categoryId === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ category: categoryId });
    }
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 md:py-28 bg-secondary">
        <div className="container-wide text-center">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-4">
            Shop All
          </p>
          <h1 className="heading-xl mb-4">The Collection</h1>
          <p className="body-lg text-muted-foreground max-w-xl mx-auto">
            Explore our full range of streetwear essentials
          </p>
        </div>
      </section>

      {/* Filters & Products */}
      <section className="section-padding">
        <div className="container-wide">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-4 mb-12 pb-8 border-b border-border">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={cn(
                  "px-6 py-3 text-sm font-heading tracking-[0.15em] uppercase transition-all duration-300 border",
                  activeCategory === category.id
                    ? "bg-foreground text-background border-foreground"
                    : "bg-transparent text-muted-foreground border-border hover:border-foreground hover:text-foreground"
                )}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-muted-foreground body-lg">
                No products found in this category.
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Shop;
