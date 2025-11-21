import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const StudyNowPayLater = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
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
    <section ref={sectionRef} className="py-32 bg-black text-white relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="overflow-hidden">
            <div ref={line1Ref} className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-white">
              FREE FOREVER,
            </div>
          </div>
          <div className="overflow-hidden">
            <div ref={line2Ref} className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-teal-400">
              NO LOGINS
            </div>
          </div>
          <div className="overflow-hidden">
            <div ref={line3Ref} className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-white">
              SUCCEED ALWAYS.
            </div>
          </div>
        </div>

        <div className="mt-20 max-w-2xl mx-auto">
          <p className="text-xl text-white/70 leading-relaxed">
            100% free access to all study materials, no sign-ups required. Focus on learning with our AI-powered summaries and resources designed to help you excel in your exams.
          </p>
          <button onClick={()=>navigate("/subjects/resources")} className="mt-12 px-10 py-4 bg-teal-500 text-black uppercase text-sm font-bold tracking-wider hover:bg-teal-600 transition-colors rounded-lg">
            get started
          </button>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 w-px h-1/2 bg-white/10" />
      <div className="absolute top-1/2 right-0 w-px h-1/2 bg-white/10" />
    </section>
  );
};

export default StudyNowPayLater;
