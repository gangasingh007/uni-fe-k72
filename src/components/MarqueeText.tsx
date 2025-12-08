import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface MarqueeTextProps {
  text: string;
  speed?: number;
  className?: string;
}

const MarqueeText = ({ text, speed = 100, className = '' }: MarqueeTextProps) => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const firstTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    const firstText = firstTextRef.current;
    if (!marquee || !firstText) return;

    const textWidth = firstText.offsetWidth;

    // Create infinite scroll animation
    const tl = gsap.timeline({
      repeat: -1,
      defaults: { ease: 'none' },
    });

    tl.to(marquee, {
      xPercent: -50,
      duration: speed,
    });

    // Speed up on scroll
    ScrollTrigger.create({
      trigger: marquee,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        const velocity = self.getVelocity();
        gsap.to(tl, {
          timeScale: 1 + Math.abs(velocity) / 1000,
          duration: 0.3,
        });
      },
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [text, speed]);

  return (
    <div className={`whitespace-nowrap ${className}`}>
      <div ref={marqueeRef} className="inline-flex">
        <div ref={firstTextRef} className="flex items-center gap-8 pr-8">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="text-display">
              {text}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-8 pr-8" aria-hidden="true">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="text-display">
              {text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarqueeText;
