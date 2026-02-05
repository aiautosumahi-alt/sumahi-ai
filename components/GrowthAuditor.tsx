
import React, { useState } from 'react';
import { runGrowthAudit } from '../services/geminiService';
import { AuditorState } from '../types';

const GrowthAuditor: React.FC = () => {
  const [state, setState] = useState<AuditorState>({
    agencyNiche: '',
    teamSize: '1-5',
    bottleneck: '',
    isProcessing: false,
    result: null,
    error: null,
  });

  const handleAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.agencyNiche || !state.bottleneck) {
      setState(prev => ({ ...prev, error: "Please fill out all fields." }));
      return;
    }

    setState(prev => ({ ...prev, isProcessing: true, error: null, result: null }));

    try {
      const response = await runGrowthAudit(state.agencyNiche, state.teamSize, state.bottleneck);
      setState(prev => ({ ...prev, result: response, isProcessing: false }));
    } catch (err: any) {
      setState(prev => ({ ...prev, error: err.message, isProcessing: false }));
    }
  };

  return (
    <section id="auditor" className="py-24 px-6 bg-slate-950 scroll-mt-20 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="text-cyan-400 font-bold uppercase tracking-[0.3em] text-xs">Diagnostic Processor</span>
          <h2 className="text-4xl lg:text-5xl font-bold mt-4 font-lexend text-white tracking-tight">AI Growth Audit</h2>
          <p className="text-slate-400 mt-4 text-lg font-light">Identify and automate operational friction points.</p>
        </div>

        <div className="bg-slate-900 rounded-[2.5rem] p-8 lg:p-14 shadow-2xl border border-white/40 relative group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
          
          <form onSubmit={handleAudit} className="relative z-10 space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="block text-sm font-bold text-cyan-400/80 uppercase tracking-widest ml-1">Agency Niche</label>
                <input 
                  type="text" 
                  placeholder="e.g., Performance Creative"
                  className="w-full !bg-slate-950 !text-white px-6 py-4 rounded-2xl border border-white/20 placeholder:text-slate-600 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 outline-none transition-all shadow-inner"
                  value={state.agencyNiche}
                  onChange={(e) => setState(prev => ({ ...prev, agencyNiche: e.target.value }))}
                />
              </div>
              <div className="space-y-3">
                <label className="block text-sm font-bold text-cyan-400/80 uppercase tracking-widest ml-1">Team Size</label>
                <select 
                  className="w-full !bg-slate-950 !text-white px-6 py-4 rounded-2xl border border-white/20 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 outline-none transition-all shadow-inner appearance-none cursor-pointer"
                  value={state.teamSize}
                  onChange={(e) => setState(prev => ({ ...prev, teamSize: e.target.value }))}
                >
                  <option value="1-5" className="bg-slate-900 text-white">1-5 Members</option>
                  <option value="6-15" className="bg-slate-900 text-white">6-15 Members</option>
                  <option value="16-50" className="bg-slate-900 text-white">16-50 Members</option>
                  <option value="50+" className="bg-slate-900 text-white">50+ Members</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="block text-sm font-bold text-cyan-400/80 uppercase tracking-widest ml-1">Manual Bottleneck</label>
              <textarea 
                placeholder="What single manual task slows your growth? (e.g. Sales proposals, content repurposing...)"
                className="w-full !bg-slate-950 !text-white px-6 py-5 rounded-2xl border border-white/20 placeholder:text-slate-600 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 outline-none transition-all h-36 resize-none shadow-inner"
                value={state.bottleneck}
                onChange={(e) => setState(prev => ({ ...prev, bottleneck: e.target.value }))}
              />
            </div>

            {state.error && (
              <div className="p-4 bg-red-600/10 text-red-400 rounded-xl text-sm font-bold border border-white/20 animate-pulse">
                {state.error}
              </div>
            )}

            <button 
              disabled={state.isProcessing}
              className={`w-full py-6 rounded-2xl text-xl font-black transition-all shadow-2xl flex items-center justify-center gap-4 group border border-white/20 ${
                state.isProcessing 
                ? 'bg-slate-800 cursor-not-allowed text-slate-500' 
                : 'bg-cyan-600 text-white hover:bg-cyan-500 shadow-cyan-900/20 active:scale-95'
              }`}
            >
              {state.isProcessing ? (
                <>
                  <svg className="animate-spin h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Scanning Infrastructure...
                </>
              ) : (
                <>
                  Generate Growth Roadmap
                  <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </>
              )}
            </button>
          </form>

          {state.result && (
            <div className="mt-14 bg-slate-950 rounded-3xl p-10 border border-white shadow-[0_0_50px_-12px_rgba(6,182,212,0.2)] animate-fade-in relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500/20 animate-scan"></div>
              
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-cyan-600/10 flex items-center justify-center text-cyan-400 border border-white/20">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white font-lexend">Audit Results</h3>
                  <p className="text-cyan-400/60 text-xs font-bold uppercase tracking-widest">Optimized Intelligence Strategy</p>
                </div>
              </div>

              <div className="prose prose-invert max-w-none whitespace-pre-wrap text-cyan-50/90 leading-relaxed font-light text-lg">
                {state.result}
              </div>

              <div className="mt-12 p-8 bg-cyan-700 rounded-[2rem] text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden group/cta border border-white/30">
                <div className="absolute inset-0 bg-slate-900 translate-x-[-101%] group-hover/cta:translate-x-0 transition-transform duration-500 ease-in-out"></div>
                <div className="relative z-10">
                  <div className="text-cyan-200 group-hover/cta:text-cyan-400 font-bold uppercase tracking-widest text-xs mb-1 transition-colors">Immediate Action Required</div>
                  <div className="text-xl font-bold">Deploy Infrastructure Roadmap</div>
                </div>
                <button 
                  onClick={() => window.open('https://cal.com/sumahi-ai-hqp1nf/secret', '_blank')}
                  className="relative z-10 bg-white group-hover/cta:bg-cyan-700 text-slate-950 group-hover/cta:text-white px-10 py-4 rounded-xl font-black transition-all shadow-xl hover:scale-105 active:scale-95 shrink-0 border border-transparent group-hover/cta:border-white"
                >
                  Secure Slot
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { top: 0; opacity: 0; }
          50% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan {
          animation: scan 3s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default GrowthAuditor;