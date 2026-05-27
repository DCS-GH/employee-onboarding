import React, { useState } from 'react';
import { useOnboarding } from '../store';
import { Bell, User, Settings, ShieldAlert, CheckCircle, RefreshCw, Layers } from 'lucide-react';
import { avatarDataUri, useAvatarFallback } from '../avatar';

export const Header: React.FC = () => {
  const {
    employees,
    activeEmployeeId,
    setActiveEmployeeId,
    currentRole,
    setCurrentRole,
    notifications,
    clearNotification,
    resetToDefault
  } = useOnboarding();

  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const currentEmp = employees.find(e => e.id === activeEmployeeId) || employees[0];

  // Filter unread notifications for active employee
  const activeNotifications = notifications.filter(
    n => n.employeeId === (currentRole === 'Employee' ? activeEmployeeId : n.employeeId) && !n.read
  );

  const roles = [
    { id: 'Employee', label: '👋 Joined Employee' },
    { id: 'HR', label: '💼 HR Administrator' },
    { id: 'Manager', label: '📊 Hiring Manager' },
    { id: 'IT', label: '🖥️ IT Operations Desk' },
    { id: 'Payroll', label: '💳 Payroll & Finance' },
    { id: 'Coordinator', label: '🎓 Learning Coordinator' }
  ];

  return (
    <header className="sticky top-0 z-50 flex flex-col md:flex-row items-center justify-between bg-white text-slate-800 px-6 py-4 shadow-sm border-b border-slate-200">
      {/* Brand Logo & Switch Indicator */}
      <div className="flex items-center space-x-3 w-full md:w-auto justify-between md:justify-start">
        <div className="flex items-center space-x-2.5 text-left">
          <div className="bg-teal-600 p-1.5 rounded-lg">
            <Layers className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-900 tracking-tight">
              OnboardEase
            </h1>
            <p className="text-[9px] text-slate-400 font-bold tracking-wider font-mono">ONBOARDING SYSTEMS</p>
          </div>
        </div>
        
        {/* Mobile menu trigger could go here */}
        <button
          onClick={resetToDefault}
          title="Reset local state back to seed default data"
          className="md:hidden p-2 text-slate-400 hover:text-rose-600 hover:bg-slate-50 rounded-lg transition-all"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Control Panel: Simulation Box (HR, Manager, etc.) */}
      <div className="flex flex-wrap items-center gap-2.5 mt-3 md:mt-0 bg-slate-50 p-2 md:p-1.5 rounded-xl border border-slate-200 max-w-full">
        {/* Simulation Label */}
        <div className="hidden lg:flex items-center space-x-1.5 px-2 py-1 text-slate-500 text-xs font-mono font-semibold">
          <Settings className="w-3.5 h-3.5 text-teal-600" />
          <span>SIMULATED PERSONA ROLE:</span>
        </div>

        {/* Persona Role Switcher */}
        <select
          value={currentRole}
          onChange={(e) => setCurrentRole(e.target.value)}
          className="bg-white border border-slate-200 text-xs text-teal-800 font-bold px-3 py-1.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 cursor-pointer shadow-sm hover:bg-slate-50/50 transition-all font-sans"
        >
          {roles.map(r => (
            <option key={r.id} value={r.id} className="text-slate-800 bg-white font-sans">{r.label}</option>
          ))}
        </select>

        {/* If persona is Employee, selection of joiners to experience different phases */}
        {currentRole === 'Employee' && (
          <div className="flex items-center space-x-2">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">JOINER:</span>
            <select
              value={activeEmployeeId}
              onChange={(e) => setActiveEmployeeId(e.target.value)}
              className="bg-white border border-slate-200 text-xs text-slate-800 font-semibold px-2.5 py-1.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 cursor-pointer shadow-sm hover:bg-slate-50/50 transition-all font-sans"
            >
              {employees.map(emp => (
                <option key={emp.id} value={emp.id} className="font-sans">
                  {emp.name} ({emp.currentPhase})
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Global Reset Switcher */}
        <button
          onClick={resetToDefault}
          title="Reset Portal to Factory Seeds"
          className="hidden md:flex items-center space-x-1 px-2.5 py-1.5 bg-white hover:bg-rose-50 hover:border-rose-200 border border-slate-200 text-slate-500 hover:text-rose-600 rounded-lg text-xs font-mono transition-all cursor-pointer shadow-sm"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span className="hidden xl:inline">Reset State</span>
        </button>
      </div>

      {/* User Information & Notification Bell */}
      <div className="flex items-center space-x-4 mt-3 md:mt-0">
        {/* Notifications Tray Trigger */}
        <div className="relative">
          <button
            onClick={() => setShowNotifDropdown(!showNotifDropdown)}
            className="p-2 text-slate-600 hover:text-teal-700 bg-white hover:bg-slate-50 rounded-xl border border-slate-200 transition relative shadow-sm cursor-pointer"
          >
            <Bell className="w-5 h-5" />
            {activeNotifications.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold border border-white">
                {activeNotifications.length}
              </span>
            )}
          </button>

          {/* Notification List Panel */}
          {showNotifDropdown && (
            <div className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50">
              <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                <span className="text-sm font-semibold text-slate-800">System Notifications</span>
                <span className="text-[10px] bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full font-bold border border-teal-100 font-mono">
                  {activeNotifications.length} Active
                </span>
              </div>
              <div className="max-h-64 overflow-y-auto divide-y divide-slate-100">
                {activeNotifications.length === 0 ? (
                  <div className="px-4 py-6 text-center text-slate-400 text-xs">
                    <CheckCircle className="w-6 h-6 text-teal-600/40 mx-auto mb-2" />
                    All caught up! No unread reminders.
                  </div>
                ) : (
                  activeNotifications.map(n => (
                    <div key={n.id} className="p-3 bg-white hover:bg-slate-50/80 transition-all text-left">
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-bold text-slate-800">{n.title}</span>
                        <span className="text-[9px] text-slate-400">{n.date}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">{n.message}</p>
                      <button
                        onClick={() => clearNotification(n.id)}
                        className="text-[10px] text-teal-600 hover:text-teal-700 hover:underline mt-2 font-mono font-bold"
                      >
                        [Mark Read]
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Card */}
        <div className="flex items-center space-x-3 bg-slate-50 pl-3 pr-4 py-1.5 rounded-xl border border-slate-200">
          <img
            src={currentRole === 'Employee' ? currentEmp.photoUrl : avatarDataUri('OPS Director', 1)}
            alt="Role Profile"
            referrerPolicy="no-referrer"
            onError={useAvatarFallback(currentRole === 'Employee' ? currentEmp.name : 'OPS Director', 1)}
            className="w-10 h-10 rounded-full object-cover border border-teal-500 shadow-sm"
          />
          <div className="hidden sm:block text-left">
            <p className="text-sm font-bold text-slate-800 truncate max-w-[120px]">
              {currentRole === 'Employee' ? currentEmp.name : 'OPS. Director'}
            </p>
            <p className="text-[10px] font-bold font-mono text-teal-600 tracking-wider">
              {currentRole.toUpperCase()} USER
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};
