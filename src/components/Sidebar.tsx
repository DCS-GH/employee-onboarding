import React from 'react';
import { useOnboarding } from '../store';
import { useAvatarFallback } from '../avatar';
import {
  Home,
  UserPlus,
  FileText,
  Calendar,
  Cpu,
  Users,
  GraduationCap,
  ShieldCheck,
  DollarSign,
  Briefcase,
  Layers,
  CheckSquare,
  MessageSquare,
  BellRing,
  LayoutDashboard,
  BarChart2,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

interface SidebarProps {
  activeModule: string;
  setActiveModule: (module: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeModule, setActiveModule, isOpen, setIsOpen }) => {
  const { currentRole, employees, activeEmployeeId } = useOnboarding();
  const activeEmp = employees.find(e => e.id === activeEmployeeId) || employees[0];

  const employeeModules = [
    { id: 'dashboard', label: '1. Welcome Dashboard', icon: Home, color: 'text-slate-400' },
    { id: 'preboarding', label: '2. Pre-boarding Details', icon: UserPlus, color: 'text-slate-400' },
    { id: 'documents', label: '3. Documents & Forms', icon: FileText, color: 'text-slate-400' },
    { id: 'schedule', label: '4. First Day Schedule', icon: Calendar, color: 'text-slate-400' },
    { id: 'itsetup', label: '5. IT Setup & Access', icon: Cpu, color: 'text-slate-400' },
    { id: 'team', label: '6. Meet Your Team', icon: Users, color: 'text-slate-400' },
    { id: 'training', label: '7. Training & Learning', icon: GraduationCap, color: 'text-slate-400' },
    { id: 'policies', label: '8. Policies & Compliance', icon: ShieldCheck, color: 'text-slate-400' },
    { id: 'payroll', label: '9. Benefits & Payroll', icon: DollarSign, color: 'text-slate-400' },
    { id: 'role', label: '10. Role & Expectations', icon: Briefcase, color: 'text-slate-400' },
    { id: 'project', label: '11. Project Onboarding', icon: Layers, color: 'text-slate-400' },
    { id: 'checklist', label: '12. Tasks & Checklist', icon: CheckSquare, color: 'text-slate-400' },
    { id: 'feedback', label: '13. Feedback & Support', icon: MessageSquare, color: 'text-slate-400' },
    { id: 'notifications', label: '14. System Notifications', icon: BellRing, color: 'text-slate-400' },
  ];

  const adminModules = [
    { id: 'admin', label: '15. Admin / HR Console', icon: LayoutDashboard, color: 'text-slate-400', badge: 'Manager' },
    { id: 'analytics', label: '16. Reports & Analytics', icon: BarChart2, color: 'text-slate-400', badge: 'Exec' },
  ];

  const handleNav = (id: string) => {
    setActiveModule(id);
    // Auto collapse on low-res triggers
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Sticky Sidebar Trigger */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gradient-to-tr from-teal-600 to-cyan-700 text-white p-4 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all border border-teal-500/30"
          id="sidebar-toggle"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Actual Sidebar Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 bg-white border-r border-slate-200 text-slate-700 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static flex flex-col justify-between overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 flex-1">
          {/* Active Joiner Stats Panel (Employee perspective) */}
          {currentRole === 'Employee' ? (
            <div className="mb-6 bg-slate-50 rounded-xl p-3.5 border border-slate-200">
              <span className="text-[10px] text-slate-400 tracking-widest font-mono font-bold block mb-1">
                ACTIVE COHORT MAP
              </span>
              <div className="flex items-center space-x-3 mb-2">
                <div className="relative">
                  <img
                    src={activeEmp.photoUrl}
                    alt={activeEmp.name}
                    referrerPolicy="no-referrer"
                    onError={useAvatarFallback(activeEmp.name, 0)}
                    className="w-10 h-10 rounded-full object-cover border border-teal-500 shadow-sm"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
                </div>
                <div className="min-w-0 text-left">
                  <h4 className="text-xs font-bold text-slate-900 truncate">{activeEmp.name}</h4>
                  <span className="text-[10px] text-teal-700 font-extrabold px-1.5 py-0.5 bg-teal-50 border border-teal-100 rounded font-mono mt-0.5 inline-block">
                    {activeEmp.currentPhase}
                  </span>
                </div>
              </div>
              
              {/* Core Onboarding Gauge */}
              <div>
                <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 font-bold mb-1">
                  <span>ONBOARD LEVEL</span>
                  <span>{activeEmp.completionPercentage}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-teal-600 h-1.5 rounded-full duration-1000 transition-all"
                    style={{ width: `${activeEmp.completionPercentage}%` }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="mb-6 bg-teal-50 rounded-xl p-3.5 border border-teal-100 text-teal-950">
              <div className="flex items-center space-x-2 text-left">
                <span className="w-2 h-2 bg-teal-600 rounded-full animate-ping" />
                <span className="text-xs font-extrabold tracking-wide uppercase text-teal-850">Admin Console Mode</span>
              </div>
              <p className="text-[10px] text-slate-600 mt-1 font-mono text-left font-semibold">
                Active role: {currentRole}. You have compliance override and authorization privileges.
              </p>
            </div>
          )}

          {/* Module Nav 1-14 (Employee Journey) */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase pl-2 mb-2 block font-mono text-left">
              Employee Journey
            </span>
            {employeeModules.map((m) => {
              const Icon = m.icon;
              const isActive = activeModule === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => handleNav(m.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all group cursor-pointer ${
                    isActive
                      ? 'bg-teal-50 text-teal-900 font-extrabold shadow-sm border border-teal-100'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-4 h-4 ${m.color} duration-300 group-hover:scale-110`} />
                    <span className="truncate">{m.label}</span>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isActive ? 'rotate-90 text-teal-600' : ''}`} />
                </button>
              );
            })}

            {/* Module Nav 15-16 (Admin Hub) */}
            <div className="pt-4 border-t border-slate-100 mt-4 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase pl-2 mb-2 block font-mono text-left">
                Management Ops
              </span>
              {adminModules.map((m) => {
                const Icon = m.icon;
                const isActive = activeModule === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => handleNav(m.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all group cursor-pointer ${
                      isActive
                        ? 'bg-rose-50 text-rose-900 font-extrabold shadow-sm border border-rose-100'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className={`w-4 h-4 ${m.color} duration-300 group-hover:scale-110`} />
                      <span className="truncate">{m.label}</span>
                    </div>
                    <span className="text-[9px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-bold font-mono border border-slate-200">
                      {m.badge}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Brand Signoff */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 text-center">
          <p className="text-[10px] text-slate-500 font-mono font-bold">Company Onboarding System</p>
          <p className="text-[9px] text-slate-400 mt-0.5 italic">Powered by Google AI Studio</p>
        </div>
      </aside>
    </>
  );
};
