import React, { useState } from 'react';
import { useOnboarding } from '../store';
import { Briefcase, CheckCircle2, Goal, TrendingUp, HelpCircle, ArrowLeft, ArrowRight, UserCheck } from 'lucide-react';

interface RoleProps {
  onNext: () => void;
  onBack: () => void;
}

export const RoleModule: React.FC<RoleProps> = ({ onNext, onBack }) => {
  const { employees, activeEmployeeId } = useOnboarding();
  const emp = employees.find(e => e.id === activeEmployeeId) || employees[0];

  // Goals check simulated state
  const [goals, setGoals] = useState([
    { id: 1, text: 'Confirm First-Week introduction coffees with Onboarding Buddy (Claire Redfield)', done: false },
    { id: 2, text: 'Complete mandatory "Information Security Basics" compliance assessment curriculum', done: false },
    { id: 3, text: 'Review department core SLA guidelines and study pre-approved system wireframes', done: false },
    { id: 4, text: 'Define 30-Day performance expectations & OKRs with Hiring Manager', done: false }
  ]);

  const [acknowledged, setAcknowledged] = useState(false);

  const toggleGoal = (id: number) => {
    setGoals(prev => prev.map(g => g.id === id ? { ...g, done: !g.done } : g));
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5 text-left">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-orange-500 font-bold">Phase 3: Operational alignment</span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Role, Mandates & 30-Day Goals</h2>
          <p className="text-slate-500 text-sm mt-1">
            Review detailed job expectations, success criteria metrics, and key performance expectations.
          </p>
        </div>
        <div className="flex items-center space-x-1 px-2.5 py-1.5 bg-orange-50 text-orange-850 text-xs font-mono font-bold rounded-lg self-start select-none">
          <Briefcase className="w-4 h-4 text-orange-500 mr-0.5" />
          <span>Role: {emp.role}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
        {/* Core role goals checklist */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <h3 className="text-sm font-extrabold text-slate-800 uppercase flex items-center">
              <Goal className="w-4 h-4 mr-1 text-cyan-500" />
              <span>Your First-Month Milestone Objectives</span>
            </h3>

            <p className="text-xs text-slate-500">
              Complete these targeted milestones during your pre-joining and first-month phases. Touch checkboxes to mark progress:
            </p>

            <div className="space-y-2 pt-1">
              {goals.map((goal) => (
                <div
                  key={goal.id}
                  onClick={() => toggleGoal(goal.id)}
                  className={`p-3.5 rounded-xl border cursor-pointer flex items-center space-x-3 transition-all ${
                    goal.done ? 'bg-emerald-50/20 border-emerald-100 text-slate-500' : 'bg-slate-50/20 border-slate-100/80 text-slate-850 hover:bg-slate-50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={goal.done}
                    onChange={() => {}} // handled by parent click
                    className="rounded text-orange-500 focus:ring-orange-500 cursor-pointer"
                  />
                  <span className={`text-xs font-medium ${goal.done ? 'line-through' : ''}`}>{goal.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Expectation review and e-sign match */}
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 text-white p-5 rounded-2xl shadow-sm space-y-2">
            <h3 className="text-xs font-extrabold text-cyan-300 uppercase block mb-1">
              Manager expectations Alignment
            </h3>
            
            <div className="space-y-3 pt-2 text-xs text-slate-300">
              <div className="border-b border-slate-850 pb-2">
                <span className="text-[10px] text-slate-400 font-mono font-bold">REPORTING DIRECTOR:</span>
                <p className="font-semibold text-slate-100 text-sm font-sans">{emp.managerName}</p>
                <p className="text-[10px] text-slate-500 uppercase mt-0.5">({emp.startDate} Day-1 Connect scheduled)</p>
              </div>

              <div className="border-b border-slate-850 pb-2">
                <span className="text-[10px] text-slate-400 font-mono font-bold">CORE SUCCESS CRITERIA:</span>
                <p className="font-sans leading-relaxed text-slate-400 mt-1">
                  1) High compliance safety passing percentage. <br />
                  2) Fluent understanding of product wireframes and database flows. <br />
                  3) Structured check-ins at Day 7, 15 and 30.
                </p>
              </div>
            </div>

            {acknowledged ? (
              <div className="bg-emerald-900/20 text-emerald-350 p-3.5 rounded-xl border border-emerald-500/20 text-xs font-bold text-center mt-4">
                ✓ Objectives Acknowledged
              </div>
            ) : (
              <button
                onClick={() => setAcknowledged(true)}
                className="w-full bg-cyan-400 hover:bg-cyan-500 text-slate-950 font-bold text-xs py-2.5 rounded-xl transition mt-4 inline-flex items-center justify-center space-x-1 cursor-pointer"
              >
                <UserCheck className="w-4 h-4" />
                <span>Confirm Goal Alignment</span>
              </button>
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
          <span>Project Onboarding</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
