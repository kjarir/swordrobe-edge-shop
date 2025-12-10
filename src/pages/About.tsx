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
            SW
          </span>
        </div>
        
        <div className="container-wide relative z-10">
          <div className="max-w-3xl">
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-4">
              Our Story
            </p>
            <h1 className="heading-xl mb-6">
              Built for Warriors.<br />
              Worn by the Bold.
            </h1>
            <p className="body-lg text-muted-foreground">
              Swordrobe was born from the streets of Mumbai, designed for those who 
              refuse to follow the crowd.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-4">
                The Mission
              </p>
              <h2 className="heading-lg mb-8">
                More than clothing.<br />
                It's armor.
              </h2>
              <div className="space-y-6 body-md text-muted-foreground">
                <p>
                  Swordrobe isn't just a brand—it's a movement. We create clothing for 
                  the urban warriors who carve their own path through the concrete jungle.
                </p>
                <p>
                  Every piece is designed with intention. From the tactical utility of our 
                  cargo pants to the premium weight of our tees, we obsess over the details 
                  that matter. Quality materials. Functional design. Unapologetic style.
                </p>
                <p>
                  We believe your wardrobe should empower you, not confine you. That's why 
                  every Swordrobe piece is built to move with you, last through the grind, 
                  and make a statement without saying a word.
                </p>
              </div>
            </div>
            <div className="aspect-square bg-secondary flex items-center justify-center">
              <span className="font-heading text-6xl text-muted-foreground/20 tracking-widest">
                SW
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-card">
        <div className="container-wide">
          <div className="text-center mb-16">
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-4">
              What We Stand For
            </p>
            <h2 className="heading-lg">Our Values</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Quality First",
                description: "Premium materials, superior construction. We never compromise on what goes into our products.",
              },
              {
                title: "Street Authenticity",
                description: "Born from street culture, staying true to our roots. Every design reflects real urban life.",
              },
              {
                title: "Bold Expression",
                description: "Fashion should be fearless. We create for those who dare to stand out and make statements.",
              },
            ].map((value, index) => (
              <div key={index} className="p-8 border border-border hover:border-foreground/30 transition-colors">
                <span className="text-6xl font-heading text-muted-foreground/30 block mb-4">
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
            Ready to gear up?
          </h2>
          <p className="body-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Explore our collection and find your armor.
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
