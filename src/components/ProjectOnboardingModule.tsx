import React, { useState } from 'react';
import { useOnboarding } from '../store';
import { Layers, CheckCircle2, BookOpen, ExternalLink, HelpCircle, ArrowLeft, ArrowRight, UserCheck } from 'lucide-react';

interface ProjectProps {
  onNext: () => void;
  onBack: () => void;
}

export const ProjectOnboardingModule: React.FC<ProjectProps> = ({ onNext, onBack }) => {
  const { employees, activeEmployeeId } = useOnboarding();
  const emp = employees.find(e => e.id === activeEmployeeId) || employees[0];

  const [materials, setMaterials] = useState([
    { id: 'mat-1', title: 'Product Core System Architectural schematics & Flow charts', type: 'Figma Deck', duration: '30 mins', read: false },
    { id: 'mat-2', title: 'Developer IaC Guidelines & Docker Container configuration specifications', type: 'Git Wiki', duration: '45 mins', read: false },
    { id: 'mat-3', title: 'SOC2 Security Guidelines & Personal Identifiable Data masking frameworks', type: 'PDF Handbook', duration: '20 mins', read: false }
  ]);

  const [readinessConfirmed, setReadinessConfirmed] = useState(false);

  const markRead = (id: string) => {
    setMaterials(prev => prev.map(m => m.id === id ? { ...m, read: !m.read } : m));
  };

  const allRead = materials.every(m => m.read);

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5 text-left">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-teal-600 font-bold">Phase 3: Operational alignment</span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight font-sans">Project Functional integration</h2>
          <p className="text-slate-500 text-sm mt-1">
            Access project-specific statements of work, review standard operating procedures, and sync with designated subject matter experts.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
        {/* SOP reading materials */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <h3 className="text-sm font-extrabold text-slate-800 uppercase flex items-center">
              <BookOpen className="w-4 h-4 mr-1 text-teal-500" />
              <span>Project Knowledge Base & Recordings</span>
            </h3>

            <p className="text-xs text-slate-500 leading-normal mb-3">
              Review these essential standard SOP guidelines to familiarize yourself with production workflows. Mark them completed as you study:
            </p>

            <div className="space-y-3">
              {materials.map((item) => (
                <div key={item.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start space-x-3 max-w-lg">
                    <input
                      type="checkbox"
                      checked={item.read}
                      onChange={() => markRead(item.id)}
                      className="rounded text-teal-500 mt-1 cursor-pointer focus:ring-teal-500"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-slate-850">{item.title}</h4>
                      <span className="text-[9px] font-mono bg-teal-50 text-teal-700 px-1.5 py-0.5 rounded uppercase mt-1 inline-block">
                        Format: {item.type} • Read-time: {item.duration}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      markRead(item.id);
                      alert(`Opening mock material Link corresponding to: "${item.title}".`);
                    }}
                    className="shrink-0 text-slate-400 hover:text-teal-600 p-1.5 hover:bg-slate-50 rounded-lg transition"
                    title="Launch resource wiki"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Assigned Subject Matter Experts (SMEs) */}
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 text-white p-5 rounded-2xl shadow-sm space-y-4">
            <h3 className="text-xs font-extrabold text-cyan-300 uppercase block mb-1">
              Project Subject Matter Experts (SMEs)
            </h3>

            <div className="space-y-3.5 text-xs text-left">
              <div className="bg-slate-850 p-3 rounded-xl border border-slate-800 flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center font-bold font-mono text-cyan-400 border border-cyan-400/20">
                  DM
                </div>
                <div>
                  <h4 className="font-bold text-slate-200">David Mercer</h4>
                  <p className="text-[10px] text-slate-400">Principal Architect (SME: System design)</p>
                </div>
              </div>

              <div className="bg-slate-850 p-3 rounded-xl border border-slate-800 flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center font-bold font-mono text-purple-400 border border-purple-400/20">
                  CR
                </div>
                <div>
                  <h4 className="font-bold text-slate-200">Claire Redfield</h4>
                  <p className="text-[10px] text-slate-400">Design Lead (SME: Figma system setup)</p>
                </div>
              </div>
            </div>

            {readinessConfirmed ? (
              <div className="bg-emerald-900/20 text-emerald-350 p-3 rounded-xl border border-emerald-500/20 text-xs font-bold text-center mt-3">
                ✓ Assessment readiness signed off
              </div>
            ) : (
              <button
                onClick={() => setReadinessConfirmed(true)}
                disabled={!allRead}
                className="w-full bg-cyan-400 hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-bold text-xs py-2.5 rounded-xl transition mt-3 flex items-center justify-center space-x-1.5 cursor-pointer shadow"
              >
                <UserCheck className="w-4.5 h-4.5" />
                <span>Sign Off Technical readiness Plan</span>
              </button>
            )}
            {!allRead && (
              <span className="block text-[10px] text-slate-500 text-center">
                *Study all SOPs directories first to enable assessment sign-off button triggers.
              </span>
            )}
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
          <span>Onboarding Checklist</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
