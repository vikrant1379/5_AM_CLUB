import { useState, useEffect } from 'react';

export function useScrollDirection() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset;
      
      // Only update if scroll distance is significant enough
      if (Math.abs(scrollY - lastScrollY) < 15) {
        ticking = false;
        return;
      }
      
      if (scrollY > lastScrollY && scrollY > 80) {
        // Scrolling down & past threshold - hide header/footer
        setShow(false);
      } else if (scrollY < lastScrollY) {
        // Scrolling up - show header/footer
        setShow(true);
      }
      
      setLastScrollY(scrollY > 0 ? scrollY : 0);
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick, { passive: true });
    
    return () => window.removeEventListener('scroll', requestTick);
  }, [lastScrollY]);

  return show;
}