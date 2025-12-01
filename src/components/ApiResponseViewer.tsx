import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check, Terminal, Info } from "lucide-react";
import { motion } from "framer-motion";

const ApiResponseViewer = ({ text }: { text: string }) => {
  
  const CustomCode = ({ inline, className, children, ...props }: any) => {
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
        <div className="my-8  overflow-hidden border border-white/10 bg-[#0D0D0D] shadow-2xl group">
           {/* Mac-like Terminal Header */}
           <div className="flex justify-between items-center px-4 py-3 bg-white/5 border-b border-white/5">
              <div className="flex items-center gap-0.5">
                 <div className="flex gap-1 text-white/20 text-xs">
                    {`>_`}
                 </div>
                 <span className="ml-3 text-xs text-white/30 font-mono lowercase">
                    {match[1]}
                 </span>
              </div>
              <button 
                onClick={handleCopy} 
                className="flex items-center gap-2 px-2 py-1 rounded hover:bg-white/10 transition-colors text-white/40 hover:text-white"
                aria-label="Copy code"
              >
                 <span className="text-[10px] font-bold uppercase tracking-wider">{copied ? 'Copied' : 'Copy'}</span>
                 {copied ? <Check size={12} className="text-teal-400" /> : <Copy size={12} />}
              </button>
           </div>
           
           <div className="relative">
             <SyntaxHighlighter
               style={vscDarkPlus}
               language={match[1]}
               PreTag="div"
               showLineNumbers={true}
               lineNumberStyle={{ minWidth: '2.5em', paddingRight: '1em', color: '#444', textAlign: 'right' }}
               customStyle={{ margin: 0, padding: '1.5rem', background: 'transparent', fontSize: '0.9rem', lineHeight: '1.5' }}
               {...props}
             >
               {codeString}
             </SyntaxHighlighter>
           </div>
        </div>
      );
    }

    return (
      <code className="bg-white/10 text-teal-300 px-1.5 py-0.5 rounded-md text-[0.9em] font-mono border border-white/5" {...props}>
        {children}
      </code>
    );
  };

  const components = {
    code: CustomCode,

    h1: ({children}: any) => (
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 mt-10 pb-4 border-b border-white/10 leading-tight">
        {children}
      </h1>
    ),
    h2: ({children}: any) => (
      <h2 className="text-2xl md:text-3xl font-bold text-white mt-12 mb-6 flex items-center gap-3">
        <span className="flex h-6 w-1 bg-teal-500 rounded-full" />
        {children}
      </h2>
    ),
    h3: ({children}: any) => (
      <h3 className="text-xl font-semibold text-white/90 mt-8 mb-4">
        {children}
      </h3>
    ),
    
    // Content Elements
    p: ({children}: any) => (
      <p className="mb-6 text-lg leading-8 text-gray-300 font-light">
        {children}
      </p>
    ),
    ul: ({children}: any) => (
      <ul className="space-y-3 mb-8 pl-2">
        {React.Children.map(children, (child) => {
          // Custom logic to render custom bullets (handled in li)
          return child;
        })}
      </ul>
    ),
    ol: ({children}: any) => (
      <ol className="list-decimal pl-6 space-y-3 mb-8 text-gray-300 marker:text-teal-500 marker:font-bold">
        {children}
      </ol>
    ),
    li: ({children}: any) => (
      <li className="flex gap-3 text-gray-300 leading-7">
        <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-teal-500 flex-shrink-0 block" />
        <div>{children}</div>
      </li>
    ),

    blockquote: ({children}: any) => (
      <div className="my-8 pl-6 pr-6 py-4 bg-teal-500/5 border-l-2 border-teal-500 rounded-r-xl flex gap-4">
        <Info className="w-6 h-6 text-teal-500 flex-shrink-0 mt-1" />
        <div className="text-gray-300 italic">{children}</div>
      </div>
    ),
    a: ({href, children}: any) => (
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-teal-400 hover:text-teal-300 border-b border-teal-500/30 hover:border-teal-500 transition-colors pb-0.5 font-medium"
      >
        {children}
      </a>
    ),
    strong: ({children}: any) => (
      <strong className="text-white font-semibold">
        {children}
      </strong>
    ),
    
    // Data Tables
    table: ({children}: any) => (
      <div className="overflow-x-auto my-10  border border-white/10">
        <table className="w-full border-collapse text-sm text-left">
          {children}
        </table>
      </div>
    ),
    thead: ({children}: any) => (
      <thead className="bg-white/5 text-white uppercase tracking-wider font-bold">
        {children}
      </thead>
    ),
    th: ({children}: any) => (
      <th className="px-6 py-4 border-b border-white/10 whitespace-nowrap">
        {children}
      </th>
    ),
    tr: ({children}: any) => (
      <tr className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors odd:bg-white/[0.02]">
        {children}
      </tr>
    ),
    td: ({children}: any) => (
      <td className="px-6 py-4 text-gray-400">
        {children}
      </td>
    ),
    hr: () => <hr className="my-12 border-white/10" />,
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-none"
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        // @ts-ignore
        components={components}
      >
        {text}
      </ReactMarkdown>
    </motion.div>
  );
};

export default ApiResponseViewer;
