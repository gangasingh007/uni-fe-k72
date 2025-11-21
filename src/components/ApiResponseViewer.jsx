import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check, Terminal } from "lucide-react";
import { motion } from "framer-motion";

const ApiResponseViewer = ({ text }) => {
  // Simplified typewriter for stability
  const [displayedText, setDisplayedText] = useState("");
  
  useEffect(() => {
    if (text) {
      let i = 0;
      const timer = setInterval(() => {
        setDisplayedText(text.slice(0, i));
        i += 5; // Speed
        if (i > text.length) {
            setDisplayedText(text);
            clearInterval(timer);
        }
      }, 1); // Ultra-fast typewriter
      return () => clearInterval(timer);
    }
  }, [text]);

  // --- Custom Components ---
  
  const CustomCode = ({ inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || '');
    const [copied, setCopied] = useState(false);
    const codeString = String(children).replace(/\n$/, '');

    const handleCopy = () => {
       navigator.clipboard.writeText(codeString);
       setCopied(true);
       setTimeout(() => setCopied(false), 2000);
    };

    if (!inline && match) {
      return (
        <div className="my-8 border border-white/10 bg-[#111] rounded-none overflow-hidden relative group">
           <div className="flex justify-between items-center px-4 py-2 bg-white/5 border-b border-white/5">
              <div className="flex items-center gap-2 text-xs text-white/40 uppercase tracking-wider font-mono">
                 <Terminal size={12} />
                 {match[1]}
              </div>
              <button onClick={handleCopy} className="text-white/40 hover:text-white transition">
                 {copied ? <Check size={14} className="text-teal-500" /> : <Copy size={14} />}
              </button>
           </div>
           <SyntaxHighlighter
             style={vscDarkPlus}
             language={match[1]}
             PreTag="div"
             customStyle={{ margin: 0, padding: '1.5rem', background: 'transparent' }}
             {...props}
           >
             {codeString}
           </SyntaxHighlighter>
        </div>
      );
    }
    return <code className="bg-white/10 text-teal-300 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>{children}</code>;
  };

  return (
    <div className="w-full text-gray-300 leading-relaxed">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code: CustomCode,
          h1: ({children}) => <h1 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-tight mb-6 mt-8 border-b border-white/10 pb-4">{children}</h1>,
          h2: ({children}) => <h2 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-tight mb-4 mt-8 flex items-center gap-2"><span className="w-2 h-8 bg-teal-500 inline-block"/>{children}</h2>,
          h3: ({children}) => <h3 className="text-xl font-bold text-teal-500 mb-3 mt-6 uppercase tracking-wide">{children}</h3>,
          p: ({children}) => <p className="mb-4 text-lg leading-8 text-gray-300">{children}</p>,
          ul: ({children}) => <ul className="list-disc pl-6 space-y-2 mb-6 text-gray-300 marker:text-teal-500">{children}</ul>,
          ol: ({children}) => <ol className="list-decimal pl-6 space-y-2 mb-6 text-gray-300 marker:text-teal-500 font-mono">{children}</ol>,
          blockquote: ({children}) => <blockquote className="border-l-4 border-teal-500 pl-6 py-2 my-6 bg-white/5 italic text-gray-400">{children}</blockquote>,
          a: ({href, children}) => <a href={href} target="_blank" className="text-teal-500 hover:text-teal-400 underline underline-offset-4 decoration-teal-500/30 hover:decoration-teal-500 transition">{children}</a>,
          strong: ({children}) => <strong className="text-white font-bold">{children}</strong>,
          table: ({children}) => <div className="overflow-x-auto my-8"><table className="w-full border-collapse border border-white/10 text-sm">{children}</table></div>,
          th: ({children}) => <th className="border border-white/10 bg-white/5 p-3 text-left uppercase tracking-wider font-bold text-white">{children}</th>,
          td: ({children}) => <td className="border border-white/10 p-3 text-gray-400">{children}</td>,
        }}
      >
        {displayedText}
      </ReactMarkdown>
    </div>
  );
};

export default ApiResponseViewer;
