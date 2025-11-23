import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Play, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // --- GSAP Animations ---
  useGSAP(() => {
    if (!videoRef.current || !contentRef.current) return;

    const tl = gsap.timeline({ delay: 0.5 });

    // 1. Video Entrance (Scale down effect)
    tl.fromTo(videoRef.current, 
      { scale: 1.2, filter: "blur(10px)" },
      { scale: 1, filter: "blur(0px)", duration: 1.5, ease: "power3.out" }
    );

    // 2. Staggered Text Reveal
    const textElements = contentRef.current.querySelectorAll('.animate-text');
    tl.fromTo(textElements, 
      { y: 50, opacity: 0, clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' },
      { 
        y: 0, 
        opacity: 1, 
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', 
        duration: 1, 
        stagger: 0.15, 
        ease: "power4.out" 
      },
      "-=1" // Overlap with video animation
    );

    // 3. Parallax Effect on Scroll
    gsap.to(videoRef.current, {
      yPercent: 20,
      scale: 1.1,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    // 4. Content Fade Out on Scroll
    gsap.to(contentRef.current, {
      yPercent: -20,
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "50% top",
        scrub: true
      }
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      
      {/* --- Background Layer --- */}
      <div className="absolute inset-0 z-0">
        {/* Video */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        >
          <source src="/video.mp4" type="video/mp4" />
          {/* Fallback for design preview */}
        </video>

        {/* Texture Overlays */}
        <div className="absolute inset-0 bg-black/50" /> {/* Dimmer */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" /> {/* Vignette */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" /> {/* Noise */}
        
        {/* Tech Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:60px_60px] mask-image-gradient" />
      </div>

      {/* --- Content Layer --- */}
      <div ref={contentRef} className="relative z-10 container mx-auto px-6 text-center md:text-left">
        <div className="max-w-4xl">
          
          {/* Badge */}
          <div className="animate-text overflow-hidden inline-flex mb-6">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-teal-400">UniConnect v2.0 Live</span>
            </div>
          </div>

          {/* Headline */}
          <h1 className="animate-text text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tighter leading-[1.1] mb-6">
            The Future of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-500">
              Academic Intelligence.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="animate-text text-lg md:text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed font-light">
            Experience a new era of learning with AI-driven resource synthesis, 
            real-time collaboration, and intelligent document analysis.
          </p>

          {/* Buttons */}
          <div className="animate-text flex flex-col sm:flex-row items-center gap-4">
            <button className="group relative px-8 py-4 bg-white text-black rounded-full font-bold text-sm uppercase tracking-wide overflow-hidden transition-transform hover:scale-105">
              <span className="relative z-10 flex items-center gap-2">
                Get Started <ArrowRight size={16} />
              </span>
              <div className="absolute inset-0 bg-teal-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
            </button>
            
            <button className="group px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-bold text-sm uppercase tracking-wide hover:bg-white/10 transition-all backdrop-blur-sm flex items-center gap-3">
               <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-teal-500 transition-colors">
                  <Play size={10} fill="currentColor" />
               </div>
               Watch Demo
            </button>
          </div>

        </div>
      </div>

      {/* --- Scroll Indicator --- */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-50">
         <span className="text-[10px] uppercase tracking-widest text-white/60">Scroll</span>
         <div className="w-[1px] h-16 bg-gradient-to-b from-white/0 via-white/50 to-white/0">
            <div className="w-full h-1/2 bg-white animate-scroll-down" />
         </div>
      </div>

      <style>{`
        @keyframes scroll-down {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(100%); opacity: 0; }
        }
        .animate-scroll-down {
          animation: scroll-down 2s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;
