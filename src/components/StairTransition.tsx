import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';

const StairTransition = () => {
  const stairsRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const STAIR_COUNT = 5;
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const isInitialMount = useRef(true);
  const previousPathname = useRef<string>(location.pathname);

  useEffect(() => {
    const stairs = stairsRef.current?.children;
    if (!stairs) return;


    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    if (isInitialMount.current) {
      gsap.set(stairs, { yPercent: 0 });
      
      const tl = gsap.timeline({
        delay: 0.3,
      });

      tl.to(stairs, {
        yPercent: -100,
        duration: 0.8,
        ease: 'power3.inOut',
        stagger: {
          amount: 0.3,
          from: 'start',
        },
      });

      timelineRef.current = tl;
      isInitialMount.current = false;
      previousPathname.current = location.pathname;
    } else if (previousPathname.current !== location.pathname) {
      // On route change: close stairs (cover screen), then open (reveal new page)
      // Close stairs first
      const closeTL = gsap.timeline();
      closeTL.to(stairs, {
        yPercent: 0,
        duration: 0.5,
        ease: 'power3.inOut',
        stagger: {
          amount: 0.25,
          from: 'start',
        },
      });

      const openTL = gsap.timeline({
        delay: 0.15,
      });
      openTL.to(stairs, {
        yPercent: -100,
        duration: 0.7,
        ease: 'power3.inOut',
        stagger: {
          amount: 0.3,
          from: 'start',
        },
      });

      timelineRef.current = gsap.timeline()
        .add(closeTL)
        .add(openTL);
      
      previousPathname.current = location.pathname;
    }

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [location.pathname]);

  return (
    <div
      ref={stairsRef}
      className="fixed inset-0 z-50 pointer-events-none flex"
      aria-hidden="true"
    >
      {Array.from({ length: STAIR_COUNT }).map((_, index) => (
        <div
          key={index}
          className="flex-1 bg-foreground"
          style={{
            transformOrigin: 'bottom',
          }}
        />
      ))}
    </div>
  );
};

export default StairTransition;
