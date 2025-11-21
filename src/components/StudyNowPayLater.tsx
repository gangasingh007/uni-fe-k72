import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const StudyNowPayLater = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lines = [line1Ref.current, line2Ref.current, line3Ref.current];

    lines.forEach((line) => {
      if (!line) return;

      gsap.from(line, {
        yPercent: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: line,
          start: 'top 80%',
          end: 'top 50%',
          scrub: 1,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="overflow-hidden">
            <div ref={line1Ref} className="text-display">
              STUDY NOW.
            </div>
          </div>
          <div className="overflow-hidden">
            <div ref={line2Ref} className="text-display text-accent">
              PAY LATER.
            </div>
          </div>
          <div className="overflow-hidden">
            <div ref={line3Ref} className="text-display">
              SUCCEED ALWAYS.
            </div>
          </div>
        </div>

        <div className="mt-20 max-w-2xl mx-auto">
          <p className="text-2xl text-muted-foreground leading-relaxed">
            No upfront fees. Pay only after you land your dream job. We invest in your future
            because we believe in your potential.
          </p>
          <button className="mt-12 px-12 py-6 bg-accent text-background uppercase text-lg font-bold tracking-wider hover:bg-accent/90 transition-colors">
            Learn More
          </button>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 w-px h-1/2 bg-border" />
      <div className="absolute top-1/2 right-0 w-px h-1/2 bg-border" />
    </section>
  );
};

export default StudyNowPayLater;
