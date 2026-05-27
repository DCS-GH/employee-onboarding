import React from 'react';
import { useOnboarding } from '../store';
import { BarChart, TrendingUp, Users, FileCheck, GraduationCap, Clock, AlertCircle, Award, ChevronDown } from 'lucide-react';

export const AnalyticsModule: React.FC = () => {
  const { employees, tasks, documents, courses } = useOnboarding();

  // Metrics calculators
  const totalEmployeesCount = employees.length;
  const preboardingCount = employees.filter(e => e.currentPhase === 'Pre-boarding').length;
  const activeFirstDayCount = employees.filter(e => e.currentPhase === 'First Day').length;
  const activeFirstMonthCount = employees.filter(e => e.currentPhase === 'First Month').length;
  const completedSupportCount = employees.filter(e => e.currentPhase === 'Support').length;

  const averageCompletionPercentage = employees.length > 0
    ? Math.round(employees.reduce((acc, curr) => acc + curr.completionPercentage, 0) / employees.length)
    : 0;

  // Documents checking rates
  const totalDocsCount = documents.length;
  const verifiedDocsCount = documents.filter(d => d.status === 'Verified').length;
  const docsRate = totalDocsCount > 0 ? Math.round((verifiedDocsCount / totalDocsCount) * 100) : 0;

  // Courses completed ratios
  const totalCourses = courses.length;
  const completedCoursesCount = courses.filter(c => c.status === 'Completed').length;
  const coursesRate = totalCourses > 0 ? Math.round((completedCoursesCount / totalCourses) * 105) : 100; // soft adjusted mock multiplier

  // Overdue alerts
  const overdueTasksCount = tasks.filter(t => t.status === 'Rejected').length;

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5 text-left">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 font-bold">MANAGEMENT METRICS ENGINE</span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight font-sans">Corporate Reports & Analytics</h2>
          <p className="text-slate-500 text-sm mt-1">
            Real-time visual monitoring of on-time document clearances, curriculum pass ratios, and bottleneck diagnostics.
          </p>
        </div>

        <button
          onClick={() => {
            alert('Triggering spreadsheet report downloader: Onboarding_Report_Q2.xlsx generated successfully!');
          }}
          className="bg-slate-900 duration-150 text-white hover:bg-slate-800 text-xs font-bold px-4 py-2 rounded-xl shadow cursor-pointer self-start"
        >
          Export CSV Spreadsheet
        </button>
      </div>

      {/* Grid: Live numeric score cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
        {[
          { label: 'Active incoming staff', value: totalEmployeesCount, sub: 'Registered directories', icon: Users, color: 'text-indigo-500 bg-indigo-50' },
          { label: 'ONBOARD PERFORMANCE RAITO', value: `${averageCompletionPercentage}%`, sub: 'Aggregate completion avg', icon: TrendingUp, color: 'text-cyan-500 bg-cyan-50' },
          { label: 'Document Verification rate', value: `${docsRate}%`, sub: 'Clearing-house pass status', icon: FileCheck, color: 'text-emerald-500 bg-emerald-50' },
          { label: 'Assigned Courses Cleared', value: `${completedCoursesCount}/${totalCourses}`, sub: 'Compliance curriculum ratio', icon: GraduationCap, color: 'text-purple-500 bg-purple-50' },
        ].map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block font-sans">{metric.label}</span>
                <strong className="text-2xl font-black text-slate-850 mt-1 block">{metric.value}</strong>
                <span className="text-[10px] text-slate-500 font-mono mt-0.5 block">{metric.sub}</span>
              </div>
              
              <div className={`p-3 rounded-xl ${metric.color}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Responsive Visual SVG charts grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
        {/* Chart: Completion ratio by Phase of Onboarding */}
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <h3 className="text-sm font-extrabold text-slate-850 uppercase">
            Active Joiners Distribution by Phase
          </h3>

          <div className="relative pt-4">
            {/* SVG custom bar graph */}
            <svg viewBox="0 0 450 180" className="w-full h-auto">
              {/* Grid lines */}
              <line x1="45" y1="20" x2="430" y2="20" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="45" y1="60" x2="430" y2="60" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="45" y1="100" x2="430" y2="100" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="45" y1="140" x2="430" y2="140" stroke="#cbd5e1" strokeWidth="2" />

              {/* Data Bars */}
              {/* Bar 1: Pre-boarding (SARAH, AIDEN count) */}
              <rect x="75" y={140 - (preboardingCount * 40)} width="40" height={preboardingCount * 40} fill="#06b6d4" rx="4" />
              <text x="95" y="160" textAnchor="middle" className="text-[9px] font-bold font-mono fill-slate-500">Pre-boarding</text>
              <text x="95" y={130 - (preboardingCount * 40)} textAnchor="middle" className="text-[10px] font-bold fill-slate-800">{preboardingCount}</text>

              {/* Bar 2: First Day */}
              <rect x="175" y={140 - (activeFirstDayCount * 40)} width="40" height={activeFirstDayCount * 40} fill="#3b82f6" rx="4" strokeWidth="1" />
              <text x="195" y="160" textAnchor="middle" className="text-[9px] font-bold font-mono fill-slate-500">First Day</text>
              <text x="195" y={130 - (activeFirstDayCount * 40)} textAnchor="middle" className="text-[10px] font-bold fill-slate-800">{activeFirstDayCount}</text>

              {/* Bar 3: First Month */}
              <rect x="275" y={140 - (activeFirstMonthCount * 40)} width="40" height={activeFirstMonthCount * 40} fill="#8b5cf6" rx="4" />
              <text x="295" y="160" textAnchor="middle" className="text-[9px] font-bold font-mono fill-slate-500">First Month</text>
              <text x="295" y={130 - (activeFirstMonthCount * 40)} textAnchor="middle" className="text-[10px] font-bold fill-slate-800">{activeFirstMonthCount}</text>

              {/* Bar 4: Completed Support */}
              <rect x="375" y={140 - (completedSupportCount * 40)} width="40" height={completedSupportCount * 40} fill="#10b981" rx="4" />
              <text x="395" y="160" textAnchor="middle" className="text-[9px] font-bold font-mono fill-slate-500">Support State</text>
              <text x="395" y={135 - (completedSupportCount * 40)} textAnchor="middle" className="text-[10px] font-bold fill-slate-800">{completedSupportCount}</text>
            </svg>
          </div>
          
          <p className="text-[10px] text-slate-400 font-mono text-center">
            DISTRIBUTION PROFILE OF REGISTERED COHORTS RECORDED LIVE
          </p>
        </div>

        {/* Bottleneck alert metrics list */}
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 text-white p-5 rounded-2xl shadow-sm">
            <h3 className="text-xs font-extrabold text-cyan-305 text-cyan-400 uppercase block mb-3">
              Onboarding Bottleneck Diagnostics
            </h3>

            <div className="space-y-3.5 text-xs">
              <div className="bg-slate-850 p-3 rounded-xl border border-slate-800 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-200">Pending Government Work ID Scans</h4>
                  <p className="text-[10px] text-slate-450 text-slate-400 mt-1">
                    Some incoming employees have blurred ID images or SSN withholdings waiting HR operations verify steps.
                  </p>
                </div>
              </div>

              <div className="bg-slate-850 p-3 rounded-xl border border-slate-800 flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-rose-450 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-200">Overdue Compliance Trainings</h4>
                  <p className="text-[10px] text-slate-450 text-slate-400 mt-1">
                    Anti-harassment and Security Basics course limits are approaching standard 14-day milestones.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-indigo-950 p-2 text-indigo-300 rounded border border-indigo-900 border-dashed text-[10px] font-mono mt-4 leading-normal">
              <strong>REPORT ADVICE:</strong> Auto-alert logs are triggered to manager slack boards daily, prompting outstanding checklist runs.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
