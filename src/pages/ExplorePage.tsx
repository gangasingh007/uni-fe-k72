import React from 'react';
import { motion } from 'framer-motion';
import { Server, Code, Database, BrainCircuit, Wind, Layers } from 'lucide-react';

const BackgroundGrid = () => (
  <div className="fixed inset-0 z-0 pointer-events-none select-none">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-20%,#115e5915,transparent)]" />
    <div className="absolute inset-0 bg-black/80" />
  </div>
);

const TechPill = ({ children }: { children: React.ReactNode }) => (
  <div className="px-3 py-1 text-xs font-mono bg-teal-500/10 text-teal-300 rounded-full border border-teal-500/20">
    {children}
  </div>
);

const ArchitectureCard = ({ icon, title, description, techs }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true, amount: 0.3 }}
    className="bg-[#0F0F0F]/60 border border-white/10 rounded-xl p-8 backdrop-blur-md space-y-4 h-full"
  >
    <div className="flex items-center gap-4">
      <div className="p-3 bg-white/5 rounded-lg text-teal-400">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-white">{title}</h3>
    </div>
    <p className="text-white/60 leading-relaxed">{description}</p>
    <div className="flex flex-wrap gap-2 pt-2">
      {techs.map((tech) => (
        <TechPill key={tech}>{tech}</TechPill>
      ))}
    </div>
  </motion.div>
);

const ExplorePage = () => {
  const architectureSections = [
    {
      icon: <Layers size={24} />,
      title: "Frontend",
      description: "A dynamic and responsive user interface built with modern web technologies to ensure a seamless user experience. Animations are heavily used to create an engaging and fluid feel.",
      techs: ["React", "Vite", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP"]
    },
    {
      icon: <Server size={24} />,
      title: "Backend",
      description: "A robust RESTful API server that handles all business logic, data processing, and communication with the database and external services like the AI model.",
      techs: ["Node.js", "Express.js", "REST API"]
    },
    {
      icon: <Database size={24} />,
      title: "Database",
      description: "A flexible NoSQL database is used to store all application data, including user information, resources, subjects, and class structures, allowing for scalable and efficient data management.",
      techs: ["MongoDB", "Mongoose"]
    },
    {
      icon: <BrainCircuit size={24} />,
      title: "AI & Machine Learning",
      description: "Leverages a powerful, large language model to provide intelligent features like document summarization. This is a core part of delivering smart, value-added services to students.",
      techs: ["Google Gemini API"]
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-teal-500/30">
      <BackgroundGrid />
      <main className="relative z-10 py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-4">
              <Code size={14} className="text-teal-400" />
              <span className="text-sm font-medium text-white/70">Project Architecture</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tighter">
              How UniConnect Works
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-white/60">
              UniConnect is built on a modern, scalable technology stack designed for performance and a great developer experience. Here’s a look under the hood.
            </p>
          </motion.div>

          {/* Architecture Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {architectureSections.map((section) => (
              <ArchitectureCard key={section.title} {...section} />
            ))}
          </div>

          {/* Deployment Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center gap-4 p-6 rounded-xl bg-[#0F0F0F]/60 border border-white/10 backdrop-blur-md">
              <Wind size={24} className="text-teal-400" />
              <div>
                <h3 className="text-xl font-bold text-white">Deployment</h3>
                <p className="text-white/60 mt-1">
                  The backend is hosted on <span className="text-teal-300">Render</span>, with the frontend deployed on <span className="text-teal-300">Vercel</span> for optimal performance and continuous delivery.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </main>
    </div>
  );
};

export default ExplorePage;

