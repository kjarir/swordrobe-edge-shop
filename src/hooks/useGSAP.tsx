import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useGSAP = (callback: (ctx: gsap.Context) => void, deps: React.DependencyList = []) => {
  const scope = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      callback(ctx);
    }, scope);

    return () => ctx.revert();
  }, deps);

  return scope;
};

export default useGSAP;

