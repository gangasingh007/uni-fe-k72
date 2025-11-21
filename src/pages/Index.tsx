import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import StairTransition from '@/components/StairTransition';
import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';
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
      
      <Navbar />
      <main>
        {/* <Hero /> */}
        <FeaturesGrid />
        {/* <UniversityPartners /> */}
        <StudyNowPayLater />
      </main>

   <Footer />
    </div>
  );
};

export default Index;
