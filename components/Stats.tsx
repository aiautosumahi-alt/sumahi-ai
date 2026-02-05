
import React from 'react';

const Stats: React.FC = () => {
  const stats = [
    { value: "2 Minutes", label: "Lead Response Time", desc: "Automated instant-engagement" },
    { value: "+38%", label: "Qualified Lead Rate", desc: "Higher conversion floor" },
    { value: "-70%", label: "Proposal Turnaround", desc: "Seconds instead of days" },
    { value: "25%", label: "Ad Spend Recovered", desc: "Fatigue signal mitigation" }
  ];

  return (
    <section className="bg-slate-950 py-20 px-6 relative overflow-hidden border-y border-white/5">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="group flex flex-col items-center">
              <div className="text-4xl lg:text-5xl font-bold text-cyan-400 tracking-tight mb-2 group-hover:scale-110 transition-transform duration-500">
                {stat.value}
              </div>
              <div className="text-white text-sm font-bold uppercase tracking-[0.2em] mb-2">
                {stat.label}
              </div>
              <div className="text-slate-500 text-xs font-medium">
                {stat.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;