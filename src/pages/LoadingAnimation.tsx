import {motion} from "framer-motion"

const LoadingAnimation = ({ progress }: { progress: number }) => {
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
        </div>
  
        <div className="text-center space-y-2">
          <h3 className="text-xl font-medium text-white tracking-tight">
            Synthesizing Knowledge
          </h3>
          <div className="flex items-center justify-center gap-2 text-sm text-teal-400/80 font-mono">
            <span>{Math.round(progress)}% Processed</span>
            <span className="inline-block w-1.5 h-1.5 bg-current rounded-full animate-pulse" />
          </div>
          <p className="text-white/30 text-xs max-w-xs mx-auto mt-4 leading-relaxed">
            AI is analyzing document structure and extracting key concepts...
          </p>
        </div>
      </motion.div>
    );
  };
  

export default LoadingAnimation;