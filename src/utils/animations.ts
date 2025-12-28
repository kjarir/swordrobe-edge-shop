import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Text reveal animation
export const animateTextReveal = (selector: string, options?: {
  delay?: number;
  duration?: number;
  stagger?: number;
}) => {
  const { delay = 0, duration = 1, stagger = 0.1 } = options || {};
  
  return gsap.fromTo(
    selector,
    {
      y: 100,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration,
      delay,
      stagger,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: selector,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    }
  );
};

// Fade in on scroll
export const animateFadeIn = (selector: string, options?: {
  delay?: number;
  duration?: number;
  y?: number;
}) => {
  const { delay = 0, duration = 0.8, y = 50 } = options || {};
  
  return gsap.fromTo(
    selector,
    {
      opacity: 0,
      y,
    },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: selector,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    }
  );
};

// Stagger children animation
export const animateStagger = (selector: string, options?: {
  delay?: number;
  duration?: number;
  stagger?: number;
  y?: number;
}) => {
  const { delay = 0, duration = 0.6, stagger = 0.1, y = 30 } = options || {};
  
  return gsap.fromTo(
    selector,
    {
      opacity: 0,
      y,
    },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      stagger,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: selector,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    }
  );
};

// Parallax effect
export const animateParallax = (selector: string, speed: number = 0.5) => {
  return gsap.to(selector, {
    yPercent: -50 * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: selector,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
};

// Scale in animation
export const animateScaleIn = (selector: string, options?: {
  delay?: number;
  duration?: number;
  scale?: number;
}) => {
  const { delay = 0, duration = 0.8, scale = 0.8 } = options || {};
  
  return gsap.fromTo(
    selector,
    {
      opacity: 0,
      scale,
    },
    {
      opacity: 1,
      scale: 1,
      duration,
      delay,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: selector,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    }
  );
};

// Split text animation (for hero text)
export const animateSplitText = (selector: string, options?: {
  delay?: number;
  duration?: number;
}) => {
  const { delay = 0, duration = 1 } = options || {};
  
  const elements = document.querySelectorAll(selector);
  
  elements.forEach((el, index) => {
    const text = el.textContent || '';
    const words = text.split(' ');
    
    el.innerHTML = words
      .map((word, i) => `<span class="word" style="display: inline-block; opacity: 0; transform: translateY(100%);">${word}</span>`)
      .join(' ');
    
    const wordElements = el.querySelectorAll('.word');
    
    gsap.to(wordElements, {
      opacity: 1,
      y: 0,
      duration,
      delay: delay + index * 0.1,
      stagger: 0.05,
      ease: 'power3.out',
    });
  });
};

// Smooth scroll setup
export const setupSmoothScroll = () => {
  gsap.to('body', {
    scrollBehavior: 'smooth',
  });
};

// Magnetic button effect
export const setupMagneticButton = (selector: string) => {
  const buttons = document.querySelectorAll(selector);
  
  buttons.forEach((button) => {
    button.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(button, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: 'power2.out',
      });
    });
    
    button.addEventListener('mouseleave', () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)',
      });
    });
  });
};

