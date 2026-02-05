
import React, { useState, useEffect } from 'react';
import Logo from './Logo';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-slate-950/90 backdrop-blur-md shadow-lg h-16 border-slate-800' 
        : 'bg-transparent h-20 border-transparent'
    } border-b flex items-center`}>
      <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
        <Logo light={true} />
        
        <div className={`hidden md:flex items-center gap-8 text-sm font-bold transition-colors ${
          isScrolled ? 'text-slate-300' : 'text-slate-400'
        }`}>
          <a href="#infrastructure" className="hover:text-cyan-400 transition-colors tracking-wide">Infrastructure</a>
          <a href="#auditor" className="hover:text-cyan-400 transition-colors tracking-wide">Growth Auditor</a>
          <a href="#faq" className="hover:text-cyan-400 transition-colors tracking-wide">FAQ</a>
        </div>

        <button 
          onClick={() => document.getElementById('auditor')?.scrollIntoView({ behavior: 'smooth' })}
          className={`px-6 py-2.5 rounded-full font-bold transition-all text-sm border border-white/20 ${
            isScrolled 
              ? 'bg-cyan-600 text-white hover:bg-cyan-500 shadow-xl shadow-cyan-900/10' 
              : 'bg-white text-slate-950 hover:bg-cyan-600 hover:text-white shadow-xl shadow-white/5'
          }`}
        >
          Book Session
        </button>
      </div>
    </nav>
  );
};

export default Navbar;