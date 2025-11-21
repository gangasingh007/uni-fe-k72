import { useRef, useState } from 'react';
import { BookOpen, Trophy, Briefcase, Users, Book, Calendar, Compass } from 'lucide-react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const features = [
  {
    icon: BookOpen,
    link:"/subjects/resources",
    title: 'Subjects',
    description: 'View your Subjects',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800',
  },
  {
    icon: Book,
    link:"/subjects/resources",  
    title: 'Syllabus',
    description: 'View your syllabus',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800',
  },
  {
    icon: Calendar,
    link:"/subjects/resources",
    title: 'DateSheet',
    description: 'View your exam schedule',
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800',
  },
  {
    icon: Compass,
    link:"/subjects/resources",
    title: 'Explore',
    description: 'Explore more features',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800',
  },
];

const FeaturesGrid = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const cursorImageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!titleRef.current) return;

    const split = new SplitText(titleRef.current, { type: 'words' });
    const words = split.words;

    gsap.from(words, {
      scrollTrigger: {
        trigger: titleRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      opacity: 0,
      y: 20,
      stagger: 0.05,
      duration: 0.5,
    });
  }, { scope: titleRef });

  const handleMouseMove = (e: React.MouseEvent, index: number) => {
    const cursorImage = cursorImageRef.current;
    if (!cursorImage) return;

    gsap.to(cursorImage, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.3,
      ease: 'power3.out',
    });

    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <section className={`py-32 bg-background relative ${hoveredIndex !== null ? 'cursor-none' : ''}`} id="features">
      <div className="container mx-auto px-6">
        <h2 ref={titleRef} className="text-display mb-20 text-center">
          Everything for <span className='text-teal-500'> Students </span>
          With Single Click <span className='text-teal-500'>AI Summarization</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border" onMouseLeave={handleMouseLeave}>
          {features.map((feature, index) => (
            <a href={feature.link} key={index}>
              <div
              key={index}
                className="group relative bg-background p-12 hover:bg-accent transition-all duration-500"
              onMouseMove={(e) => handleMouseMove(e, index)}
            >
              <feature.icon className="w-16 h-16 mb-8 group-hover:text-background transition-colors" />
              <h3 className="text-title mb-4 group-hover:text-background transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-lg group-hover:text-background/80 transition-colors">
                {feature.description}
              </p>

              {/* Hover indicator */}
              <div className="absolute bottom-12 right-12">
                <div className="w-12 h-12 border-2 border-current rounded-full flex items-center justify-center group-hover:scale-150 transition-transform duration-500">
                  <div className="w-1 h-1 bg-current rounded-full" />
                </div>
              </div>
            </div>
            </a>
          ))}
        </div>
      </div>

      {/* Cursor Image */}
      <div
        ref={cursorImageRef}
        className="fixed pointer-events-none z-50 w-64 h-64 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
        style={{ 
          opacity: hoveredIndex !== null ? 1 : 0, 
          visibility: hoveredIndex !== null ? 'visible' : 'hidden' }}
      >
        {hoveredIndex !== null && (
          <img
            src={features[hoveredIndex].image}
            alt=""
            className="w-full h-full object-cover"
          />
        )}
      </div>
    </section>
  );
};

export default FeaturesGrid;
