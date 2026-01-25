
import React from 'react';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 py-16 px-6 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
        <div className="col-span-2">
          <Logo light className="mb-6" />
          <p className="text-slate-400 max-w-sm mb-8">
            The premium infrastructure layer for high-growth marketing agencies. We bridge the gap between human intuition and machine velocity.
          </p>
          <div className="flex items-center gap-4 text-slate-500">
            <a href="#" className="hover:text-emerald-400 transition-colors">Twitter</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Instagram</a>
          </div>
        </div>
        
        <div>
          <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-emerald-500">Infrastructure</h4>
          <ul className="space-y-4 text-slate-400 text-sm">
            <li><a href="#infrastructure" className="hover:text-white transition-colors">AI Sales OS</a></li>
            <li><a href="#infrastructure" className="hover:text-white transition-colors">AI Content OS</a></li>
            <li><a href="#infrastructure" className="hover:text-white transition-colors">AI Ad Guardrails</a></li>
            <li><a href="#infrastructure" className="hover:text-white transition-colors">Growth Roadmap</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-emerald-500">Company</h4>
          <ul className="space-y-4 text-slate-400 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Our Manifesto</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Security Documentation</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Partner Program</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-medium">
        <div>© {new Date().getFullYear()} Sumahi Ai. All rights reserved.</div>
        <div className="flex gap-6">
          <span>Enterprise Grade Infrastructure</span>
          <span>90-Day ROI Guarantee</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
