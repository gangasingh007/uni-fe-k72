import { Resource } from "@/pages/Subject";
import { FileText, Sparkles, Youtube } from "lucide-react";
import { useNavigate } from "react-router-dom";

// --- Resource Card Component (Design & Animation Preserved) ---
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
        <div className="relative border border-white/10 z-10 h-full p-8 md:p-10 flex flex-col justify-between">
          
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
            <h4 className="text-2xl md:text-3xl font-bold uppercase leading-none mb-3 text-white line-clamp-2">
              {resource.title}
            </h4>
            <p className="text-white/50 group-hover:text-white/80 text-xs md:text-sm font-medium transition-colors duration-300 tracking-wider">
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
                  className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 delay-75 flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-wider bg-white text-black px-4 py-2 rounded-full hover:bg-teal-400"
                >
                  <Sparkles className="w-3 h-3" />
                  Summary
                </button>
              )}
            </div>
  
            {/* Circular Indicator */}
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-500">
              <div className="w-1 h-1 bg-white rounded-full group-hover:bg-black transition-colors duration-500" />
            </div>
          </div>
        </div>
      </a>
    );
  };

export default ResourceCard