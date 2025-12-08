import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Sparkles, TrendingUp, Users, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('loadeddata', () => setIsVideoLoaded(true));
    }
  }, []);

  useGSAP(() => {
    if (!videoRef.current || !contentRef.current || !isVideoLoaded) return;

    const tl = gsap.timeline({ delay: 0.3 });

    // 1. Video Entrance with subtle zoom
    tl.fromTo(
      videoRef.current,
      { scale: 1.15, filter: 'blur(12px)', opacity: 0 },
      { scale: 1, filter: 'blur(0px)', opacity: 1, duration: 1.8, ease: 'power3.out' }
    );

    // 2. Enhanced Text Reveal with stagger
    const textElements = contentRef.current.querySelectorAll('.animate-text');
    tl.fromTo(
      textElements,
      { y: 60, opacity: 0, rotationX: -15 },
      {
        y: 0,
        opacity: 1,
        rotationX: 0,
        duration: 1.2,
        stagger: 0.12,
        ease: 'power4.out'
      },
      '-=1.2'
    );

    // 3. Parallax Effect on Scroll
    gsap.to(videoRef.current, {
      yPercent: 25,
      scale: 1.12,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      }
    });

    // 4. Content Fade Out on Scroll
    gsap.to(contentRef.current, {
      yPercent: -30,
      opacity: 0,
      ease: 'power2.in',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '40% top',
        scrub: 1
      }
    });
  }, { scope: containerRef, dependencies: [isVideoLoaded] });

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black"
    >
      {/* --- Background Layer --- */}
      <div className="absolute inset-0 z-0">
        {/* Video */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        >
          <source src="/video.mp4" type="video/mp4" />
        </video>

        {/* Enhanced Overlays */}
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-25 mix-blend-overlay" />

        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#14b8a605_1px,transparent_1px),linear-gradient(to_bottom,#14b8a605_1px,transparent_1px)] bg-[size:80px_80px] animate-grid-flow" />

        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-teal-500/20 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/15 rounded-full blur-[100px] animate-pulse-slower" />
      </div>

      {/* --- Content Layer --- */}
      <div ref={contentRef} className="relative z-10 container mx-auto px-6 md:px-12 text-center">
        <div className="max-w-5xl mx-auto">
          {/* Enhanced Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="animate-text overflow-hidden inline-flex mb-8"
          >
            <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-teal-500/15 to-emerald-500/15 border border-teal-500/30 backdrop-blur-xl shadow-[0_0_30px_rgba(20,184,166,0.3)]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-400 shadow-[0_0_10px_rgba(20,184,166,0.8)]"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-teal-300">
                UniConnect v2.0 Live
              </span>
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            </div>
          </motion.div>

          {/* Enhanced Headline */}
          <h1 className="animate-text text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[1.05] mb-8 px-4">
            The Future of <br />
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-400 to-teal-500 animate-gradient-shift">
                Academic Intelligence
              </span>
              {/* Underline Effect */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.5, duration: 0.8, ease: 'easeOut' }}
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 to-emerald-500 rounded-full origin-left"
              />
            </span>
          </h1>

          {/* Enhanced Subheadline */}
          <p className="animate-text text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed font-light px-4">
            Experience a new era of learning with{' '}
            <span className="text-teal-400 font-medium">AI-driven resource synthesis</span>,
            real-time collaboration, and intelligent document analysis.
          </p>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="animate-text flex flex-wrap justify-center gap-6 md:gap-10 mb-12 px-4"
          >
            <StatItem icon={<Users size={18} />} value="10K+" label="Students" />
            <StatItem icon={<TrendingUp size={18} />} value="50K+" label="Resources" />
            <StatItem icon={<Zap size={18} />} value="99.9%" label="Uptime" />
          </motion.div>

          {/* Enhanced Buttons */}
          <div className="animate-text flex flex-col sm:flex-row items-center justify-center gap-4 px-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-black rounded-full font-bold text-sm uppercase tracking-wide overflow-hidden shadow-[0_0_30px_rgba(20,184,166,0.4)] hover:shadow-[0_0_50px_rgba(20,184,166,0.6)] transition-all"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Started Free
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight size={16} />
                </motion.div>
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="group px-8 py-4 bg-white/5 border border-white/20 text-white rounded-full font-bold text-sm uppercase tracking-wide hover:bg-white/10 hover:border-white/30 transition-all backdrop-blur-xl flex items-center gap-3"
            >
              <motion.div
                className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-teal-500 transition-colors"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Play size={12} fill="currentColor" />
              </motion.div>
              Watch Demo
            </motion.button>
          </div>
        </div>
      </div>

      {/* --- Enhanced Scroll Indicator --- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/50 font-medium">
          Scroll to Explore
        </span>
        <div className="relative w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(20,184,166,0.8)]"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>

      {/* Custom Styles */}
      <style>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
        }
        @keyframes grid-flow {
          0% { transform: translate(0, 0); }
          100% { transform: translate(80px, 80px); }
        }
        .animate-grid-flow {
          animation: grid-flow 20s linear infinite;
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        .animate-pulse-slower {
          animation: pulse-slow 12s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

// Stat Item Component
const StatItem = ({ 
  icon, 
  value, 
  label 
}: { 
  icon: React.ReactNode; 
  value: string; 
  label: string;
}) => (
  <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-teal-500/30 transition-all group">
    <div className="text-teal-400 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <div className="text-left">
      <p className="text-white font-bold text-lg leading-none mb-1">{value}</p>
      <p className="text-white/50 text-[10px] uppercase tracking-wider font-medium">{label}</p>
    </div>
  </div>
);

export default Hero;
