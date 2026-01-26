
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import InfrastructureStack from './components/InfrastructureStack';
import GrowthAuditor from './components/GrowthAuditor';
import TrustSecurity from './components/TrustSecurity';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import VoiceBot from './components/VoiceBot';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 selection:bg-red-600 selection:text-white">
      <Navbar />
      
      <main>
        <Hero />
        <Stats />
        <InfrastructureStack />
        
        {/* Growth Auditor Section */}
        <GrowthAuditor />
        
        <TrustSecurity />
        
        <FAQ />
        
        {/* Final CTA Section */}
        <section className="py-24 bg-red-700 px-6 text-center border-t border-white/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-6xl font-bold text-white leading-tight font-lexend">
              The Matrix is Automating.<br />Sync Now or Be Replaced.
            </h2>
            <p className="text-red-100 mt-8 text-xl lg:text-2xl max-w-2xl mx-auto font-light leading-relaxed">
              Stop paying the manual tax. Initialize your strategy session for full AI transition.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12">
              <button 
                onClick={() => window.open('https://cal.com/sumahi-ai-hqp1nf/secret', '_blank')}
                className="bg-slate-950 text-white px-12 py-6 rounded-2xl text-xl font-bold hover:bg-black transition-all shadow-2xl hover:scale-105 active:scale-95 w-full sm:w-auto"
              >
                Secure Implementation Slot
              </button>
              <button 
                onClick={() => window.open('https://wa.me/918074251396?text=I%20want%20AI%20automation%20for%20my%20agency', '_blank')}
                className="bg-white text-red-700 px-12 py-6 rounded-2xl text-xl font-bold hover:bg-slate-100 transition-all shadow-2xl hover:scale-105 active:scale-95 w-full sm:w-auto border-2 border-red-800/20"
              >
                Direct WhatsApp Link
              </button>
            </div>
            <div className="mt-8 text-red-200 text-sm font-bold uppercase tracking-[0.2em]">
              High-priority slots limited to 2 per cycle
            </div>
          </div>
        </section>
      </main>

      <Footer />
      
      {/* Persistent Floating Contact & AI Interaction */}
      <WhatsAppButton />
      <VoiceBot />

      {/* Global Animation Styles */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0); }
          50% { transform: translateY(-20px) rotate(1deg); }
        }
        .animate-float-slow {
          animation: float 8s infinite ease-in-out;
        }
        .animate-float-delayed {
          animation: float 10s infinite ease-in-out;
          animation-delay: 2s;
        }
        @keyframes logoPulse {
          0%, 100% { opacity: 1; transform: scale(1); filter: drop-shadow(0 0 0 rgba(220,38,38,0)); }
          50% { opacity: 0.9; transform: scale(1.02); filter: drop-shadow(0 0 8px rgba(220,38,38,0.4)); }
        }
        .animate-logo-pulse {
          animation: logoPulse 4s infinite ease-in-out;
        }
        @keyframes shimmer {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        .animate-shimmer {
          animation: shimmer 6s linear infinite;
        }
        @keyframes stream {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(100%); opacity: 0; }
        }
        .animate-stream-1 { animation: stream 12s linear infinite; }
        .animate-stream-2 { animation: stream 8s linear infinite; animation-delay: 2s; }
        .animate-stream-3 { animation: stream 10s linear infinite; animation-delay: 4s; }
      `}</style>
    </div>
  );
};

export default App;