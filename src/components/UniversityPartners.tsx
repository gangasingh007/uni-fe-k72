import MarqueeText from './MarqueeText';

const UniversityPartners = () => {
  // Updated list to fictional and tech-forward institutions fitting an AI/data/edtech theme
  const dataPartners = [
    "OpenAI University",
    "DeepMind Institute",
    "Codecademy Labs",
    "Singularity College",
    "DataCamp Academy",
    "TensorFlow Institute",
    "MIT.AI Collective",
    "Lambda School",
    "AI4ALL Network",
    "Bitwise Learning",
  ];

  return (
    <section className="py-20 border-y border-white/10 bg-[#050505] relative">
      <div className="mb-12 px-6">
        <p className="text-center text-sm uppercase tracking-[0.2em] text-teal-400/80 font-mono drop-shadow-sm">
          Empowered by AI-Led Institutions
        </p>
      </div>
      <div className="max-w-6xl mx-auto">
        <MarqueeText
          text={dataPartners.join(" • ")}
          speed={105}
          className="py-8 text-xl md:text-2xl tracking-wide font-bold text-white/90 opacity-90"
        />
      </div>
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="bg-[radial-gradient(ellipse_70%_40%_at_50%_0%,#14b8a60d_0%,transparent_100%)] h-full w-full"></div>
        <div className="bg-[radial-gradient(ellipse_35%_25%_at_80%_90%,#38bdf82c_0%,transparent_100%)] h-full w-full"></div>
      </div>
    </section>
  );
};

export default UniversityPartners;
