
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import InfrastructureStack from './components/InfrastructureStack';
import GrowthAuditor from './components/GrowthAuditor';
import TrustSecurity from './components/TrustSecurity';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
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
        <section className="py-24 bg-emerald-600 px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-6xl font-bold text-white leading-tight font-lexend">
              Your Competitors Are Automating.<br />Will You Catch Up or Be Replaced?
            </h2>
            <p className="text-emerald-100 mt-8 text-xl lg:text-2xl max-w-2xl mx-auto font-light leading-relaxed">
              Stop paying the "Manual Tax." Book your strategy session to see the roadmap for your agency's AI transformation.
            </p>
            <button 
              onClick={() => window.open('https://cal.com/sumahi-ai-hqp1nf/secret', '_blank')}
              className="mt-12 bg-slate-900 text-white px-12 py-6 rounded-2xl text-2xl font-bold hover:bg-black transition-all shadow-2xl hover:scale-105 active:scale-95"
            >
              Book Your AI Strategy Session
            </button>
            <div className="mt-8 text-emerald-200 text-sm font-bold uppercase tracking-[0.2em]">
              Limited to 2 Implementation slots per month
            </div>
          </div>
        </section>
      </main>

      <Footer />

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
          0%, 100% { opacity: 1; transform: scale(1); filter: drop-shadow(0 0 0 rgba(16,185,129,0)); }
          50% { opacity: 0.9; transform: scale(1.02); filter: drop-shadow(0 0 8px rgba(16,185,129,0.4)); }
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
      `}</style>
    </div>
  );
};

export default App;
