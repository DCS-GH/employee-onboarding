import React from 'react';
import { useOnboarding } from '../store';
import { BellRing, ShieldAlert, Award, Info, CheckCircle, ArrowLeft, ArrowRight, Clock } from 'lucide-react';

interface NotificationsProps {
  onNext: () => void;
  onBack: () => void;
}

export const NotificationsModule: React.FC<NotificationsProps> = ({ onNext, onBack }) => {
  const { employees, activeEmployeeId, notifications, clearNotification } = useOnboarding();
  const emp = employees.find(e => e.id === activeEmployeeId) || employees[0];

  const empNotifs = notifications.filter(n => n.employeeId === emp.id);

  const getIconClass = (category: string) => {
    switch (category) {
      case 'alert': return <ShieldAlert className="w-5 h-5 text-rose-500" />;
      case 'success': return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case 'warning': return <Clock className="w-5 h-5 text-amber-500" />;
      default: return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5 text-left">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-amber-500 font-bold">Phase 1-4: Notifications system</span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight font-sans">Corporate Notifications & Alert Streams</h2>
          <p className="text-slate-500 text-sm mt-1">
            Stay aligned with instant system alerts matching document approvals, scheduled connects, and compliance training guidelines.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
        {/* Alerts directory panel list */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <h3 className="text-sm font-extrabold text-slate-800 uppercase flex items-center space-x-1">
              <BellRing className="w-4.5 h-4.5 text-cyan-500 mr-0.5" />
              <span>Active Notifications logs</span>
            </h3>

            {empNotifs.length === 0 ? (
              <div className="text-center py-10 text-slate-400 border border-dashed border-slate-100 rounded-2xl text-sm">
                No active notifications or alerts corresponding to this employee account profile.
              </div>
            ) : (
              <div className="space-y-3">
                {empNotifs.map((item) => (
                  <div
                    key={item.id}
                    className={`p-4 rounded-xl border flex items-start gap-3.5 transition ${
                      item.read ? 'bg-slate-50/40 border-slate-100/60 opacity-80' : 'bg-white border-slate-100'
                    }`}
                  >
                    <div className="shrink-0 mt-0.5">
                      {getIconClass(item.category)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2.5">
                        <h4 className="text-xs font-bold text-slate-800">{item.title}</h4>
                        <span className="text-[9px] text-slate-400 font-mono">{item.date}</span>
                      </div>
                      <p className="text-xs text-slate-550 text-slate-500 mt-1 leading-normal">{item.message}</p>
                      
                      {!item.read && (
                        <button
                          onClick={() => clearNotification(item.id)}
                          className="mt-2.5 text-[10px] text-cyan-600 hover:text-cyan-700 font-mono font-bold block"
                        >
                          [Mark as Cleared]
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* System automation guidelines trigger parameters */}
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-805 text-white p-5 rounded-2xl shadow-sm text-left space-y-3">
            <h3 className="text-xs font-extrabold text-cyan-300 uppercase block mb-1">
              Automated Operations Triggers
            </h3>
            <p className="text-xs text-slate-300 leading-normal">
              OnboardEase runs native cron hooks mapping state configurations across team folders:
            </p>

            <ul className="space-y-3 leading-normal text-[11px] text-slate-400 font-mono">
              <li className="flex items-start">
                <span className="text-emerald-400 mr-1.5 font-bold">▶</span>
                <span><strong>WELCOME NOTIF:</strong> Sent automatically when profile is initialized.</span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-400 mr-1.5 font-bold">▶</span>
                <span><strong>REMINDERS RUN:</strong> Triggered daily if critical tax details are blank.</span>
              </li>
              <li className="flex items-start">
                <span className="text-rose-400 mr-1.5 font-bold">▶</span>
                <span><strong>ESCALATION RULES:</strong> Overdue checklist milestones flag HR admin queues after 72 hours.</span>
              </li>
            </ul>
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
          <span>Admin & HR Console</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
