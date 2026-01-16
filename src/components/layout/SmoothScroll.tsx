import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { trackPageView } from "@/lib/analytics";

gsap.registerPlugin(ScrollTrigger);

const SmoothScroll = () => {
  const location = useLocation();

  useEffect(() => {
    // Refresh ScrollTrigger on route change
    ScrollTrigger.refresh();

    // Smooth scroll behavior
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Track page view
    trackPageView(location.pathname);
  }, [location]);

  useEffect(() => {
    // Global smooth scroll setup
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        window.scrollBy({
          top: e.deltaY,
          behavior: "smooth",
        });
      }
    };

    // Optional: Enable smooth wheel scrolling
    // window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      // window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return null;
};

export default SmoothScroll;

