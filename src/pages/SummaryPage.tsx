import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { jsPDF } from "jspdf";
import { 
  Loader2, AlertTriangle, ArrowLeft, FileText, 
  Sparkles, Check, Copy, Download,
  Zap, ExternalLink, Calendar, Hash, Bot, ChevronRight
} from "lucide-react";
import ApiResponseViewer from "../components/ApiResponseViewer";
import DocumentPreview from "../components/DocumentPreview";

// --- Utility Components ---

const BackgroundGrid = () => (
  <div className="fixed inset-0 z-0 pointer-events-none select-none">
    {/* Subtle Grid Pattern */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
    {/* Radial Gradient for depth */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-20%,#115e5915,transparent)]" />
    <div className="absolute inset-0 bg-black/80" /> 
  </div>
);

const isValidMongoId = (id) => id && /^[0-9a-fA-F]{24}$/.test(id);

// --- Loading State ---
const LoadingAnimation = ({ progress }) => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-[60vh] z-10 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="relative w-24 h-24 mb-8">
         {/* Outer Glow */}
         <motion.div
            className="absolute inset-0 rounded-full bg-teal-500/20 blur-xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
         />
         {/* Spinner Rings */}
         <motion.div
            className="absolute inset-0 border-2 border-white/5 rounded-full"
         />
         <motion.div
            className="absolute inset-0 border-2 border-teal-400 rounded-full border-t-transparent border-l-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
         />
         
         {/* Center Icon */}
         <div className="absolute inset-0 flex items-center justify-center text-teal-400">
            <Bot size={32} />
         </div>
      </div>

      <div className="text-center space-y-2">
        <h3 className="text-xl font-medium text-white tracking-tight">
          Synthesizing Knowledge
        </h3>
        <div className="flex items-center justify-center gap-2 text-sm text-teal-400/80 font-mono">
          <span>{Math.round(progress)}% Processed</span>
          <span className="inline-block w-1.5 h-1.5 bg-current rounded-full animate-pulse" />
        </div>
        <p className="text-white/30 text-xs max-w-xs mx-auto mt-4">
          AI is analyzing document structure and extracting key concepts...
        </p>
      </div>
    </motion.div>
  );
};

// --- Toast Notification --- //@ts-ignore
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

// --- Main Component ---
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
  const [toast, setToast] = useState(null);

  // --- Logic: Progress Simulation ---
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
      // Add a stylish header to PDF
      doc.setFillColor(15, 23, 42); // Dark Slate
      doc.rect(0, 0, 210, 40, "F");
      
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.text("Smart Summary", 20, 25);
      
      doc.setFontSize(10);
      doc.setTextColor(200, 200, 200);
      doc.text(`Generated via UniConnect AI`, 150, 25);

      doc.setTextColor(0, 0, 0);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      const titleText = resourceTitle || "Resource Summary";
      doc.text(`Source: ${titleText}`, 20, 55);
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      const splitText = doc.splitTextToSize(summary, 170);
      doc.text(splitText, 20, 70);
      
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
    <div className="min-h-screen bg-black text-white font-sans selection:bg-teal-500/30 flex flex-col overflow-x-hidden">
       <BackgroundGrid />
       <AnimatePresence>{toast && <Toast {...toast} onClose={() => setToast(null)} />}</AnimatePresence>

       {/* Top Navigation Bar - Fixed & Blurred */}
       <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-white/10 bg-black/80 backdrop-blur-xl">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
            
            {/* Left: Back & Title */}
            <div className="flex items-center gap-4">
               <button 
                 onClick={() => navigate(-1)} 
                 className="p-2 hover:bg-white/10 rounded-full transition-all text-white/70 hover:text-white group"
                 aria-label="Go Back"
               >
                 <ArrowLeft className="group-hover:-translate-x-1 transition-transform" size={20} />
               </button>
               <div className="h-6 w-px bg-white/10 hidden sm:block" />
               <div className="hidden sm:flex items-center gap-2 text-sm font-medium text-white/50">
                  <span>AI Summary Generation</span>
               </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2">
               {!loading && summary && (
                 <>
                    <button 
                      onClick={handleCopy} 
                      className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                      title="Copy Text"
                    >
                       <Copy size={18} />
                    </button>
                 </>
               )}
            </div>
         </div>
       </header>

       {/* Main Content Area */}
       <main className="relative z-10 flex-1 pt-24 pb-20 px-4 sm:px-6 w-full">
         <div className="max-w-5xl mx-auto w-full">
            
            {loading ? (
               <div className="space-y-8">
                  <LoadingAnimation progress={loadingProgress} />
                  {/* Info Card for Scanned Docs - Shown during loading */}
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                     <div className="flex items-start gap-4 p-4  max-w-2xl mx-auto border-white">
                        <AlertTriangle size={20} className="mt-0.5 flex-shrink-0 " />
                        <div>
                           <h4 className="font-bold">Please Note</h4>
                           <p className="text-sm /80 mt-1">
                              AI summarization is not yet optimized for scanned or handwritten documents. For best results, please use resources with machine-readable text.
                           </p>
                        </div>
                     </div>
                  </motion.div>
               </div>
            ) : error ? (
               <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-8 bg-red-500/5 border border-red-500/20 rounded-2xl backdrop-blur-sm mt-10">
                  <div className="p-4 bg-red-500/10 rounded-full mb-4">
                    <AlertTriangle size={40} className="text-red-500" />
                  </div>
                  <h2 className="text-xl font-bold text-white mb-2">Generation Interrupted</h2>
                  <p className="text-white/50 mb-6 max-w-md">{error}</p>
                  <button 
                    onClick={() => window.location.reload()} 
                    className="px-6 py-2 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition text-sm uppercase tracking-wide"
                  >
                    Retry Generation
                  </button>
               </div>
            ) : (
               <motion.div 
                 initial={{ opacity: 0, y: 20 }} 
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.4 }}
                 className="space-y-8"
               >
                  {/* Metadata Dashboard Panel */}
                  <div className="bg-[#0F0F0F]/60 border border-white/10 rounded-xl p-6 backdrop-blur-md">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                        <div className="space-y-2">
                        
                           <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight max-w-2xl">
                             {resourceTitle || "Untitled Document"}
                           </h1>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button 
                              onClick={() => setShowPreview(true)}
                              className="flex items-center justify-center gap-2 px-3 py-5 bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 text-teal-400 hover:text-teal-300 rounded-lg transition-all text-xs font-bold uppercase tracking-wide group whitespace-nowrap"
                            >
                              <FileText size={16} />
                              <span>View Original</span>
                              <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                            </button>
                        </div>
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 border-t border-white/5 pt-6">
                        <StatItem icon={<Calendar size={14} />} label="Date" value={new Date().toLocaleDateString()} />
                        <StatItem icon={<Check size={14} />} label="Status" value="Verified" color="text-teal-400" />
                    </div>
                  </div>

                  {/* Summary Content Card */}
                  <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6 md:p-10 shadow-2xl min-h-[400px] relative overflow-hidden">
                        {/* Decorative Elements */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
                        
                        {/* Markdown Viewer */}
                        <div className="prose prose-invert max-w-none prose-headings:text-white prose-h1:text-3xl prose-h2:text-2xl prose-p:text-gray-300 prose-p:leading-7 prose-strong:text-teal-400 prose-li:text-gray-300 marker:text-teal-500/50 prose-pre:bg-[#111] prose-pre:border prose-pre:border-white/10">
                           <ApiResponseViewer text={summary} />
                        </div>
                  </div>

                  {/* Footer */}
                  <div className="flex justify-center py-8 opacity-50 hover:opacity-100 transition-opacity">
                    <div className="flex items-center gap-2 text-xs text-white/40 bg-white/5 px-4 py-2 rounded-full border border-white/5">
                      <span>Generated by UniConnect AI</span>
                    </div>
                  </div>

               </motion.div>
            )}
         </div>
       </main>

       {/* Document Preview Modal */}
       <DocumentPreview
         isOpen={showPreview} 
         onClose={() => setShowPreview(false)} 
         resourceLink={resourceLink} 
       />
    </div>
  );
};

// --- Helper Component for Stats ---
const StatItem = ({ icon, label, value, color = "text-white" }) => (
  <div className="flex items-center gap-3">
    <div className="p-2 bg-white/5 rounded-lg text-white/40">
      {icon}
    </div>
    <div>
      <p className="text-[10px] uppercase tracking-wider text-white/30 font-bold">{label}</p>
      <p className={`text-sm font-mono ${color}`}>{value}</p>
    </div>
  </div>
);

export default SummaryPage;
