import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  LoaderCircle, 
  AlertTriangle, 
  BookOpen,
  ChevronRight,
  GraduationCap,
  Hash
} from 'lucide-react';
import { resourcesData } from '@/data';
import ResourceCard from "../components/ResourceCard";

gsap.registerPlugin(ScrollTrigger);

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
  
  // Selection State
  const [selectedClass, setSelectedClass] = useState<ClassData | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<SubjectData | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

 
  useEffect(() => {
    const fetchResources = async () => {
      try {
        setLoading(true);
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
  
  useEffect(() => {
    if (classResources.length > 0 && !selectedClass) {
      const firstClass = classResources[0];
      setSelectedClass(firstClass);
      if (firstClass.subject.length > 0) {
        setSelectedSubject(firstClass.subject[2]);
      }
    }
  }, [classResources]);

  // Animation on selection change
  useGSAP(() => {
    if (contentRef.current && !loading) {
      gsap.fromTo(contentRef.current, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, { dependencies: [selectedSubject, loading] });

  // Navigation handlers
  const handleClassSelect = (cls: ClassData) => {
    setSelectedClass(cls);
    if (cls.subject.length > 0) {
      setSelectedSubject(cls.subject[0]);
    } else {
      setSelectedSubject(null);
    }
  };

  const handleSubjectSelect = (sub: SubjectData) => {
    setSelectedSubject(sub);
  };

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
        <div className="text-center mb-20 pt-10">
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
          <>
            {/* Class Header - Sticky */}
            {selectedClass && (
              <div className="sticky top-0 z-30 bg-black/80 backdrop-blur-xl border-y border-white/10 py-6 mb-16">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 max-w-[1300px] mx-auto px-4">
                  <div className="flex items-center gap-4">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                      {selectedClass.courseName}
                    </h2>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-white font-mono uppercase tracking-widest">
                    <span>Sem {selectedClass.semester}</span>
                    <span className="w-1 h-1 bg-white/20"></span>
                    <span>Sec {selectedClass.section}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Main Content */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
              
              {/* Quick Nav Sidebar */}
              <div className="lg:w-1/4 lg:sticky lg:top-32 lg:self-start">
                
                {/* Class Selection */}
                <div className="mb-8">
                  <p className="text-xs text-white/30 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    Classes
                  </p>
                  <div className="space-y-2">
                    {classResources.map((cls) => (
                      <button
                        key={cls._id}
                        onClick={() => handleClassSelect(cls)}
                        className={`w-full text-left px-4 py-3  text-sm transition-all border ${
                          selectedClass?._id === cls._id
                            ? 'bg-teal-500/20 text-teal-400 border-teal-500/30'
                            : 'text-white/50 hover:text-white hover:bg-white/10 border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{cls.courseName}</span>
                          {selectedClass?._id === cls._id && (
                            <ChevronRight className="w-4 h-4" />
                          )}
                        </div>
                        <span className="text-xs opacity-60">
                          Sem {cls.semester} • Sec {cls.section}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Subject Selection */}
                {selectedSubject && (
                  <div className="mt-10 pt-6 border-t border-white/10">
                    <div className="flex items-center gap-3 mb-4 text-teal-500/50">
                      <Hash className="w-5 h-5" />
                      <span className="font-mono text-sm">
                        {String((selectedClass?.subject.findIndex(s => s._id === selectedSubject._id) ?? 0) + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold uppercase tracking-wide text-white mb-3 leading-tight">
                      {selectedSubject.title}
                    </h3>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-[1px] bg-white/20"></div>
                      <p className="text-sm text-white/50 font-medium tracking-wider uppercase">
                        {selectedSubject.subjectTeacher}
                      </p>
                    </div>
                    <div className="mt-4 text-sm text-white/30">
                      {selectedSubject.resources.length} resources available
                    </div>
                  </div>
                )}
                {selectedClass && (
                  <div>
                    <p className="text-xs text-white/30 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Hash className="w-4 h-4" />
                      Subjects
                    </p>
                    <div className="space-y-1">
                      {selectedClass.subject.map((sub, idx) => (
                        <button
                          key={sub._id}
                          onClick={() => handleSubjectSelect(sub)}
                          className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all ${
                            selectedSubject?._id === sub._id
                              ? 'bg-teal-500/20 text-teal-400'
                              : 'text-white/40 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          <span className="font-mono text-xs mr-2 opacity-50">
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                          {sub.title}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
              </div>

              {/* Resources Grid */}
              <div ref={contentRef} className="w-full lg:w-3/4">
                {selectedSubject ? (
                  selectedSubject.resources.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-px border border-white/20">
                      {selectedSubject.resources.map((res) => (
                        <ResourceCard 
                          key={res._id} 
                          resource={res} 
                          classId={selectedClass!._id} 
                          subjectId={selectedSubject._id}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="w-full h-[300px] flex flex-col items-center justify-center border border-white/10 border-dashed rounded-lg bg-white/5">
                      <BookOpen className="w-12 h-12 text-white/20 mb-4" />
                      <p className="text-white/30 font-light">Pending uploads for {selectedSubject.title}</p>
                    </div>
                  )
                ) : (
                  <div className="w-full h-[300px] flex flex-col items-center justify-center border border-white/10 border-dashed rounded-lg bg-white/5">
                    <BookOpen className="w-12 h-12 text-white/20 mb-4" />
                    <p className="text-white/30 font-light">Select a subject to view resources</p>
                  </div>
                )}
              </div>

            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default SubjectPage;