import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Youtube, 
  LoaderCircle, 
  AlertTriangle, 
  LayoutGrid,
  BookOpen,
  Sparkles
} from 'lucide-react';


gsap.registerPlugin(ScrollTrigger, SplitText);


interface Resource {
  _id: string;
  title: string;
  link: string;
  type: 'document' | 'ytlink' | string; 
  createdAt: string;
}

interface SubjectData {
  _id: string;
  title: string;
  subjectTeacher: string;
  resources: Resource[];
}

interface ClassData {
  _id: string;
  courseName: string;
  section: string;
  semester: string;
  subject: SubjectData[];
}

const SubjectPage = () => {
  // --- State ---
  const [classResources, setClassResources] = useState<ClassData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);

  // --- Data Fetching ---
  useEffect(() => {
    const fetchResources = async () => {
      try {
        setLoading(true);
        const response = await axios.get<{ data: ClassData[] }>('https://backend-uni-xb3p.onrender.com/api/v1/resource/all');
        const resources = response.data?.data;
        setClassResources(Array.isArray(resources) ? resources : []);
        setError(null);
      } catch (err) {
        setError('Failed to fetch resources. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  // --- GSAP Animations ---
  useGSAP(() => {
    const title = document.querySelector('.main-title');
    if (title) {
      gsap.from(title, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power3.out'
      });
    }

    const sections = gsap.utils.toArray<HTMLElement>('.subject-section');
    sections.forEach((section) => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 40,
        duration: 0.6,
        ease: 'power2.out'
      });
    });
  }, { dependencies: [classResources], scope: containerRef });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black text-white">
        <LoaderCircle className="w-12 h-12 animate-spin text-teal-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-black text-red-500">
        <AlertTriangle className="w-12 h-12 mb-4" />
        <p className="text-xl font-medium">{error}</p>
      </div>
    );
  }

  return (
    <main ref={containerRef} className="min-h-screen mt-[40px] bg-black text-white selection:bg-teal-500/30">
      <div className="container mx-auto px-4 sm:px-6 py-20 max-w-7xl">
        {/* Page Header */}
        <div className="text-center mb-24 main-title">
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-white">
            Learning <span className='text-teal-500'>Resources</span>
          </h1>
          <p className="text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
            Curated study materials, video lectures, and documentation tailored for your semester success.
          </p>
        </div>

        {!classResources || classResources.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 border border-dashed border-white/20 rounded-2xl bg-white/5">
            <BookOpen className="w-12 h-12 text-white/30 mb-4" />
            <p className="text-white/50 text-xl font-medium">No resources found available yet.</p>
          </div>
        ) : (
          <div className="space-y-32">
            {classResources.map((cls) => (
              <div key={cls._id}>
                {/* Class Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-white/10 pb-6">
                  <div>
                    <h2 className="text-4xl font-bold tracking-tight text-white">{cls.courseName}</h2>
                    <p className="text-white/50 mt-2 text-lg">Semester {cls.semester} • Section {cls.section}</p>
                  </div>
                </div>

                {/* Subjects Loop */}
                <div className="space-y-20">
                  {cls.subject.map((sub) => (
                    <div key={sub._id} className="subject-section"> 
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-1.5 h-8 bg-teal-500" />
                        <div>
                          <h3 className="text-2xl font-bold uppercase tracking-wide text-white">{sub.title}</h3>
                          <p className="text-sm text-white/50">Instructor: {sub.subjectTeacher}</p>
                        </div>
                      </div>

                      {/* Resources Grid */}
                      {sub.resources.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px border border-white/20">
                          {sub.resources.map((res) => (
                            <ResourceCard 
                              key={res._id} 
                              resource={res} 
                              classId={cls._id}     // Passed down for API
                              subjectId={sub._id}   // Passed down for API
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="p-12 bg-white/5 border border-white/10 text-center">
                          <p className="text-white/40 italic">No resources uploaded for this subject yet.</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

// --- Resource Card Component ---
interface ResourceCardProps {
  resource: Resource;
  classId: string;
  subjectId: string;
}

const ResourceCard = ({ resource, classId, subjectId }: ResourceCardProps) => {
  const navigate = useNavigate();
  const isVideo = resource.type === 'ytlink' || resource.link.includes('youtube') || resource.link.includes('youtu.be');
  
  const handleSummarize = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Navigate to SummaryPage with query parameters
    navigate(`/summary?classId=${classId}&subjectId=${subjectId}&resourceId=${resource._id}&link=${encodeURIComponent(resource.link)}`);
  };

  return (
    <a
      href={resource.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block w-full bg-black h-[320px] overflow-hidden hover:z-10 transition-all duration-500"
    >
      {/* Hover Background Fill */}
      <div 
        className={`absolute inset-0 h-0 w-full transition-[height] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:h-full ${
          isVideo ? 'bg-[#3d1a1a]' : 'bg-[#0f2e26]' 
        }`} 
      />

      {/* Content Layout */}
      <div className="relative border border-white/20 z-10 h-full p-10 flex flex-col justify-between">
        
        {/* Top: Icon */}
        <div className={`transition-colors duration-300 ${
          isVideo ? 'text-red-500 group-hover:text-white' : 'text-white group-hover:text-white'
        }`}>
          {isVideo ? (
            <Youtube className="w-10 h-10" strokeWidth={1.5} />
          ) : (
            <FileText className="w-10 h-10" strokeWidth={1.5} />
          )}
        </div>

        {/* Middle: Typography */}
        <div className="mt-auto mb-6">
          <h4 className="text-3xl font-bold uppercase leading-none mb-3 text-white line-clamp-2">
            {resource.title}
          </h4>
          <p className="text-white/50 group-hover:text-white/80 text-sm font-medium transition-colors duration-300">
            {isVideo ? 'Watch Lecture' : 'View Document'}
          </p>
        </div>

        {/* Bottom Right: Action Area */}
        <div className="flex items-end justify-between w-full">
          {/* AI Button - Only for Documents */}
          <div className="h-10">
            {!isVideo && (
              <button
                onClick={handleSummarize}
                className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 delay-75 flex items-center gap-2 text-xs font-bold uppercase tracking-wider bg-white text-black px-4 py-2 rounded-full hover:bg-teal-400"
              >
                <Sparkles className="w-3 h-3" />
                Generate AI Summary
              </button>
            )}
          </div>

          {/* Circular Indicator */}
          <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-500">
            <div className="w-1 h-1 bg-white rounded-full group-hover:bg-black transition-colors duration-500" />
          </div>
        </div>
      </div>
    </a>
  );
};

export default SubjectPage;
