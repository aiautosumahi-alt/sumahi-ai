
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

const Hero: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const generateCoverPhoto = async () => {
    setIsLoading(true);
    try {
      // Instance created locally to ensure freshest key
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
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

      // Find the image part, do not assume it is the first part as per guidelines
      if (response.candidates && response.candidates[0].content.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            setImageUrl(`data:image/png;base64,${part.inlineData.data}`);
            break;
          }
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
        
        {/* Data Stream Lines */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-emerald-500/20 to-transparent animate-stream-1"></div>
        <div className="absolute top-0 left-2/4 w-px h-full bg-gradient-to-b from-transparent via-emerald-500/10 to-transparent animate-stream-2"></div>
        <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-emerald-500/20 to-transparent animate-stream-3"></div>
        
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <span className="text-sm font-bold tracking-widest uppercase">Refresh Neural Visual</span>
              </button>
            </div>
          </div>

          {/* Image Side */}
          <div className="lg:col-span-7 relative group">
            <div className="absolute -inset-4 bg-emerald-500/10 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl aspect-[16/9] bg-slate-900">
              {isLoading ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
                  <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
                  <div className="text-emerald-500/60 text-xs font-bold uppercase tracking-widest animate-pulse">Rendering Infrastructure...</div>
                </div>
              ) : imageUrl && (
                <img 
                  src={imageUrl} 
                  alt="AI Infrastructure Visualization" 
                  className="w-full h-full object-cover animate-fade-in"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
