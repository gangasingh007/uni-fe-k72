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
  BookOpen,
  Sparkles,
  Hash
} from 'lucide-react';
import { resourcesData } from '@/data';
import ResourceCard from "../components/ResourceCard"

gsap.registerPlugin(ScrollTrigger, SplitText);

export interface Resource {
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
  const [classResources, setClassResources] = useState<ClassData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // --- Data Fetching ---
  useEffect(() => {
    const fetchResources = async () => {
      try {
        setLoading(true);
        // add the artificial delay of 4 seconds
        await new Promise(resolve => setTimeout(resolve, 2000));
        setClassResources(resourcesData.data);
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
    <main ref={containerRef} className="min-h-screen bg-black text-white selection:bg-teal-500/30">
      <div className="container mx-auto px-4 sm:px-6 py-20 max-w-[1400px]">
        
        {/* Page Header */}
        <div className="text-center mb-32 main-title pt-10">
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 text-white">
            Learning <span className='text-teal-500'>Hub</span>
          </h1>
          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed font-light">
            Curated study materials, video lectures, and documentation tailored for your semester success.
          </p>
        </div>

        {!classResources || classResources.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 border border-dashed border-white/10 rounded-3xl bg-white/5">
            <BookOpen className="w-16 h-16 text-white/20 mb-6" />
            <p className="text-white/40 text-2xl font-light">No resources available yet.</p>
          </div>
        ) : (
          <div className="space-y-40"> {/* Increased spacing between major classes */}
            {classResources.map((cls) => (
              <section key={cls._id} className="relative">
                
                {/* Class Header - Now Sticky for Better UX Context */}
                <div className="sticky top-0 z-30 bg-black/80 backdrop-blur-xl border-y border-white/10 py-6 mb-16">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 max-w-[1300px] mx-auto px-4">
                    <div className="flex items-center gap-4">
                      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                        {cls.courseName}
                      </h2>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-white font-mono uppercase tracking-widest">
                       <span>Sem {cls.semester}</span>
                       <span className="w-1 h-1 bg-white/20 rounded-full"></span>
                       <span>Sec {cls.section}</span>
                    </div>
                  </div>
                </div>

                {/* Subjects Loop */}
                <div className="space-y-24 px-2 md:px-4">
                  {cls.subject.map((sub, index) => (
                    <div key={sub._id} className="subject-section group/subject">
                      {/* 
                         UX IMPROVEMENT: 
                         Desktop: Sidebar Layout (Left Title, Right Content)
                         Mobile: Stacked Layout
                      */}
                      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
                        
                        {/* Subject Sidebar Info */}
                        <div className="lg:w-1/4 lg:sticky lg:top-32 pt-2">
                          <div className="flex items-center gap-3 mb-4 text-teal-500/50">
                            <Hash className="w-5 h-5" />
                            <span className="font-mono text-sm">0{index + 1}</span>
                          </div>
                          <h3 className="text-3xl md:text-4xl font-bold uppercase tracking-wide text-white mb-4 leading-none">
                            {sub.title}
                          </h3>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-[1px] bg-white/20"></div>
                            <p className="text-sm text-white/50 font-medium tracking-wider uppercase">
                              {sub.subjectTeacher}
                            </p>
                          </div>
                        </div>

                        {/* Resources Grid - Occupies remaining width */}
                        <div className="w-full lg:w-3/4">
                          {sub.resources.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-px border border-white/20">
                              {sub.resources.map((res) => (
                                <ResourceCard 
                                  key={res._id} 
                                  resource={res} 
                                  classId={cls._id} 
                                  subjectId={sub._id}
                                />
                              ))}
                            </div>
                          ) : (
                            <div className="w-full h-[200px] flex flex-col items-center justify-center border border-white/10 border-dashed rounded-lg bg-white/5">
                              <p className="text-white/30 font-light">Pending uploads for {sub.title}</p>
                            </div>
                          )}
                        </div>

                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default SubjectPage;