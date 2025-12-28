import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Clock, Instagram, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "We'll get back to you soon!",
    });
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 md:py-28 bg-secondary">
        <div className="container-wide text-center">
          <p className="text-primary text-sm tracking-widest uppercase mb-4">
            Get In Touch
          </p>
          <h1 className="heading-xl mb-4">Contact Us</h1>
          <p className="body-lg text-muted-foreground max-w-xl mx-auto">
            Visit our boutique or reach out online
          </p>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Store Information */}
            <div>
              <h2 className="heading-md mb-8">Visit Our Boutique</h2>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="h-14 w-14 border border-primary/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="heading-sm mb-2">Location</h4>
                    <p className="body-md text-muted-foreground">
                      Rassaz Multiplex, Shop No.51<br />
                      Mira Road, Mumbai
                    </p>
                    <a 
                      href="https://maps.google.com/?q=Rassaz+Multiplex+Mira+Road+Mumbai" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 text-sm text-primary hover:underline transition-colors"
                    >
                      Get Directions
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-14 w-14 border border-primary/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="heading-sm mb-2">Phone</h4>
                    <a 
                      href="tel:7977981325" 
                      className="body-md text-muted-foreground hover:text-primary transition-colors"
                    >
                      7977981325
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-14 w-14 border border-primary/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="heading-sm mb-2">Store Hours</h4>
                    <p className="body-md text-muted-foreground">
                      Monday - Saturday: 11:00 AM - 9:00 PM<br />
                      Sunday: 12:00 PM - 8:00 PM
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-14 w-14 border border-primary/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Instagram className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="heading-sm mb-2">Follow Us</h4>
                    <a 
                      href="https://instagram.com/lavenderlily" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="body-md text-muted-foreground hover:text-primary transition-colors"
                    >
                      @lavenderlily
                    </a>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="mt-12 aspect-video bg-gradient-to-br from-accent/30 to-secondary rounded-xl flex items-center justify-center border border-border">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-primary/30 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">
                    Mira Road, Mumbai
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="heading-md mb-8">Send a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="heading-sm block mb-3">Name</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    required
                    className="h-14 bg-secondary border-border focus:border-primary rounded-lg"
                  />
                </div>

                <div>
                  <label className="heading-sm block mb-3">Email</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    required
                    className="h-14 bg-secondary border-border focus:border-primary rounded-lg"
                  />
                </div>

                <div>
                  <label className="heading-sm block mb-3">Message</label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can we help?"
                    required
                    rows={6}
                    className="bg-secondary border-border focus:border-primary rounded-lg resize-none"
                  />
                </div>

                <Button variant="hero" size="xl" type="submit" className="w-full">
                  Send Message
                </Button>
              </form>

              {/* Additional Info */}
              <div className="mt-12 p-8 bg-secondary border border-border rounded-xl">
                <h4 className="heading-sm mb-4">Quick Help</h4>
                <div className="space-y-3 text-muted-foreground body-md">
                  <p>
                    <strong className="text-foreground">Orders & Shipping:</strong> Track your order or ask about delivery times
                  </p>
                  <p>
                    <strong className="text-foreground">Returns:</strong> Easy returns within 7 days of delivery
                  </p>
                  <p>
                    <strong className="text-foreground">Size Help:</strong> Need help finding your size? Just ask!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
