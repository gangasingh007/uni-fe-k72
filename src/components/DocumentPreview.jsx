import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, ExternalLink, LoaderCircle, FileText } from "lucide-react";

const DocumentPreview = ({ isOpen, onClose, resourceLink }) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen && resourceLink) {
      setIsLoading(true);
      // Convert Google Drive view links to preview links
      const match = resourceLink.match(/\/d\/([a-zA-Z0-9_-]+)/);
      const url = match ? `https://drive.google.com/file/d/${match[1]}/preview` : resourceLink;
      setPreviewUrl(url);
    }
  }, [isOpen, resourceLink]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
          />

          {/* Sliding Pane */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full lg:w-[60vw] max-w-4xl bg-[#0a0a0a] border-l border-white/10 z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-black">
               <div className="flex items-center gap-3">
                  <FileText className="text-teal-500" size={20} />
                  <h2 className="font-bold uppercase tracking-wider text-white text-sm">Document Preview</h2>
               </div>
               <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition text-white/50 hover:text-white">
                  <X size={20} />
               </button>
            </div>

            {/* Content */}
            <div className="flex-1 relative bg-[#111]">
               {isLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white/30">
                     <LoaderCircle size={40} className="animate-spin mb-4 text-teal-500" />
                     <p className="uppercase tracking-widest text-xs">Loading Document...</p>
                  </div>
               )}
               <iframe 
                  src={previewUrl}
                  className="w-full h-full border-none"
                  onLoad={() => setIsLoading(false)}
                  title="Preview"
               />
            </div>

            {/* Footer */}
            <div className="h-16 border-t border-white/10 bg-black flex items-center justify-end gap-3 px-6">
               <a 
                  href={resourceLink} 
                  target="_blank"
                  className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider border border-white/20 hover:bg-white hover:text-black transition rounded"
               >
                  <ExternalLink size={14} /> Open Externally
               </a>
               <a 
                  href={previewUrl} // Note: Direct download often blocked by CORS, sticking to open/view
                  target="_blank"
                  className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider bg-teal-600 hover:bg-teal-500 text-black transition rounded"
               >
                  <Download size={14} /> Download
               </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DocumentPreview;
