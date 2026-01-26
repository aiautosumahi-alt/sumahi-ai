
import React from 'react';

interface LogoProps {
  light?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ light = false, className = "" }) => {
  return (
    <div className={`flex items-center gap-3 group cursor-pointer ${className}`}>
      {/* Animated Symbol */}
      <div className="relative w-11 h-11 flex items-center justify-center">
        {/* Outer Rotating Elements */}
        <div className="absolute inset-0 border-[1.5px] border-red-600/30 rounded-xl rotate-45 group-hover:rotate-180 transition-transform duration-1000 ease-in-out"></div>
        <div className="absolute inset-1.5 border-[1px] border-red-500/20 rounded-lg -rotate-12 group-hover:rotate-45 transition-transform duration-700 ease-in-out"></div>
        
        {/* Inner Core SVG */}
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          className="w-6 h-6 relative z-10 text-red-600"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Hexagonal Mesh */}
          <path 
            d="M12 2L4 7V17L12 22L20 17V7L12 2Z" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="animate-logo-draw"
          />
          {/* Internal Connectors */}
          <path d="M12 22V12" stroke="currentColor" strokeWidth="1.5" className="opacity-40" />
          <path d="M12 12L20 7" stroke="currentColor" strokeWidth="1.5" className="opacity-40" />
          <path d="M12 12L4 7" stroke="currentColor" strokeWidth="1.5" className="opacity-40" />
          
          {/* Glowing Center Point */}
          <circle cx="12" cy="12" r="2.5" fill="currentColor" className="animate-pulse shadow-[0_0_10px_rgba(220,38,38,0.8)]" />
        </svg>

        {/* Ambient Glow Pulse */}
        <div className="absolute inset-0 bg-red-600/10 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      </div>

      {/* Wordmark */}
      <div className={`text-2xl font-bold tracking-tight font-lexend transition-colors ${
        light ? 'text-white' : 'text-slate-100'
      }`}>
        SUMAHI
        <span className="text-red-600 ml-1 relative">
          AI
          <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-red-500 rounded-full animate-ping opacity-75"></span>
        </span>
      </div>

      <style>{`
        @keyframes logo-draw {
          0% { stroke-dasharray: 100; stroke-dashoffset: 100; }
          100% { stroke-dasharray: 100; stroke-dashoffset: 0; }
        }
        .animate-logo-draw {
          animation: logo-draw 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default Logo;