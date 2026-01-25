
import React from 'react';

const TrustSecurity: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto bg-slate-900 rounded-[3.5rem] p-12 lg:p-20 text-center text-white relative">
        <div className="absolute top-0 right-0 p-12 opacity-5">
          <svg className="w-48 h-48" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" />
          </svg>
        </div>
        
        <div className="relative z-10">
          <div className="inline-block bg-emerald-500/10 text-emerald-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-8 border border-emerald-500/20">
            Security First Architecture
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold font-lexend">Enterprise Security & Compliance</h2>
          <p className="text-slate-400 mt-8 text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto">
            Your data remains your proprietary asset. Our infrastructure operates on a <span className="text-white font-bold">"Zero-Storage" principle</span>—integrating with your HubSpot, Salesforce, and Ads Managers without external data silos.
          </p>
          
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-40 grayscale group hover:grayscale-0 transition-all duration-700">
            <div className="flex flex-col items-center">
              <span className="font-bold text-lg lg:text-2xl tracking-widest">GDPR</span>
              <span className="text-[10px] tracking-[0.3em] font-medium mt-1">COMPLIANT</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold text-lg lg:text-2xl tracking-widest">SOC2</span>
              <span className="text-[10px] tracking-[0.3em] font-medium mt-1">TYPE II READY</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold text-lg lg:text-2xl tracking-widest">HIPAA</span>
              <span className="text-[10px] tracking-[0.3em] font-medium mt-1">DATA PRIVACY</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold text-lg lg:text-2xl tracking-widest">AES-256</span>
              <span className="text-[10px] tracking-[0.3em] font-medium mt-1">ENCRYPTION</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSecurity;
