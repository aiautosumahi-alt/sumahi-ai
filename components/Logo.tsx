
import React from 'react';

interface LogoProps {
  light?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ light = false, className = "" }) => {
  return (
    <div className={`flex items-center gap-3 group cursor-pointer ${className}`}>
      {/* Animated Symbol */}
      <div className="relative w-10 h-10 flex items-center justify-center">
        {/* Outer Rotating Ring */}
        <div className="absolute inset-0 border-2 border-emerald-500/20 rounded-lg rotate-45 group-hover:rotate-90 transition-transform duration-700 ease-in-out"></div>
        <div className="absolute inset-0 border-2 border-emerald-500/10 rounded-lg -rotate-12 group-hover:rotate-0 transition-transform duration-1000 ease-in-out"></div>
        
        {/* Inner Core */}
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          className="w-6 h-6 relative z-10 text-emerald-500"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M12 2L4 7V17L12 22L20 17V7L12 2Z" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="animate-logo-draw"
          />
          <path 
            d="M12 22V12" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            className="opacity-50"
          />
          <path 
            d="M12 12L20 7" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            className="opacity-50"
          />
          <path 
            d="M12 12L4 7" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            className="opacity-50"
          />
          {/* Pulsing Core Center */}
          <circle cx="12" cy="12" r="2" fill="currentColor" className="animate-pulse shadow-emerald-500" />
        </svg>

        {/* Ambient Glow */}
        <div className="absolute inset-0 bg-emerald-500/20 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      {/* Wordmark */}
      <div className={`text-2xl font-bold tracking-tighter font-lexend transition-colors ${
        light ? 'text-white' : 'text-slate-900'
      }`}>
        SUMAHI
        <span className="text-emerald-500 ml-0.5 inline-block group-hover:translate-x-0.5 transition-transform duration-300">
          AI
        </span>
      </div>

      <style>{`
        @keyframes logo-draw {
          0% { stroke-dasharray: 100; stroke-dashoffset: 100; }
          100% { stroke-dasharray: 100; stroke-dashoffset: 0; }
        }
        .animate-logo-draw {
          animation: logo-draw 2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Logo;
