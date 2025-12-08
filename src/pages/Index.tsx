import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import Hero from '@/components/Hero';
import FeaturesGrid from '@/components/FeaturesGrid';
import UniversityPartners from '@/components/UniversityPartners';
import StudyNowPayLater from '@/components/StudyNowPayLater';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-background min-h-screen">
      <main>
        <FeaturesGrid />
        <div className="relative overflow-hidden ">
          <div className="absolute inset-0 rotate-[10deg] opacity-10 pointer-events-none">
            <UniversityPartners speed={300} textColor={"white"} />
          </div>
          <div className="relative z-10 rotate-[-10deg]">
            <UniversityPartners speed={200} textColor={"teal-500"}/>
          </div>
        </div>
        <StudyNowPayLater />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
