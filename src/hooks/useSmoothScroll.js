import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';

/**
 * useSmoothScroll
 *
 * Initialises Lenis smooth scrolling driven by the GSAP ticker.
 * - Lenis provides buttery smooth momentum scrolling.
 * - GSAP's ticker drives the animation loop so both libraries stay in sync.
 * - lagSmoothing(0) prevents GSAP from throttling during tab-switch pauses.
 *
 * Safe-by-design:
 *   - Does not modify any CSS classes, layout, or existing animations.
 *   - Cleans up fully on component unmount (SPA-safe).
 *   - Native anchor hash links (#shop, #footer) work seamlessly with Lenis.
 */
function useSmoothScroll() {
  useEffect(() => {
    // Initialise Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo ease-out
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Disable GSAP lag smoothing so Lenis stays perfectly in sync
    gsap.ticker.lagSmoothing(0);

    // Connect Lenis to the GSAP ticker
    const tickerCallback = (time) => {
      lenis.raf(time * 1000); // GSAP time is in seconds; Lenis expects milliseconds
    };
    gsap.ticker.add(tickerCallback);

    // Cleanup on unmount
    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, []);
}

export default useSmoothScroll;
