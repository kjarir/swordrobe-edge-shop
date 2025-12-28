import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 md:py-32 bg-secondary relative overflow-hidden">
        {/* Background Text */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none">
          <span className="font-heading text-[30vw] font-bold tracking-tighter whitespace-nowrap">
            LL
          </span>
        </div>
        
        <div className="container-wide relative z-10">
          <div className="max-w-3xl">
            <p className="text-primary text-sm tracking-widest uppercase mb-4">
              Our Story
            </p>
            <h1 className="heading-xl mb-6">
              Elegance<br />
              Redefined
            </h1>
            <p className="body-lg text-muted-foreground">
              LavenderLily was born from a love for timeless beauty, designed for 
              women who appreciate elegance in everyday life.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-primary text-sm tracking-widest uppercase mb-4">
                Our Mission
              </p>
              <h2 className="heading-lg mb-8">
                Beauty in<br />
                simplicity.
              </h2>
              <div className="space-y-6 body-md text-muted-foreground">
                <p>
                  LavenderLily isn't just a boutique—it's a celebration of feminine grace. 
                  We curate pieces that make every woman feel confident and beautiful.
                </p>
                <p>
                  Every piece is selected with care, focusing on quality fabrics, 
                  flattering silhouettes, and timeless designs that transcend trends.
                </p>
                <p>
                  We believe fashion should empower you to express your unique beauty. 
                  That's why every LavenderLily piece is chosen to make you feel 
                  effortlessly elegant.
                </p>
              </div>
            </div>
            <div className="aspect-square bg-gradient-to-br from-accent/30 to-secondary rounded-2xl flex items-center justify-center">
              <span className="font-heading text-6xl text-primary/20 tracking-widest">
                LL
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-secondary">
        <div className="container-wide">
          <div className="text-center mb-16">
            <p className="text-primary text-sm tracking-widest uppercase mb-4">
              What We Believe
            </p>
            <h2 className="heading-lg">Our Values</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Quality First",
                description: "Premium fabrics and careful craftsmanship. We never compromise on what touches your skin.",
              },
              {
                title: "Timeless Beauty",
                description: "Designs that transcend seasons. Classic elegance that remains beautiful year after year.",
              },
              {
                title: "Feminine Grace",
                description: "Celebrating the unique beauty of every woman. Fashion that empowers and inspires confidence.",
              },
            ].map((value, index) => (
              <div key={index} className="p-8 bg-background border border-border rounded-xl hover:border-primary/30 transition-colors">
                <span className="text-6xl font-heading text-primary/30 block mb-4">
                  0{index + 1}
                </span>
                <h3 className="heading-sm mb-4">{value.title}</h3>
                <p className="body-md text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-wide text-center">
          <h2 className="heading-lg mb-6">
            Ready to bloom?
          </h2>
          <p className="body-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Explore our collection and find your perfect piece.
          </p>
          <Link to="/shop">
            <Button variant="hero" size="xl" className="group">
              Shop Now
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default About;
