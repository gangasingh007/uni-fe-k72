import React from 'react';
import { 
  ArrowUpRight, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Mail, 
  Github 
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white border-t border-white/10 overflow-hidden relative">
      {/* Decorative Gradient Blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-teal-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 pt-24 pb-12 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
          
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
            
              <h3 className="text-2xl font-bold uppercase tracking-wider text-white">UniConnect</h3>
            </div>
            <p className="text-white/60 text-lg leading-relaxed max-w-md">
              Bridging the gap between education and industry. One nation, one platform for student success and career growth.
            </p>
            
            <div className="flex gap-4 pt-6">
              <SocialButton href="https://x.com/gangasingh1734" icon={<Twitter size={18} />} />
              <SocialButton href="https://www.instagram.com/ganga.singh.007/" icon={<Instagram size={18} />} />
              <SocialButton href="https://github.com/gangasingh007" icon={<Github size={18} />} />
            </div>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-3 md:col-start-8">
            <h4 className="text-teal-500 font-bold uppercase tracking-widest text-sm mb-8 flex items-center gap-2">
              Platform
              <span className="w-8 h-px bg-teal-500/30" />
            </h4>
            <ul className="space-y-4">
              <FooterLink href="#">Syllabus & Curriculum</FooterLink>
              <FooterLink href="#">Datesheet</FooterLink>
              <FooterLink href="#">Explore</FooterLink>
            </ul>
          </div>

          {/* Developer Column */}
          <div className="md:col-span-2">
             <h4 className="text-teal-500 font-bold uppercase tracking-widest text-sm mb-8 flex items-center gap-2">
              Built By
              <span className="w-8 h-px bg-teal-500/30" />
             </h4>
             <div className="group cursor-pointer">
                <h5 className="text-xl font-bold text-white group-hover:text-teal-400 transition-colors duration-300">Ganga Singh</h5>
                <p className="text-white/40 text-sm mt-1">Full Stack Developer</p>
                
                <a 
                  href="mailto:gangasingh1734@gmail.com" 
                  className="inline-flex items-center gap-2 mt-6 text-white/60 hover:text-white transition-colors text-sm py-2 px-4 rounded-full border border-white/10 hover:border-white/30 hover:bg-white/5"
                >
                    <Mail size={14} />
                    gangasingh1734@gmail.com
                </a>
             </div>
          </div>
        </div>

        {/* Bottom Section: Massive Text & Copyright */}
        <div className="border-t border-white/10 pt-12 flex flex-col items-center">
             {/* Massive Text Effect */}
             <h1 className="text-[13vw] leading-none font-black text-white/5 select-none tracking-tighter hover:text-white/10 transition-colors duration-700 cursor-default">
                UNICONNECT
             </h1>
             
             <div className="w-full flex flex-col md:flex-row justify-between items-center mt-12 text-xs text-white/30 uppercase tracking-widest font-medium">
                <p>© 2025 UniConnect Inc. All rights reserved.</p>
                <div className="flex gap-8 mt-4 md:mt-0">
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                </div>
             </div>
        </div>
      </div>
    </footer>
  );
};

// --- Helper Components ---

const FooterLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
  <li>
    <a href={href} className="group flex items-center gap-3 text-white/60 hover:text-white transition-colors">
      <span className="w-1.5 h-1.5 rounded-full bg-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <span className="text-base group-hover:translate-x-1 transition-transform duration-300">{children}</span>
      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-50 group-hover:translate-x-0 transition-all duration-300 text-white" />
    </a>
  </li>
);

const SocialButton = ({ icon, href }: { icon: React.ReactNode; href: string }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-teal-500 hover:text-black hover:border-teal-500 hover:scale-110 transition-all duration-300"
    >
        {icon}
    </a>
);

export default Footer;
