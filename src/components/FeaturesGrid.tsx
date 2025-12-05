import { useRef, useState } from 'react';
import { BookOpen, Trophy, Briefcase, Users, Book, Calendar, Compass } from 'lucide-react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useNavigate } from 'react-router-dom';
import subjectimage from "../assets/subjects.avif"
import exploreimage from "../assets/explore.avif"
import datesheetimage from "../assets/datesheet.avif"
import syllabusimage from "../assets/syllabus.avif"


gsap.registerPlugin(ScrollTrigger, SplitText);

const features = [
  {
    icon: BookOpen,
    link:"/subjects/resources",
    title: 'Subjects',
    description: 'View your Subjects',
    image: subjectimage,},
  {
    icon: Book,
    link:"/syllabus",  
    title: 'Syllabus',
      description: 'View your syllabus',
      image: syllabusimage,
    },
  {
    icon: Calendar,
    link:"/datesheet",
    title: 'DateSheet',
    description: 'View your exam schedule',
    image: datesheetimage,
  },
  {
    icon: Compass,
    link:"/explore",
    title: 'Explore',
    description: 'Explore the architecture of our platform',
    image: exploreimage  
  },
];

const FeaturesGrid = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const cursorImageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const navigate = useNavigate();

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
      xPercent: -50,
      yPercent: -50,
      duration: 0.2,
      ease: 'power3.out',
      overwrite: 'auto',
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
          Everything for <span className='text-teal-500'> exams </span>
          With Single Click <span className='text-teal-500'>AI Summarization</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border" onMouseLeave={handleMouseLeave}>
          {features.map((feature, index) => (
            <div onClick={() => navigate(feature.link)} key={index}>
              <div
                className="group relative bg-background p-12 hover:bg-accent transition-all duration-500"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={handleMouseLeave}
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
            </div>
          ))}
        </div>
      </div>

      {/* Cursor Image */}
      <div
        ref={cursorImageRef}
        className="fixed rounded-full pointer-events-none z-50 w-64 h-64 transition-opacity duration-300"
        style={{ 
          top: 0,
          left: 0,
          opacity: hoveredIndex !== null ? 1 : 0, 
          visibility: hoveredIndex !== null ? 'visible' : 'hidden' }}
      >
        {hoveredIndex !== null && (
          <img
            src={features[hoveredIndex].image}
            alt=""
            className="w-[70%] h-[70%] object-cover rounded-xl"
          />
        )}
      </div>
    </section>
  );
};

export default FeaturesGrid;
