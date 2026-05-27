import React from 'react';
import { useOnboarding } from '../store';
import { ShieldCheck, Calendar, BookOpen, Check, HelpCircle, FileText, ArrowLeft, ArrowRight, CheckSquare } from 'lucide-react';

interface PoliciesProps {
  onNext: () => void;
  onBack: () => void;
}

export const PoliciesModule: React.FC<PoliciesProps> = ({ onNext, onBack }) => {
  const { policies, acknowledgePolicy } = useOnboarding();

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5 text-left">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-pink-500 font-bold">Phase 1: Compliance Signoff</span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Active Company Policy Declarations</h2>
          <p className="text-slate-500 text-sm mt-1">
            Incoming employees must read, understand, and digitally acknowledge all ethical and security standard templates.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
        {/* Policy list */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <h3 className="text-sm font-extrabold text-slate-800 uppercase">
              Policies Acknowledgment Deck
            </h3>

            <div className="space-y-4">
              {policies.map((item) => (
                <div key={item.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/15 flex flex-col sm:flex-row sm:items-start justify-between gap-4 transition hover:border-pink-500/10 hover:shadow-sm">
                  <div className="flex items-start space-x-3.5 max-w-xl">
                    <div className="bg-slate-100 p-2.5 rounded-xl text-slate-600 self-start">
                      <FileText className="w-5 h-5 text-pink-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-800">{item.title}</h4>
                      <span className="text-[9px] font-mono bg-pink-50 text-pink-700 px-1.5 py-0.5 rounded uppercase mt-1 inline-block">
                        {item.category} • Size: {item.fileSize}
                      </span>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        {item.description}
                      </p>
                      
                      {item.isAcknowledged && item.acknowledgedAt && (
                        <span className="block text-[10px] text-emerald-600 font-mono font-bold mt-2.5">
                          ✓ Digitally acknowledged on {item.acknowledgedAt}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="shrink-0 self-end sm:self-center">
                    {item.isAcknowledged ? (
                      <div className="bg-emerald-50 text-emerald-800 border border-emerald-100 px-3 py-1.5 rounded-xl font-bold text-xs flex items-center space-x-1">
                        <Check className="w-4 h-4 text-emerald-500" />
                        <span>Acknowledged</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => acknowledgePolicy(item.id)}
                        className="bg-slate-900 duration-150 text-white hover:bg-slate-800 text-xs font-semibold px-4 py-2 rounded-xl flex items-center space-x-1.5 cursor-pointer shadow"
                      >
                        <CheckSquare className="w-4 h-4 text-pink-400" />
                        <span>Sign & Acknowledge</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legal constraints */}
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 text-white p-5 rounded-2xl shadow-sm">
            <h3 className="text-xs font-extrabold text-cyan-300 uppercase block mb-3">
              Corporate Directives & Disclaimers
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed text-left">
              These policy signoffs are legally binding components of your employment agreement. They prevent unauthorized export of source codes, visual templates, and hardware allocations.
            </p>
            <div className="bg-slate-850 p-3.5 rounded-xl border border-slate-850 mt-4 text-left font-mono text-[10px] text-slate-400 leading-normal">
              <strong>IP CLAUSE RECAP:</strong> All designs, models, code scripts, and system configurations made or triggered inside enterprise equipment rest fully in corporate custody.
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-8 pt-5 border-t border-slate-100">
        <button
          onClick={onBack}
          className="flex items-center justify-center space-x-1 border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 font-semibold px-4 py-2.5 rounded-xl text-xs transition duration-150 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous Step</span>
        </button>

        <button
          onClick={onNext}
          className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-xs font-semibold px-5 py-2.5 rounded-xl hover:from-teal-600 hover:to-cyan-600 transition duration-150 flex items-center justify-center space-x-1 shadow-md cursor-pointer"
        >
          <span>Benefits & Payroll</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
