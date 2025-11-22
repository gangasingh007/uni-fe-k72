import React from 'react';
import { motion } from 'framer-motion';
import { Server, Code, Database, BrainCircuit, Globe, Zap, Layers } from 'lucide-react';

const BackgroundGrid = () => (
  <div className="fixed inset-0 z-0 pointer-events-none select-none">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-20%,#115e5915,transparent)]" />
    <div className="absolute inset-0 bg-black/90" />
  </div>
);

const TechPill = ({ children }: { children: React.ReactNode }) => (
  <span className="px-2 py-1 text-[10px] font-mono bg-white/5 text-white/70 rounded border border-white/10 whitespace-nowrap">
    {children}
  </span>
);

// --- Flowchart Nodes ---

const NodeCard = ({ icon, title, description, techs, color = "teal" }: any) => {
  const colorStyles = {
    teal: "text-teal-400 bg-teal-500/10 border-teal-500/20",
    blue: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    orange: "text-orange-400 bg-orange-500/10 border-orange-500/20",
    purple: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative z-20 w-64 bg-[#0a0a0a] border border-white/10 rounded-xl p-5 shadow-2xl hover:border-white/20 transition-colors"
    >
      {/* Connector Dot Top */}
      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#0a0a0a] border-2 border-white/20 rounded-full" />
      
      <div className="flex items-center gap-3 mb-3">
        <div className={`p-2 rounded-lg ${colorStyles[color]}`}>
          {icon}
        </div>
        <h3 className="font-bold text-white text-sm">{title}</h3>
      </div>
      
      <p className="text-xs text-white/50 leading-relaxed mb-4 min-h-[40px]">
        {description}
      </p>
      
      <div className="flex flex-wrap gap-1.5">
        {techs.map((t: string) => <TechPill key={t}>{t}</TechPill>)}
      </div>

      {/* Connector Dot Bottom */}
      <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#0a0a0a] border-2 border-white/20 rounded-full" />
    </motion.div>
  );
};

// --- Animated Connectors ---

const VerticalPath = ({ height = "h-16" }) => (
  <div className={`relative w-px ${height} bg-white/10 mx-auto overflow-hidden`}>
    <motion.div 
      className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-teal-500"
      initial={{ y: '-100%' }}
      animate={{ y: '200%' }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

const ForkPath = () => (
  <div className="relative w-[300px] h-12 mx-auto">
    {/* Main Stem */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-6 bg-white/10" />
    {/* Crossbar */}
    <div className="absolute top-6 left-0 right-0 h-px bg-white/10 border-t border-white/10" />
    {/* Left Drop */}
    <div className="absolute top-6 left-0 w-px h-6 bg-white/10" />
    {/* Right Drop */}
    <div className="absolute top-6 right-0 w-px h-6 bg-white/10" />
    
    {/* Animation Particle */}
    <motion.div
        className="absolute w-1.5 h-1.5 bg-teal-500 rounded-full shadow-[0_0_10px_rgba(20,184,166,0.8)]"
        animate={{
            top: [0, 24, 24, 48],
            left: ["50%", "50%", "0%", "0%"],
            opacity: [0, 1, 1, 0]
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        style={{ translateX: "-50%" }}
    />
     <motion.div
        className="absolute w-1.5 h-1.5 bg-teal-500 rounded-full shadow-[0_0_10px_rgba(20,184,166,0.8)]"
        animate={{
            top: [0, 24, 24, 48],
            left: ["50%", "50%", "100%", "100%"],
            opacity: [0, 1, 1, 0]
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }}
        style={{ translateX: "-50%" }}
    />
  </div>
);

const ExplorePage = () => {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-teal-500/30 pb-24">
      <BackgroundGrid />
      
      <main className="relative z-10 pt-24 px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
           <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-4">
            <Layers size={14} className="text-teal-400" />
            <span className="text-xs font-medium text-white/70">Architecture</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">System Flow</h1>
          <p className="text-white/50 max-w-lg mx-auto">Visualizing the data journey from user interaction to AI processing.</p>
        </div>

        <div className="flex flex-col items-center">
          
          {/* 1. Frontend */}
          <NodeCard 
            icon={<Globe size={20} />}
            title="Client Application"
            description="React-based SPA handling user interface and state."
            techs={["React", "Vite", "Tailwind"]}
            color="blue"
          />

          <VerticalPath height="h-16" />

          {/* 2. Backend */}
          <NodeCard 
            icon={<Server size={20} />}
            title="API Gateway"
            description="Express server managing routes and auth."
            techs={["Node.js", "Express", "JWT"]}
            color="teal"
          />

          {/* Fork Connector */}
          <ForkPath />

          {/* 3. Split Level */}
          <div className="flex gap-12 md:gap-24 mt-0">
             
             {/* Database Branch */}
             <div className="flex flex-col items-center">
                <NodeCard 
                    icon={<Database size={20} />}
                    title="Data Layer"
                    description="NoSQL storage for scalable data."
                    techs={["MongoDB", "Mongoose"]}
                    color="orange"
                />
             </div>

             {/* AI Branch */}
             <div className="flex flex-col items-center">
                <NodeCard 
                    icon={<BrainCircuit size={20} />}
                    title="Intelligence"
                    description="LLM processing for summaries."
                    techs={["Gemini API"]}
                    color="purple"
                />
             </div>

          </div>

        </div>
      </main>
    </div>
  );
};

export default ExplorePage;
