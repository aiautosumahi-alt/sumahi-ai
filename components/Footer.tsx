
import React from 'react';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 py-16 px-6 text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
        <div className="col-span-2">
          <Logo light className="mb-6" />
          <p className="text-slate-500 max-w-sm mb-8">
            The premium infrastructure layer for high-growth agencies. Bridging human intuition and technical velocity.
          </p>
          <div className="flex flex-col gap-4 mb-8">
            <a 
              href="https://wa.me/918074251396" 
              className="flex items-center gap-3 text-red-600 font-bold hover:text-red-500 transition-colors group"
            >
              <div className="w-8 h-8 rounded-full bg-red-600/10 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              </div>
              Direct Engineering Link
            </a>
            <div className="flex items-center gap-4 text-slate-600">
              <a href="#" className="hover:text-red-600 transition-colors">X</a>
              <a href="#" className="hover:text-red-600 transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-red-600 transition-colors">GitHub</a>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-red-600">Infrastructure</h4>
          <ul className="space-y-4 text-slate-500 text-sm">
            <li><a href="#infrastructure" className="hover:text-white transition-colors">Sales OS</a></li>
            <li><a href="#infrastructure" className="hover:text-white transition-colors">Content OS</a></li>
            <li><a href="#infrastructure" className="hover:text-white transition-colors">Ad Guardrails</a></li>
            <li><a href="#infrastructure" className="hover:text-white transition-colors">Roadmaps</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-red-600">Company</h4>
          <ul className="space-y-4 text-slate-500 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Manifesto</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Partner Program</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600 font-medium">
        <div>© {new Date().getFullYear()} Sumahi Ai. Built for technical dominance.</div>
        <div className="flex gap-6">
          <span>Enterprise Layer</span>
          <span>Guaranteed ROI Cycles</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;