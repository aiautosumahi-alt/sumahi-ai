
import React from 'react';

const InfrastructureStack: React.FC = () => {
  const items = [
    {
      icon: (
        <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "AI Sales OS",
      description: "Qualifies leads, calculates pricing fit, and auto-generates proposals within seconds of an inquiry. Hooks directly into your CRM.",
      features: ["Instant Proposal Generation", "CRM Lead Scoring Integration", "Automated Calendar Routing"]
    },
    {
      icon: (
        <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      title: "AI Content OS",
      description: "Automated repurposing engine. Input one pillar asset and receive 20+ platform-optimized carousels, reels, and threads.",
      features: ["10x Content Production Speed", "Multi-Platform SEO Mapping", "Automated Post Scheduling"]
    },
    {
      icon: (
        <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "AI Ad Guardrails",
      description: "Real-time monitoring of CPC/ROAS fatigue with automated budget reallocation. Never pay for wasted impressions again.",
      features: ["20-25% Spend Recovery", "Fatigue Signal Detection", "24/7 Automated Scaling"]
    }
  ];

  return (
    <section id="infrastructure" className="py-24 px-6 bg-slate-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 font-lexend">The AI Infrastructure Stack</h2>
          <p className="text-slate-600 mt-4 max-w-2xl mx-auto italic text-lg font-light">Complete systems engineered to eliminate the "Manual Tax" from your agency operations.</p>
        </div>
        <div className="grid lg:grid-cols-3 gap-10">
          {items.map((item, idx) => (
            <div key={idx} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 group">
              <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <span className="group-hover:text-white transition-colors">{item.icon}</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed mb-8">{item.description}</p>
              <ul className="space-y-4">
                {item.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-3 text-slate-700 font-medium">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                      <svg className="w-3 h-3 text-emerald-600" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path></svg>
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfrastructureStack;
