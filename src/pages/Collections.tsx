import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const collections = [
  {
    id: "shadow-ops",
    name: "Shadow Ops",
    description: "Tactical essentials for night missions",
    tag: "CORE",
    pieces: "08",
  },
  {
    id: "void-series",
    name: "Void Series",
    description: "Minimalist darkness, maximum impact",
    tag: "NEW",
    pieces: "06",
  },
  {
    id: "urban-armor",
    name: "Urban Armor",
    description: "Protection meets streetwear",
    tag: "SIGNATURE",
    pieces: "10",
  },
  {
    id: "phantom-drop",
    name: "Phantom Drop",
    description: "Limited edition stealth pieces",
    tag: "LIMITED",
    pieces: "04",
  },
];

const Collections = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-24 md:py-32 bg-secondary relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
          backgroundSize: '48px 48px'
        }} />
        
        <div className="container-wide relative text-center">
          <div className="flex items-center justify-center gap-3 mb-6 opacity-0 animate-fade-in">
            <span className="w-8 h-px bg-muted-foreground" />
            <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase">
              Curated
            </p>
            <span className="w-8 h-px bg-muted-foreground" />
          </div>
          <h1 className="heading-xl mb-6 opacity-0 animate-fade-in-up stagger-1">Collections</h1>
          <p className="body-lg text-muted-foreground max-w-lg mx-auto opacity-0 animate-fade-in-up stagger-2">
            Explore our carefully curated drops and signature series
          </p>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {collections.map((collection, index) => (
              <Link
                key={collection.id}
                to={`/shop?collection=${collection.id}`}
                className="group relative aspect-[4/3] bg-card overflow-hidden border border-border/50 hover:border-foreground/20 transition-all duration-300 opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-secondary via-muted/30 to-secondary opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                
                {/* Pattern overlay */}
                <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity" style={{
                  backgroundImage: `linear-gradient(45deg, hsl(var(--foreground)) 1px, transparent 1px)`,
                  backgroundSize: '30px 30px'
                }} />

                {/* Tag & Count */}
                <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
                  <span className="text-[10px] font-heading tracking-[0.2em] text-muted-foreground border border-border/50 px-3 py-1.5 bg-background/50 backdrop-blur-sm">
                    {collection.tag}
                  </span>
                  <span className="text-[10px] font-heading tracking-[0.2em] text-muted-foreground">
                    {collection.pieces} PIECES
                  </span>
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                  <h3 className="heading-md mb-2 transition-transform duration-300 group-hover:translate-x-2">
                    {collection.name}
                  </h3>
                  <p className="body-md text-muted-foreground mb-4">
                    {collection.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs font-heading tracking-[0.15em] uppercase text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                    <span>Explore Collection</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                </div>

                {/* Bottom line */}
                <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-0.5 bg-foreground transition-all duration-500 ease-out" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-foreground text-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--background)) 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }} />
        
        <div className="container-wide relative text-center">
          <h2 className="font-heading text-2xl md:text-4xl tracking-wide uppercase mb-8">
            Can't decide? Browse everything
          </h2>
          <Link to="/shop">
            <Button 
              variant="outline" 
              size="lg" 
              className="border-background/30 text-background hover:bg-background hover:text-foreground transition-all duration-200"
            >
              Shop All Products
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Collections;
