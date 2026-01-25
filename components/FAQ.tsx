
import React, { useState } from 'react';
import { FAQItem } from '../types';

const FAQ: React.FC = () => {
  const faqs: FAQItem[] = [
    {
      question: "Is this just another AI chatbot setup?",
      answer: "No. Sumahi Ai builds infrastructure. Chatbots are a single interface; we build the back-end logic that connects your marketing traffic to your CRM, pricing models, and creative assets. It's a system, not a script."
    },
    {
      question: "How much work is required from my team?",
      answer: "We offer a Done-For-You implementation. Aside from the initial discovery workshop and access to your API keys, our team handles the architecture, technical build, and integration testing."
    },
    {
      question: "How long until we see measurable ROI?",
      answer: "Most clients see a measurable drop in lead response time and an increase in content output within 14-21 days of deployment. Full system ROI is guaranteed within 90 days."
    },
    {
      question: "Can we integrate this with custom internal software?",
      answer: "Yes. Our systems are built to be modular. We can hook into proprietary databases or specialized CRM software using custom API endpoints."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 px-6 bg-slate-50 scroll-mt-20">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 font-lexend">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className={`bg-white rounded-[1.5rem] border transition-all overflow-hidden ${
                openIndex === idx ? 'border-emerald-200 shadow-lg' : 'border-slate-100'
              }`}
            >
              <button 
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full px-8 py-6 flex items-center justify-between text-left"
              >
                <span className="font-bold text-lg text-slate-800">{faq.question}</span>
                <span className={`transform transition-transform duration-300 ${openIndex === idx ? 'rotate-180' : ''}`}>
                  <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </span>
              </button>
              <div 
                className={`px-8 transition-all duration-300 ease-in-out ${
                  openIndex === idx ? 'pb-8 max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-slate-600 leading-relaxed font-medium">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
