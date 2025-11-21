import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const StairTransition = () => {
  const stairsRef = useRef<HTMLDivElement>(null);
  const STAIR_COUNT = 7;

  useEffect(() => {
    const stairs = stairsRef.current?.children;
    if (!stairs) return;

    // Initial state - cover the screen
    gsap.set(stairs, { yPercent: 0 });

    // Animate stairs opening with staggered effect
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

    return () => {
      tl.kill();
    };
  }, []);

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
