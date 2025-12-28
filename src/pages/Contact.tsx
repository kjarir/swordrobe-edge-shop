import { useEffect, useRef } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Clock, Instagram, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

  const heroSectionRef = useRef<HTMLElement>(null);
  const heroLabelRef = useRef<HTMLParagraphElement>(null);
  const heroHeadingRef = useRef<HTMLHeadingElement>(null);
  const heroDescriptionRef = useRef<HTMLParagraphElement>(null);
  const contactSectionRef = useRef<HTMLElement>(null);
  const storeInfoRef = useRef<HTMLDivElement>(null);
  const storeInfoItemsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const formFieldsRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Section Animations
      gsap.fromTo(
        heroLabelRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heroSectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Hero heading text reveal
      if (heroHeadingRef.current) {
        const text = heroHeadingRef.current.textContent || "";
        heroHeadingRef.current.innerHTML = `<span class="contact-heading-line" style="display: inline-block; opacity: 0; transform: translateY(100px); clip-path: inset(0 0 100% 0);">${text}</span>`;

        gsap.to(".contact-heading-line", {
          opacity: 1,
          y: 0,
          clipPath: "inset(0 0 0% 0)",
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heroHeadingRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }

      gsap.fromTo(
        heroDescriptionRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: heroDescriptionRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Store Info Section
      gsap.fromTo(
        storeInfoRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contactSectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Store Info Items
      const infoItems = storeInfoItemsRef.current?.children;
      if (infoItems) {
        gsap.fromTo(
          infoItems,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: storeInfoItemsRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Form Section
      gsap.fromTo(
        formRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contactSectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Form Fields
      const formFields = formFieldsRef.current?.querySelectorAll("div");
      if (formFields) {
        gsap.fromTo(
          formFields,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: formFieldsRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <Layout>
      {/* Hero */}
      <section ref={heroSectionRef} className="py-20 md:py-28 bg-secondary">
        <div className="container-wide text-center">
          <p ref={heroLabelRef} className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-4">
            Get In Touch
          </p>
          <h1 ref={heroHeadingRef} className="heading-xl mb-4">Contact Us</h1>
          <p ref={heroDescriptionRef} className="body-lg text-muted-foreground max-w-xl mx-auto">
            Visit our store or reach out online
          </p>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section ref={contactSectionRef} className="section-padding">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Store Information */}
            <div ref={storeInfoRef}>
              <h2 className="heading-md mb-8">Visit Our Store</h2>
              
              <div ref={storeInfoItemsRef} className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="h-14 w-14 border border-border flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="heading-sm mb-2">Location</h4>
                    <p className="body-md text-muted-foreground">
                      Dubai Mall, Level 2<br />
                      Fashion Avenue, Dubai, UAE
                    </p>
                    <a 
                      href="https://maps.google.com/?q=Dubai+Mall+Fashion+Avenue" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 text-sm text-muted-foreground underline hover:text-foreground transition-colors"
                    >
                      Get Directions
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-14 w-14 border border-border flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="heading-sm mb-2">Phone</h4>
                    <a 
                      href="tel:+971501234567" 
                      className="body-md text-muted-foreground hover:text-foreground transition-colors"
                    >
                      +971 50 123 4567
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-14 w-14 border border-border flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="heading-sm mb-2">Store Hours</h4>
                    <p className="body-md text-muted-foreground">
                      Monday - Saturday: 10:00 AM - 10:00 PM<br />
                      Sunday: 12:00 PM - 10:00 PM
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-14 w-14 border border-border flex items-center justify-center flex-shrink-0">
                    <Instagram className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="heading-sm mb-2">Follow Us</h4>
                    <a 
                      href="https://instagram.com/LavenderLily" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="body-md text-muted-foreground hover:text-foreground transition-colors"
                    >
                      @LavenderLily
                    </a>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="mt-12 aspect-video bg-secondary flex items-center justify-center border border-border">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">
                    Dubai, UAE
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div ref={formRef}>
              <h2 className="heading-md mb-8">Send a Message</h2>
              
              <form ref={formFieldsRef} onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="heading-sm block mb-3">Name</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    required
                    className="h-14 bg-secondary border-border focus:border-foreground rounded-none"
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
                    className="h-14 bg-secondary border-border focus:border-foreground rounded-none"
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
                    className="bg-secondary border-border focus:border-foreground rounded-none resize-none"
                  />
                </div>

                <Button variant="hero" size="xl" type="submit" className="w-full">
                  Send Message
                </Button>
              </form>

              {/* Additional Info */}
              <div className="mt-12 p-8 bg-secondary border border-border">
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
