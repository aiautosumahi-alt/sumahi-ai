
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

const Hero: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const generateCoverPhoto = async () => {
    setIsLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              text: 'A hyper-realistic, cinematic 3D representation of futuristic AI sales and content infrastructure. Glowing emerald data pipelines connecting floating glass modules. Sleek obsidian surfaces, high-tech professional dashboard aesthetics, volumetric lighting, 8k resolution, minimalist architectural photography style.',
            },
          ],
        },
        config: {
          imageConfig: {
            aspectRatio: "16:9"
          }
        }
      });

      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          setImageUrl(`data:image/png;base64,${part.inlineData.data}`);
          break;
        }
      }
    } catch (error) {
      console.error("Failed to generate cover photo:", error);
      setImageUrl("https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=2000");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    generateCoverPhoto();
  }, []);

  return (
    <section className="relative min-h-[95vh] flex items-center pt-20 overflow-hidden bg-slate-950">
      {/* Dynamic Moving Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-emerald-900/15 blur-[120px] rounded-full animate-float-slow opacity-60"></div>
        <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] bg-emerald-600/10 blur-[120px] rounded-full animate-float-delayed opacity-50"></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        
        {/* Floating Particles */}
        <div className="absolute w-2 h-2 bg-emerald-500/20 rounded-full top-1/4 left-1/3 animate-ping"></div>
        <div className="absolute w-1 h-1 bg-emerald-400/30 rounded-full top-1/2 right-1/4 animate-ping" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          {/* Content Side */}
          <div className="lg:col-span-5 text-left space-y-8">
            <div className="inline-flex items-center gap-3 text-emerald-400 font-bold tracking-[0.2em] uppercase text-xs bg-emerald-400/10 px-5 py-2.5 rounded-full border border-emerald-400/20 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Infrastructure 2.0
            </div>
            
            <h1 className="text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight font-lexend">
              The Engine for <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-600 animate-shimmer bg-[length:200%_auto]">
                Agency Velocity.
              </span>
            </h1>
            
            <p className="text-xl text-slate-400 leading-relaxed max-w-lg font-light">
              We replace manual bottlenecks with hard-coded AI infrastructure. Scale your sales and content production without adding a single head to payroll.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 items-start">
              <button 
                onClick={() => document.getElementById('auditor')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative bg-emerald-600 text-white px-10 py-5 rounded-2xl text-lg font-bold hover:bg-emerald-500 transition-all shadow-[0_0_50px_-10px_rgba(16,185,129,0.5)] flex items-center gap-3 overflow-hidden"
              >
                <span className="relative z-10">Start Your Audit</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </button>
              
              <button 
                onClick={generateCoverPhoto}
                disabled={isLoading}
                className="px-6 py-5 text-slate-300 hover:text-white transition-colors flex items-center gap-3 group"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-all">
                  <svg className={`w-5 h-5 ${isLoading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                </div>
                <span className="text-sm font-semibold tracking-wide">Regenerate View</span>
              </button>
            </div>
          </div>

          {/* AI Cover Photo Visualizer */}
          <div className="lg:col-span-7 relative">
            <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl group ring-1 ring-emerald-500/20">
              {isLoading ? (
                <div className="absolute inset-0 bg-slate-900 flex flex-col items-center justify-center space-y-4">
                  <div className="w-16 h-16 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
                  <div className="text-emerald-500 text-xs font-bold uppercase tracking-[0.3em] animate-pulse">Architecting Visual...</div>
                </div>
              ) : (
                <>
                  <img 
                    src={imageUrl || ""} 
                    alt="AI Generated Infrastructure" 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[4000ms]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/60 via-transparent to-emerald-950/20 pointer-events-none"></div>
                  
                  {/* Floating Status Card Overlay */}
                  <div className="absolute top-8 right-8 animate-float-slow">
                    <div className="bg-slate-950/80 backdrop-blur-2xl border border-white/10 p-5 rounded-[2rem] shadow-2xl">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                          <svg className="w-5 h-5 text-emerald-400 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                        </div>
                        <div>
                          <div className="text-white text-sm font-bold">System Status</div>
                          <div className="text-emerald-400 text-xs font-medium">Optimal Efficiency</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Security Compliance Badges */}
                  <div className="absolute bottom-8 left-8 flex flex-wrap gap-4 pointer-events-none">
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 px-5 py-3 rounded-2xl flex flex-col items-center animate-float-delayed">
                      <span className="text-white font-bold text-sm">GDPR</span>
                      <span className="text-[8px] text-slate-400 tracking-[0.2em] font-bold">COMPLIANT</span>
                    </div>
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 px-5 py-3 rounded-2xl flex flex-col items-center animate-float-slow">
                      <span className="text-white font-bold text-sm">SOC 2</span>
                      <span className="text-[8px] text-slate-400 tracking-[0.2em] font-bold">TYPE 2 READY</span>
                    </div>
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 px-5 py-3 rounded-2xl flex flex-col items-center animate-float-delayed" style={{ animationDelay: '1s' }}>
                      <span className="text-white font-bold text-sm">AES-256</span>
                      <span className="text-[8px] text-slate-400 tracking-[0.2em] font-bold">ENCRYPTED</span>
                    </div>
                  </div>

                  {/* AI Brand Label */}
                  <div className="absolute bottom-8 right-8">
                    <div className="bg-emerald-500/15 backdrop-blur-xl border border-emerald-500/30 px-5 py-2.5 rounded-full ring-1 ring-emerald-500/20">
                      <span className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em]">Live Architect View</span>
                    </div>
                  </div>
                </>
              )}
            </div>
            
            {/* Background Decorative Rings */}
            <div className="absolute -z-10 -bottom-10 -left-10 w-40 h-40 bg-emerald-500/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -z-10 top-[-20px] right-[-20px] w-64 h-64 border border-white/5 rounded-full opacity-50"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
