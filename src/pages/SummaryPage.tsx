import React, { useEffect, useState, useCallback, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { jsPDF } from "jspdf";
import { 
  Loader2, AlertTriangle, ArrowLeft, FileText, 
  Sparkles, Check, Copy, Download,
  Zap, ExternalLink, Calendar, Hash, Bot, ChevronRight,
  Quote, ChevronLeft, PanelLeftClose, PanelLeft
} from "lucide-react";
import ApiResponseViewer from "../components/ApiResponseViewer";
import DocumentPreview from "../components/DocumentPreview";
import BackgroundGrid from "@/components/BackgroundGrid";
import LoadingAnimation from "./LoadingAnimation";
import StatItem from "@/components/StatIem";


const isValidMongoId = (id: string | null) => id && /^[0-9a-fA-F]{24}$/.test(id);


// @ts-ignore
const Toast = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);


  const isError = type === 'error';


  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      className="fixed top-24 right-0 left-0 mx-auto w-max z-50 pointer-events-none"
    >
      <div className="flex items-center gap-3 px-5 py-3 rounded-full bg-[#0f0f0f] border border-white/10 shadow-2xl shadow-teal-900/20 backdrop-blur-xl pointer-events-auto">
        <div className={`p-1 rounded-full ${isError ? 'bg-red-500/20 text-red-400' : 'bg-teal-500/20 text-teal-400'}`}>
          {isError ? <AlertTriangle size={14} /> : <Check size={14} />}
        </div>
        <span className="font-medium text-sm text-white/90">{message}</span>
      </div>
    </motion.div>
  );
};



const SummaryPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();


  const resourceId = searchParams.get("resourceId");
  const classId = searchParams.get("classId");
  const subjectId = searchParams.get("subjectId");
  const linkFromUrl = searchParams.get("link");


  const [summary, setSummary] = useState("");
  const [resourceTitle, setResourceTitle] = useState("");
  const [resourceLink, setResourceLink] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [toast, setToast] = useState<any>(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);


  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 95) return prev;
          return prev + Math.random() * 10;
        });
      }, 400);
      return () => clearInterval(interval);
    } else {
      setLoadingProgress(100);
    }
  }, [loading]);


  useEffect(() => {
    if (linkFromUrl) setResourceLink(decodeURIComponent(linkFromUrl));
  }, [linkFromUrl]);


  // --- Logic: API Fetch ---
  useEffect(() => {
    if (!isValidMongoId(resourceId) || !isValidMongoId(classId) || !isValidMongoId(subjectId)) {
      setError("Invalid Request Parameters.");
      setLoading(false);
      return;
    }


    const controller = new AbortController();


    const fetchSummary = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(
          `https://backend-uni-xb3p.onrender.com/api/v1/resource/gemini-summarize/${classId}/${subjectId}/${resourceId}`,
          { signal: controller.signal }
        );


        setSummary(response.data.summary);
        if (response.data.resource?.title) setResourceTitle(response.data.resource.title);
        
        setToast({ message: "Summary Generated Successfully", type: "success" });
      } catch (err) {
        if (axios.isCancel(err)) return;
        // @ts-ignore
        setError(err.response?.data?.message || "Failed to generate summary.");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };


    fetchSummary();
    return () => controller.abort();
  }, [resourceId, classId, subjectId]);


  // --- Logic: Handlers ---
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(summary);
    setToast({ message: "Content copied to clipboard", type: "success" });
  }, [summary]);


  const handleDownload = useCallback(() => {
    if (!summary) return;
    setIsDownloading(true);
    
    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20;
      const maxWidth = pageWidth - (margin * 2);
      
      // Add a stylish header to PDF
      doc.setFillColor(15, 23, 42); // Dark Slate
      doc.rect(0, 0, pageWidth, 40, "F");
      
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.text("Smart Summary", margin, 25);
      
      doc.setFontSize(10);
      doc.setTextColor(200, 200, 200);
      doc.text(`Generated via UniConnect AI`, pageWidth - margin - 60, 25);


      doc.setTextColor(0, 0, 0);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      const titleText = resourceTitle || "Resource Summary";
      doc.text(`Source: ${titleText}`, margin, 55);
      
      // Start position for content
      let yPosition = 70;
      const lineHeight = 7;
      const bottomMargin = 20;
      const maxY = pageHeight - bottomMargin;
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      
      // Split text into lines that fit the page width
      const splitText = doc.splitTextToSize(summary, maxWidth);
      
      // Add text line by line, creating new pages when needed
      splitText.forEach((line: string) => {
        // Check if we need a new page
        if (yPosition + lineHeight > maxY) {
          doc.addPage();
          yPosition = margin; // Reset to top of new page
        }
        
        doc.text(line, margin, yPosition);
        yPosition += lineHeight;
      });
      
      doc.save(`${(resourceTitle || "summary").substring(0, 20)}_summary.pdf`);
      setToast({ message: "PDF Downloaded successfully", type: "success" });
    } catch (e) {
      setToast({ message: "Download failed", type: "error" });
    } finally {
      setIsDownloading(false);
    }
  }, [summary, resourceTitle]);


  // --- Render ---
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-teal-500/30 flex flex-col">
       <BackgroundGrid />
       <AnimatePresence>{toast && <Toast {...toast} onClose={() => setToast(null)} />}</AnimatePresence>


       {/* Top Navigation Bar - Minimalist */}
       <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-white/5 bg-black/50 backdrop-blur-xl">
         <div className="max-w-[1600px] mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
           
           {/* Left: Back */}
           <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate(-1)} 
                className="p-2 hover:bg-white/10 rounded-full transition-all text-white/70 hover:text-white group flex items-center gap-2"
                aria-label="Go Back"
              >
                <ArrowLeft className="group-hover:-translate-x-1 transition-transform" size={18} />
                <span className="text-sm font-medium hidden sm:block">Back to Resources</span>
              </button>
           </div>
         </div>
       </header>


       {/* Main Content Area */}
       <main className="relative z-10 flex-1 pt-28 pb-20 px-4 sm:px-6 w-full max-w-[1600px] mx-auto">
         
          {loading ? (
             <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
                <LoadingAnimation progress={loadingProgress} />
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                  className="flex items-center gap-3 px-6 py-3 bg-white/5 rounded-lg border border-white/5 max-w-md"
                >
                   <AlertTriangle size={18} className="text-white/50" />
                   <p className="text-sm text-white/50">
                      Optimized only for text-based documents. Handwritten and scanned docs are not available yet.
                   </p>
                </motion.div>
             </div>
          ) : error ? (
             <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-8 border border-red-500/20 rounded-2xl bg-red-900/5 mt-10">
                <AlertTriangle size={40} className="text-red-500 mb-4" />
                <h2 className="text-xl font-bold text-white mb-2">Generation Interrupted</h2>
                <p className="text-white/50 mb-8 max-w-md">{error}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition text-sm uppercase tracking-wide"
                >
                  Retry Generation
                </button>
             </div>
          ) : (
             <motion.div 
               initial={{ opacity: 0, y: 20 }} 
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.4 }}
               className={`grid gap-12 items-start transition-all duration-300 ${
                 isSidebarVisible ? 'grid-cols-1 lg:grid-cols-[380px_1fr]' : 'grid-cols-1'
               }`}
             >
               
               {/* LEFT COLUMN: Sticky Metadata & Actions */}
               <AnimatePresence>
                 {isSidebarVisible && (
                   <motion.div 
                     initial={{ opacity: 0, x: -50 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, x: -50 }}
                     transition={{ duration: 0.3 }}
                     className="lg:sticky lg:top-32 space-y-8"
                   >
                     
                     {/* Title Card */}
                     <div className="space-y-6">
                        <div className="space-y-2">
                           <div className="text-teal-500 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                              <Quote size={12} className="rotate-180" />
                              Source Material
                           </div>
                           <h1 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
                             {resourceTitle || "Untitled Document"}
                           </h1>
                        </div>
                        
                        {/* Action Grid */}
                        <div className="grid grid-cols-1 gap-3">
                           <button 
                             onClick={() => setShowPreview(true)}
                             className="flex items-center justify-between px-5 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 text-white transition-all group w-full"
                           >
                             <div className="flex items-center gap-3">
                                <div className="p-2 bg-teal-500/20 rounded-lg text-teal-400">
                                   <FileText size={18} />
                                </div>
                                <div className="text-left">
                                   <p className="text-xs text-white/40 uppercase font-bold">Reference</p>
                                   <p className="text-sm font-medium">View Original File</p>
                                </div>
                             </div>
                             <ExternalLink size={16} className="opacity-50 group-hover:opacity-100 transition-opacity" />
                           </button>
                        </div>


                        {/* Secondary Actions */}
                        <div className="grid grid-cols-2 gap-3">
                           <button 
                             onClick={handleCopy}
                             className="flex flex-col items-center justify-center gap-2 p-4 bg-black border border-white/10  hover:border-teal-500/50 hover:text-teal-400 transition-all group"
                           >
                              <Copy size={20} className="text-white/50 group-hover:text-teal-400 mb-1" />
                              <span className="text-xs font-bold uppercase tracking-wide">Copy Text</span>
                           </button>
                           <button 
                             onClick={handleDownload}
                             disabled={isDownloading}
                             className="flex flex-col items-center justify-center gap-2 p-4 bg-black border border-white/10  hover:border-teal-500/50 hover:text-teal-400 transition-all group disabled:opacity-50"
                           >
                              {isDownloading ? <Loader2 size={20} className="animate-spin text-white/50" /> : <Download size={20} className="text-white/50 group-hover:text-teal-400 mb-1" />}
                              <span className="text-xs font-bold uppercase tracking-wide">Save PDF</span>
                           </button>
                        </div>
                     </div>


                     {/* Stats */}
                     <div className="pt-8 border-t border-white/10">
                        <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                           <StatItem icon={<Calendar size={14} />} label="Generated" value={new Date().toLocaleDateString()} />
                           <StatItem icon={<Bot size={14} />} label="ResourceID" value={resourceId.slice(0,7)} color="text-teal-400" />
                           <StatItem icon={<Hash size={14} />} label="Words" value={`${summary.split(' ').length} words`} />
                           <StatItem icon={<Check size={14} />} label="Status" value="Completed" color="text-green-400" />
                        </div>
                     </div>


                   </motion.div>
                 )}
               </AnimatePresence>


               {/* RIGHT COLUMN: Scrollable Summary Content */}
               <div className="relative min-h-[500px]">
                  {/* Toggle Button */}
                  <motion.button
                    onClick={() => setIsSidebarVisible(!isSidebarVisible)}
                    className="absolute -top-12 left-0 z-10 flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-teal-500/50 rounded-lg transition-all group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSidebarVisible ? (
                      <>
                        <PanelLeftClose size={16} className="text-white/50 group-hover:text-teal-400" />
                        <span className="text-xs font-medium text-white/70 group-hover:text-white">Hide Panel</span>
                      </>
                    ) : (
                      <>
                        <PanelLeft size={16} className="text-white/50 group-hover:text-teal-400" />
                        <span className="text-xs font-medium text-white/70 group-hover:text-white">Show Panel</span>
                      </>
                    )}
                  </motion.button>

                  <div className="absolute -inset-1 bg-gradient-to-b from-teal-500/20 to-transparent rounded-2xl blur-xl opacity-20" />
                  
                  <div className="relative bg-[#0A0A0A] border border-white/10  p-8 md:p-12 overflow-hidden">
                     {/* Top Label */}
                     <div className="mb-8 pb-6 border-b border-white/5 flex items-center justify-between">
                        <span className="text-xs font-mono text-white/30 uppercase tracking-widest">AI Generated Summary</span>
                     </div>


                     {/* Markdown Content */}
                     <div className="prose prose-invert max-w-none 
                        prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight
                        prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
                        prose-p:text-gray-300 prose-p:leading-8 prose-p:text-[1.05rem]
                        prose-strong:text-teal-400 prose-strong:font-semibold
                        prose-ul:my-6 prose-li:text-gray-300 prose-li:marker:text-teal-500
                        prose-blockquote:border-l-teal-500 prose-blockquote:bg-white/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:not-italic
                        prose-pre:bg-[#111] prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl
                     ">
                        <ApiResponseViewer text={summary} />
                     </div>


                     {/* Bottom Decoration */}
                     <div className="mt-12 pt-6 border-t border-white/5 flex justify-center">
                        <div className="text-[10px] font-mono text-white/20">END OF SUMMARY</div>
                     </div>
                  </div>
               </div>


             </motion.div>
          )}
       </main>


       <DocumentPreview
         isOpen={showPreview} 
         onClose={() => setShowPreview(false)} 
         resourceLink={resourceLink} 
       />
    </div>
  );
};


export default SummaryPage;
