import React, { useState } from 'react';
import { useOnboarding } from '../store';
import { CheckSquare, Square, AlertCircle, Clock, Filter, ArrowLeft, ArrowRight, CheckCircle2, User } from 'lucide-react';
import { OnboardingPhase, TaskOwner, OnboardingTask } from '../types';

interface ChecklistProps {
  onNext: () => void;
  onBack: () => void;
}

export const ChecklistModule: React.FC<ChecklistProps> = ({ onNext, onBack }) => {
  const { employees, activeEmployeeId, tasks, updateTaskStatus } = useOnboarding();
  const emp = employees.find(e => e.id === activeEmployeeId) || employees[0];

  const empTasks = tasks.filter(t => t.employeeId === emp.id);

  // States
  const [selectedPhase, setSelectedPhase] = useState<OnboardingPhase | 'All'>('All');
  const [selectedOwner, setSelectedOwner] = useState<TaskOwner | 'All'>('All');

  // Trigger checkbox completion
  const handleToggleTask = (task: OnboardingTask) => {
    const nextStatus = task.status === 'Completed' ? 'Not Started' : 'Completed';
    updateTaskStatus(task.id, nextStatus);
  };

  // Filters application
  const filteredTasks = empTasks.filter(t => {
    const matchesPhase = selectedPhase === 'All' || t.phase === selectedPhase;
    const matchesOwner = selectedOwner === 'All' || t.owner === selectedOwner;
    return matchesPhase && matchesOwner;
  });

  // Calculate dynamic phase completed
  const totalInFiltered = filteredTasks.length;
  const completedInFiltered = filteredTasks.filter(t => t.status === 'Completed' || t.status === 'Verified').length;
  const percentageCompleted = totalInFiltered > 0 ? Math.round((completedInFiltered / totalInFiltered) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5 text-left">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-lime-600 font-bold">Phase 1-4: Master checklists</span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Onboarding Checkpoint Progress Lists</h2>
          <p className="text-slate-500 text-sm mt-1">
            Ensure complete alignment of credentials, systems access, and form compliance by checking tasks step-by-step.
          </p>
        </div>

        {/* Dynamic percentage display */}
        <div className="bg-lime-50 text-lime-800 border border-lime-100 px-3 py-2 rounded-xl text-xs font-mono font-bold flex items-center space-x-1.5 self-start select-none">
          <CheckCircle2 className="w-4 h-4 text-lime-600" />
          <span>Completed: {percentageCompleted}% ({completedInFiltered}/{totalInFiltered})</span>
        </div>
      </div>

      {/* Interactive Phase/Owner filters selector grid */}
      <div className="bg-slate-50 border border-slate-150 rounded-2xl p-4 flex flex-wrap gap-4 items-center">
        <div className="flex items-center space-x-2 text-xs font-mono text-slate-500 font-bold uppercase shrink-0">
          <Filter className="w-4 h-4 text-slate-400" />
          <span>FILTER CHECKS:</span>
        </div>

        {/* Phase Filter Button selectors */}
        <div className="flex flex-wrap gap-1">
          {['All', 'Pre-boarding', 'First Day', 'First Month', 'Support'].map((p) => (
            <button
              key={p}
              onClick={() => setSelectedPhase(p as OnboardingPhase | 'All')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition ${
                selectedPhase === p ? 'bg-slate-900 text-white shadow-sm' : 'bg-white border border-slate-150 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Owner group button selectors */}
        <div className="flex flex-wrap gap-1">
          {['All', 'Employee', 'HR', 'Manager', 'IT'].map((o) => (
            <button
              key={o}
              onClick={() => setSelectedOwner(o as TaskOwner | 'All')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono cursor-pointer transition ${
                selectedOwner === o ? 'bg-indigo-900 text-cyan-300 shadow-sm' : 'bg-white border border-slate-150 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {o}
            </button>
          ))}
        </div>
      </div>

      {/* Checkpoints catalog list */}
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm text-left">
        <h3 className="text-sm font-extrabold text-slate-800 uppercase mb-4">
          Core Onboarding Checkpoints Catalog
        </h3>

        {filteredTasks.length === 0 ? (
          <div className="text-center py-10 border border-dashed border-slate-100 rounded-2xl text-slate-400 text-sm">
            No pending tasks corresponding to active filters. Try resetting triggers.
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTasks.map((task) => {
              const isChecked = task.status === 'Completed' || task.status === 'Verified';
              
              return (
                <div
                  key={task.id}
                  className={`p-4 rounded-xl border transition-all flex items-start gap-3.5 cursor-pointer ${
                    isChecked ? 'bg-slate-50/25 border-slate-100/60' : 'bg-white border-slate-100 hover:bg-slate-50/25'
                  }`}
                  onClick={() => handleToggleTask(task)}
                >
                  <div className="shrink-0 mt-0.5 text-slate-400 hover:text-indigo-500">
                    {isChecked ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <Square className="w-5 h-5 text-slate-300" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                      <h4 className={`text-xs font-bold ${isChecked ? 'text-slate-400 line-through' : 'text-slate-850'}`}>
                        {task.title}
                      </h4>
                      {task.isRequired && !isChecked && (
                        <span className="text-[8px] bg-red-50 text-red-700 font-bold px-1.5 py-0.5 rounded font-mono uppercase shrink-0">
                          MANDATORY
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-550 text-slate-500 mt-1">{task.description}</p>
                    
                    {/* Foot badge options */}
                    <div className="flex flex-wrap gap-3 mt-3 pt-2 border-t border-slate-50 text-[10px] font-mono text-slate-450 text-slate-400">
                      <span>PHASE: <strong className="text-slate-500 font-semibold">{task.phase}</strong></span>
                      <span className="flex items-center">
                        <User className="w-3.5 h-3.5 text-slate-400 mr-0.5" />
                        OWNER: <strong className="text-slate-500 uppercase font-semibold">{task.owner}</strong>
                      </span>
                      <span>DUE: <strong className="text-rose-500">{task.dueDate}</strong></span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
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
          <span>Feedback & Support</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
