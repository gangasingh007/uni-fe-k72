import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Server, Database, BrainCircuit, Globe, 
  Zap, Layers, ArrowRight, Cpu, Network,
  Lock, LayoutGrid
} from 'lucide-react';

// --- Styled Components ---

const BackgroundGrid = () => (
  <div className="fixed inset-0 z-0 pointer-events-none select-none">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px]" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,#115e5920,transparent)]" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_80%_20%,#3b82f615,transparent)]" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_20%_80%,#a855f710,transparent)]" />
    <div className="absolute inset-0 bg-[#050505]" />
    
    {/* Floating particles */}
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-white/20 rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, -30, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 3 + Math.random() * 2,
          repeat: Infinity,
          delay: Math.random() * 2,
        }}
      />
    ))}
  </div>
);

const TechPill = ({ children }: { children: React.ReactNode }) => (
  <span className="px-2.5 py-1 text-[10px] font-mono bg-white/5 text-white/70 rounded-md border border-white/10 whitespace-nowrap hover:bg-white/10 hover:text-white hover:border-white/30 hover:shadow-[0_0_20px_-5px_rgba(255,255,255,0.1)] transition-all duration-300 cursor-default">
    {children}
  </span>
);

// --- Flowchart Nodes ---

const NodeCard = ({ icon, title, subTitle, techs, color = "teal", delay = 0 }: any) => {
  const colorStyles: Record<string, string> = {
    teal: "text-teal-400 shadow-[0_0_40px_-10px_rgba(45,212,191,0.3)] border-teal-500/30 hover:shadow-[0_0_60px_-10px_rgba(45,212,191,0.5)]",
    blue: "text-blue-400 shadow-[0_0_40px_-10px_rgba(96,165,250,0.3)] border-blue-500/30 hover:shadow-[0_0_60px_-10px_rgba(96,165,250,0.5)]",
    orange: "text-orange-400 shadow-[0_0_40px_-10px_rgba(251,146,60,0.3)] border-orange-500/30 hover:shadow-[0_0_60px_-10px_rgba(251,146,60,0.5)]",
    purple: "text-purple-400 shadow-[0_0_40px_-10px_rgba(192,132,252,0.3)] border-purple-500/30 hover:shadow-[0_0_60px_-10px_rgba(192,132,252,0.5)]",
    red: "text-red-400 shadow-[0_0_40px_-10px_rgba(248,113,113,0.3)] border-red-500/30 hover:shadow-[0_0_60px_-10px_rgba(248,113,113,0.5)]",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, type: "spring", stiffness: 100 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className={`relative z-20 w-[300px] h-[240px] flex flex-col bg-gradient-to-br from-[#0A0A0A] to-[#0F0F0F] border border-white/10 rounded-2xl p-6 transition-all duration-300 group ${colorStyles[color]}`}
    >
      {/* Glowing Border Effect on Hover */}
      <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none`} />

      {/* Animated corner accents */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white/20 rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/20 rounded-br-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <motion.div 
          className={`p-3 rounded-xl bg-white/5 border border-white/10 ${colorStyles[color].split(' ')[0]}`}
          whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
        >
          {icon}
        </motion.div>
        <div className="p-2 rounded-full bg-white/5 border border-white/10">
           <div className={`w-2 h-2 rounded-full ${colorStyles[color].split(' ')[0].replace('text', 'bg')} animate-pulse`} />
        </div>
      </div>
      
      {/* Content */}
      <div className="mt-auto">
        <h3 className="font-bold text-white text-xl leading-tight mb-1.5">{title}</h3>
        <p className="text-[10px] text-white/50 font-medium uppercase tracking-widest mb-4">{subTitle}</p>
        
        <div className="flex flex-wrap gap-2">
          {techs.map((t: string) => <TechPill key={t}>{t}</TechPill>)}
        </div>
      </div>

      {/* Connector Nodes (Visual only) */}
      <motion.div 
        className="absolute top-1/2 -left-2 w-4 h-4 bg-[#0A0A0A] border-2 border-white/30 rounded-full"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.div 
        className="absolute top-1/2 -right-2 w-4 h-4 bg-[#0A0A0A] border-2 border-white/30 rounded-full"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
      />
    </motion.div>
  );
};

// --- Horizontal Connectors ---

const HorizontalPath = ({ width = "w-24", delay = 0 }) => (
  <div className={`relative h-0.5 ${width} bg-gradient-to-r from-white/5 via-white/20 to-white/5 self-center mx-6`}>
    <motion.div 
      className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-teal-400 to-transparent shadow-[0_0_10px_rgba(45,212,191,0.8)]"
      initial={{ x: '-100%' }}
      animate={{ x: '300%' }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear", delay }}
    />
    {/* Arrow indicator */}
    <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-4 border-l-white/20" />
  </div>
);

const ExplorePage = () => {
  const scrollRef = useRef(null);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-teal-500/30 overflow-hidden flex flex-col">
      <BackgroundGrid />
      
      <main className="relative z-10 flex-1 flex flex-col h-screen">
        
        {/* Header Section */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="pt-12 px-8 mb-8 border-b border-white/10 bg-[#050505]/90 backdrop-blur-xl z-30"
        >
           <div className="max-w-7xl mx-auto pb-8">
              <div className="flex items-center gap-3 mb-6">
                 <motion.div 
                   className="p-2.5 bg-teal-500/10 rounded-lg border border-teal-500/30"
                   whileHover={{ scale: 1.1, rotate: 90 }}
                   transition={{ type: "spring", stiffness: 300 }}
                 >
                    <LayoutGrid size={22} className="text-teal-400" />
                 </motion.div>
                 <span className="text-sm font-mono text-teal-400 uppercase tracking-widest">System Architecture_v1.0</span>
                 <div className="ml-auto flex items-center gap-2 text-xs text-white/40">
                   <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                   <span className="font-mono">SYSTEM ONLINE</span>
                 </div>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-3">
                Data Flow <span className='  text-teal-500'>Pipeline</span>
              </h1>
              {/* <p className="text-white/50 max-w-2xl text-base">Interactive visualization of the request lifecycle from client-side interaction to server-side processing and AI synthesis.</p> */}
           </div>
        </motion.div>

        {/* Horizontal Scroll Container */}
        <div className="flex-1 overflow-x-auto overflow-y-hidden custom-scrollbar cursor-grab active:cursor-grabbing pl-16 pr-32 items-center flex">
            <div className="flex items-center min-w-max py-10">
               
               {/* START: Client */}
               <div className="flex items-center">
                  <div className="flex flex-col gap-2 mr-6">
                     <span className="text-xs font-mono text-white/30 uppercase rotate-180 tracking-widest" style={{writingMode: 'vertical-rl'}}>Frontend Layer</span>
                  </div>
                  <NodeCard 
                     icon={<Globe size={28} />}
                     title="Client Application"
                     subTitle="User Interface"
                     techs={["React","Tailwind","TypeScript","GSAP"]}
                     color="blue"
                     delay={0.1}
                  />
                  <HorizontalPath width="w-40" delay={0} />
               </div>

               {/* MIDDLE: Gateway */}
               <div className="flex items-center">
                  <div className="relative">
                     <motion.div 
                       initial={{ opacity: 0, y: -10 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ delay: 0.5 }}
                       className="absolute -top-16 left-1/2 -translate-x-1/2 text-xs font-mono text-white/40 uppercase tracking-widest bg-[#050505] px-4 py-1 rounded-full border border-white/10 z-10 whitespace-nowrap"
                     >
                        Security Layer / Backend 
                     </motion.div>
                     <div className="absolute -top-12 left-1/2 -translate-x-1/2 h-12 w-px border-l border-dashed border-white/20 -z-0" />
                     <NodeCard 
                        icon={<Server size={28} />}
                        title="API Gateway"
                        subTitle="Request Router"
                        techs={["Node.js", "Express", "TextExtractors","TypeScript"]}
                        color="teal"
                        delay={0.2}
                     />
                  </div>
                  
                  {/* Complex Connector */}
                  <div className="relative w-40 h-0.5 bg-gradient-to-r from-white/5 via-white/20 to-white/5 mx-6 flex items-center justify-center">
                     <motion.div 
                        className="absolute top-0 left-0 h-full w-1/4 bg-teal-400 shadow-[0_0_20px_rgba(20,184,166,1)] rounded-full"
                        animate={{ left: ['0%', '100%'], opacity: [0, 1, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                     />
                     <motion.div 
                       className="w-10 h-10 bg-[#050505] border-2 border-white/30 rounded-full flex items-center justify-center z-10"
                       whileHover={{ scale: 1.2, rotate: 180 }}
                       transition={{ type: "spring", stiffness: 200 }}
                     >
                        <Network size={16} className="text-teal-400" />
                     </motion.div>
                  </div>
               </div>

               {/* END: Branching Logic */}
               <div className="flex items-center h-[500px]">
                  
                  {/* Visual Fork */}
                  <div className="flex flex-col justify-between h-full py-16 relative mr-12">
                      {/* Top Connector */}
                      <div className="absolute top-[28%] left-0 w-12 h-0.5 bg-gradient-to-l from-white/20 to-transparent -translate-x-full"></div>
                      {/* Bottom Connector */}
                      <div className="absolute bottom-[28%] left-0 w-12 h-0.5 bg-gradient-to-l from-white/20 to-transparent -translate-x-full"></div>
                      
                      {/* Vertical Joiner with glow */}
                      <div className="absolute top-[28%] bottom-[28%] left-0 w-0.5 bg-gradient-to-b from-white/20 via-white/30 to-white/20 -translate-x-full shadow-[0_0_10px_rgba(255,255,255,0.3)]"></div>
                      
                      {/* Junction node */}
                      <motion.div 
                        className="absolute top-1/2 -translate-y-1/2 -left-12 w-3 h-3 bg-teal-400 rounded-full shadow-[0_0_15px_rgba(20,184,166,0.8)]"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                  </div>

                  <div className="flex flex-col gap-16 justify-center">
                     
                     {/* Top Branch: Database */}
                     <div className="flex items-center">
                        <div className="w-20 h-0.5 bg-gradient-to-r from-white/20 to-transparent relative overflow-hidden">
                           <motion.div className="absolute inset-0 h-full w-1/2 bg-gradient-to-r from-transparent via-orange-500 to-transparent shadow-[0_0_10px_rgba(251,146,60,0.8)]" 
                              animate={{ x: ['-100%', '200%'] }} 
                              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }} 
                           />
                        </div>
                        <NodeCard 
                           icon={<Database size={28} />}
                           title="Data Layer"
                           subTitle="Persistence & Storage"
                           techs={["MongoDB", "Mongoose"]}
                           color="orange"
                           delay={0.3}
                        />
                     </div>

                     {/* Bottom Branch: AI */}
                     <div className="flex items-center">
                        <div className="w-20 h-0.5 bg-gradient-to-r from-white/20 to-transparent relative overflow-hidden">
                           <motion.div className="absolute inset-0 h-full w-1/2 bg-gradient-to-r from-transparent via-purple-500 to-transparent shadow-[0_0_10px_rgba(192,132,252,0.8)]" 
                              animate={{ x: ['-100%', '200%'] }} 
                              transition={{ duration: 2.5, repeat: Infinity, delay: 0.5, ease: "linear" }} 
                           />
                        </div>
                        <NodeCard 
                           icon={<BrainCircuit size={28} />}
                           title="AI Engine"
                           subTitle="Intelligence & Analysis"
                           techs={["Gemini 1.5 Pro", "API SDK"]}
                           color="purple"
                           delay={0.4}
                        />
                     </div>
                     
                  </div>
               </div>

            </div>
        </div>

        {/* Footer Legend */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="px-8 py-5 border-t border-white/10 bg-[#050505]/90 backdrop-blur-xl flex justify-between items-center text-sm text-white/40"
        >
           <div className="flex gap-8">
              <span className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-teal-500 shadow-[0_0_10px_rgba(20,184,166,0.8)]" /> 
                Active Connection
              </span>
              <span className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-white/20" /> 
                Idle State
              </span>
              <span className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" /> 
                Processing
              </span>
           </div>
           <div className="font-mono flex items-center gap-2">
             <span>SCROLL TO EXPLORE</span>
             <motion.div
               animate={{ x: [0, 5, 0] }}
               transition={{ duration: 1.5, repeat: Infinity }}
             >
               →
             </motion.div>
           </div>
        </motion.div>

      </main>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(90deg, rgba(20, 184, 166, 0.5), rgba(96, 165, 250, 0.5));
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(90deg, rgba(20, 184, 166, 0.8), rgba(96, 165, 250, 0.8));
        }
      `}</style>
    </div>
  );
};

export default ExplorePage;