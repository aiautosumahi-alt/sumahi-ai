
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
        ? 'bg-white/90 backdrop-blur-md shadow-lg h-16 border-slate-100' 
        : 'bg-slate-950/50 backdrop-blur-sm h-20 border-white/5'
    } border-b flex items-center`}>
      <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
        <Logo light={!isScrolled} />
        
        <div className={`hidden md:flex items-center gap-8 text-sm font-bold transition-colors ${
          isScrolled ? 'text-slate-600' : 'text-slate-300'
        }`}>
          <a href="#infrastructure" className="hover:text-emerald-500 transition-colors tracking-wide">Infrastructure</a>
          <a href="#auditor" className="hover:text-emerald-500 transition-colors tracking-wide">Growth Auditor</a>
          <a href="#faq" className="hover:text-emerald-500 transition-colors tracking-wide">FAQ</a>
        </div>

        <button 
          onClick={() => document.getElementById('auditor')?.scrollIntoView({ behavior: 'smooth' })}
          className={`px-6 py-2.5 rounded-full font-bold transition-all text-sm ${
            isScrolled 
              ? 'bg-slate-900 text-white hover:bg-emerald-600 shadow-xl shadow-slate-200' 
              : 'bg-white text-slate-900 hover:bg-emerald-500 hover:text-white shadow-xl shadow-white/5'
          }`}
        >
          Book Session
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
