import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLHeadingElement>(null);
  const line2Ref = useRef<HTMLHeadingElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const line1 = line1Ref.current;
    const line2 = line2Ref.current;
    const video = videoRef.current;

    if (!line1 || !line2 || !video) return;

    // Initial animation
    const tl = gsap.timeline({ delay: 1.2 });

    tl.from(line1, {
      yPercent: 100,
      opacity: 0,
      duration: 1.2,
      ease: 'power4.out',
    }).from(
      line2,
      {
        yPercent: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
      },
      '-=0.8'
    );

    // Parallax effect on scroll
    gsap.to(video, {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      >
        <source
          src="https://assets.mixkit.co/videos/preview/mixkit-students-working-together-in-a-library-4885-large.mp4"
          type="video/mp4"
        />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="overflow-hidden mb-4">
          <h1 ref={line1Ref} className="text-hero">
            ONE NATION.
          </h1>
        </div>
        <div className="overflow-hidden">
          <h1 ref={line2Ref} className="text-hero text-accent">
            ONE APP.
          </h1>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10">
        <div className="w-px h-24 bg-foreground/30 animate-pulse" />
      </div>
    </section>
  );
};

export default Hero;
