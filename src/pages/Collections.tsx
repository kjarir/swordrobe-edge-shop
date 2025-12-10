import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const collections = [
  {
    id: "new-arrivals",
    name: "New Arrivals",
    description: "The latest drops from the street",
    tag: "FRESH",
  },
  {
    id: "essentials",
    name: "Essentials",
    description: "Wardrobe staples for every warrior",
    tag: "CORE",
  },
  {
    id: "outerwear",
    name: "Outerwear Edit",
    description: "Layer up in style",
    tag: "SEASONAL",
  },
  {
    id: "utility",
    name: "Utility Collection",
    description: "Function meets fashion",
    tag: "TACTICAL",
  },
];

const Collections = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 md:py-28 bg-secondary">
        <div className="container-wide text-center">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-4">
            Curated
          </p>
          <h1 className="heading-xl mb-4">Collections</h1>
          <p className="body-lg text-muted-foreground max-w-xl mx-auto">
            Explore our carefully curated collections
          </p>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-6">
            {collections.map((collection, index) => (
              <Link
                key={collection.id}
                to={`/shop?collection=${collection.id}`}
                className="group relative aspect-[4/3] bg-card overflow-hidden border border-border hover:border-foreground/30 transition-all duration-500"
              >
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-secondary via-muted to-secondary opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
                
                {/* Tag */}
                <div className="absolute top-6 left-6">
                  <span className="text-[10px] font-heading tracking-[0.2em] text-muted-foreground border border-border px-3 py-1">
                    {collection.tag}
                  </span>
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <h3 className="heading-md mb-2 group-hover:translate-x-2 transition-transform duration-300">
                    {collection.name}
                  </h3>
                  <p className="body-md text-muted-foreground mb-4">
                    {collection.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-heading tracking-wider uppercase text-muted-foreground group-hover:text-foreground transition-colors">
                    <span>Explore</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>

                {/* Hover Line */}
                <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-1 bg-foreground transition-all duration-500" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-foreground text-background">
        <div className="container-wide text-center">
          <h2 className="font-heading text-3xl md:text-4xl tracking-wide uppercase mb-6">
            Can't decide? Shop all products
          </h2>
          <Link to="/shop">
            <Button variant="outline" size="lg" className="border-background text-background hover:bg-background hover:text-foreground">
              Shop All
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Collections;
