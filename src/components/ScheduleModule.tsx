import React from 'react';
import { useOnboarding } from '../store';
import { Clock, Video, User, CheckCircle2, ChevronRight, Calendar, ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';

interface ScheduleProps {
  onNext: () => void;
  onBack: () => void;
}

export const ScheduleModule: React.FC<ScheduleProps> = ({ onNext, onBack }) => {
  const { employees, activeEmployeeId, schedule } = useOnboarding();
  const emp = employees.find(e => e.id === activeEmployeeId) || employees[0];

  const empSchedule = schedule.filter(s => s.employeeId === emp.id);

  const getIconClass = (type: string) => {
    switch (type) {
      case 'induction': return 'bg-cyan-50 text-cyan-600 border-cyan-100';
      case 'manager': return 'bg-purple-50 text-purple-600 border-purple-100';
      case 'team': return 'bg-teal-50 text-teal-600 border-teal-100';
      case 'it': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'lunch': return 'bg-amber-50 text-amber-600 border-amber-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5 text-left">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-amber-500 font-bold">Phase 2: First Day Welcome</span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Your Action-Packed Day 1 Timetable</h2>
          <p className="text-slate-500 text-sm mt-1">
            Structured hour-by-hour meetings to integrate you smoothly with HR, systems, managers, and your immediate peer buddy.
          </p>
        </div>
        <div className="bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 text-xs font-mono font-bold flex items-center space-x-1 self-start select-none">
          <Calendar className="w-4 h-4 text-amber-400" />
          <span>DATE: {emp.startDate}</span>
        </div>
      </div>

      {/* Grid: Timetable list and Onboarding Swag Confirmation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
        {/* Day 1 Timeline list */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="text-sm font-extrabold text-slate-800 tracking-tight uppercase mb-4">
              Hourly Schedule & Event Milestones
            </h3>

            <div className="relative border-l-2 border-slate-100 pl-4 space-y-6 ml-3">
              {empSchedule.map((item, idx) => (
                <div key={item.id} className="relative group">
                  {/* Outer circle marker */}
                  <span className={`absolute -left-[25px] top-1.5 w-4.5 h-4.5 rounded-full border-4 border-white ${
                    idx === 0 ? 'bg-cyan-500' : 'bg-slate-300'
                  }`} />

                  <div className={`p-4 rounded-xl border transition hover:shadow-sm ${getIconClass(item.type)}`}>
                    <div className="flex flex-wrap items-center justify-between gap-2.5">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span className="text-xs font-bold font-mono tracking-wide">{item.time} ({item.duration})</span>
                        <span className="text-[10px] uppercase font-bold tracking-wider opacity-80 px-1.5 py-0.5 rounded bg-black/5">
                          {item.type}
                        </span>
                      </div>
                      
                      <a
                        href={item.joinUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-indigo-650 bg-slate-900 hover:bg-slate-800 text-white rounded-lg px-2.5 py-1 text-[11px] font-semibold flex items-center space-x-1 transition cursor-pointer text-center"
                      >
                        <Video className="w-3.5 h-3.5 text-cyan-300" />
                        <span>Join Teams Meet</span>
                      </a>
                    </div>

                    <h4 className="text-sm font-extrabold text-slate-850 mt-2">{item.title}</h4>
                    <p className="text-xs text-slate-600 mt-1">{item.description}</p>
                    
                    <div className="flex items-center space-x-1 mt-3 pt-2.5 border-t border-black/5 text-[11px] font-mono opacity-85">
                      <User className="w-3.5 h-3.5" />
                      <span>Hosted by: <strong className="font-semibold">{item.host}</strong></span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Joining instruction Details card */}
        <div className="space-y-4">
          <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 shadow-md">
            <h3 className="text-sm font-extrabold text-cyan-300 uppercase block mb-3">
              Office Location & Room details
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4 text-left">
              If reporting in-person to our campus/corporate hubs, here are your access instructions and room codes:
            </p>

            <div className="space-y-3 text-xs font-mono">
              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/40 text-left">
                <span className="text-[10px] text-slate-400 block font-bold">REPORING HUB LOCATION:</span>
                <p className="text-slate-200 mt-1 font-sans">{emp.location}</p>
              </div>
              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/40 text-left">
                <span className="text-[10px] text-slate-400 block font-bold">LOBBY RECEPTION CODE:</span>
                <p className="text-emerald-400 mt-1">#ONBOARD-ENTERPRISE-2026</p>
              </div>
              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/40 text-left">
                <span className="text-[10px] text-slate-400 block font-bold">ONBOARDING CONFERENCE SUITE:</span>
                <p className="text-slate-200 mt-1 font-sans">Level 4, "Apollo Suite" Center</p>
              </div>
            </div>

            <button
              onClick={() => {
                alert('Calendar events triggered! Added to Google Calendar successfully.');
              }}
              className="mt-6 w-full bg-cyan-400 hover:bg-cyan-500 text-slate-950 text-xs font-bold py-2.5 rounded-xl transition duration-150 inline-flex items-center justify-center space-x-1.5 cursor-pointer shadow"
            >
              <Calendar className="w-4 h-4" />
              <span>Sync All Event Appointments</span>
            </button>
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
          <span>IT Setup & Access</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
