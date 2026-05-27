import React from 'react';
import { useOnboarding } from '../store';
import {
  FileCheck,
  Calendar,
  Cpu,
  GraduationCap,
  Smile,
  ArrowRight,
  TrendingUp,
  MapPin,
  Clock,
  Heart,
  Gift,
  Tv
} from 'lucide-react';

interface WelcomeDashboardProps {
  onNavigate: (module: string) => void;
}

export const WelcomeDashboard: React.FC<WelcomeDashboardProps> = ({ onNavigate }) => {
  const { employees, activeEmployeeId, tasks, documents, courses } = useOnboarding();
  const emp = employees.find(e => e.id === activeEmployeeId) || employees[0];

  // Derive dynamic dashboard stats
  const totalTasks = tasks.filter(t => t.employeeId === emp.id).length;
  const completedTasks = tasks.filter(t => t.employeeId === emp.id && t.status === 'Completed').length;
  
  const empDocs = documents.filter(d => d.employeeId === emp.id);
  const totalDocs = empDocs.length;
  const verifiedDocs = empDocs.filter(d => d.status === 'Verified').length;

  const empCourses = courses.filter(c => c.employeeId === emp.id);
  const totalCourses = empCourses.length;
  const completedCourses = empCourses.filter(c => c.status === 'Completed').length;

  // Next logical step detection
  let recommendationText = 'Complete Pre-boarding Forms';
  let recommendationModule = 'preboarding';
  let recommendationBadge = 'Phase 1 Action Required';

  if (emp.currentPhase === 'Pre-boarding' && verifiedDocs < totalDocs) {
    recommendationText = 'Upload Mandatory ID Verification Files';
    recommendationModule = 'documents';
    recommendationBadge = 'Document Upload Pending';
  } else if (emp.currentPhase === 'First Day') {
    recommendationText = 'Check Day 1 Induction Timeslots';
    recommendationModule = 'schedule';
    recommendationBadge = 'Schedule Live';
  } else if (emp.currentPhase === 'First Month') {
    recommendationText = 'Start Compliance Certification Courses';
    recommendationModule = 'training';
    recommendationBadge = 'Assigned Learning';
  } else if (emp.currentPhase === 'Support') {
    recommendationText = 'Provide Feedback & Complete Exit Check';
    recommendationModule = 'feedback';
    recommendationBadge = 'Milestone Survey';
  }

  return (
    <div className="space-y-6">
      {/* Simple, Elegant Welcome Banner */}
      <div className="bg-slate-900 text-white p-6 md:p-8 rounded-xl text-left relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <span className="text-[10px] text-teal-400 font-mono font-bold uppercase tracking-widest block">
              COHORT WELCOME
            </span>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              Welcome to the Team, {emp.name}!
            </h2>
            <p className="text-slate-300 text-sm max-w-xl leading-relaxed">
              We are excited to build the future of software together. Your dedicated onboarding portal is ready to guide you step-by-step from pre-boarding preparation to your first milestone.
            </p>
            <div className="flex flex-wrap gap-4 pt-1 text-xs font-mono text-slate-400">
              <span className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-1" /> {emp.location}</span>
              <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1" /> Report Time: {emp.reportingTime}</span>
            </div>
          </div>

          <div className="bg-slate-800/60 p-4 rounded-lg border border-slate-700/50 w-full md:w-auto text-center shrink-0 min-w-[140px]">
            <span className="text-2xl font-bold block font-mono text-white">{emp.completionPercentage}%</span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mt-1">Onboard Level</span>
          </div>
        </div>
      </div>

      {/* Recommended Next Action Banner */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-teal-100 text-teal-800 rounded-lg">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-mono font-bold text-slate-500 tracking-wider">
              {recommendationBadge}
            </span>
            <h4 className="text-sm font-semibold text-slate-800">{recommendationText}</h4>
          </div>
        </div>
        <button
          onClick={() => onNavigate(recommendationModule)}
          className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-lg transition duration-150 flex items-center justify-center space-x-1 cursor-pointer"
        >
          <span>Continue</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Grid of Onboarding Phase status summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-left">
        {[
          { label: '1. Pre-boarding', sub: 'Information & Legal', status: emp.completionPercentage >= 40 ? 'Completed' : 'Active' },
          { label: '2. First Day', sub: 'Hardware & Team Intro', status: emp.currentPhase === 'Pre-boarding' ? 'Upcoming' : emp.currentPhase === 'First Day' ? 'Active' : 'Completed' },
          { label: '3. First Month', sub: 'Certifications & Goals', status: (emp.currentPhase === 'Pre-boarding' || emp.currentPhase === 'First Day') ? 'Upcoming' : emp.currentPhase === 'First Month' ? 'Active' : 'Completed' },
          { label: '4. Support', sub: 'Buddy & Feedback Checks', status: emp.currentPhase === 'Support' ? 'Active' : 'Upcoming' },
        ].map((ph, idx) => (
          <div key={idx} className="p-4 bg-white border border-slate-200 rounded-xl flex flex-col justify-between h-24 shadow-sm">
            <div>
              <span className="text-xs font-bold text-slate-900 block">{ph.label}</span>
              <span className="text-[11px] text-slate-500 block mt-0.5">{ph.sub}</span>
            </div>
            <div className="flex justify-between items-center text-[10px] mt-1 pt-1.5 border-t border-slate-100">
              <span className="text-slate-400 font-mono">STATUS</span>
              <span className={`font-semibold ${
                ph.status === 'Completed' ? 'text-emerald-600' :
                ph.status === 'Active' ? 'text-teal-600 font-bold' : 'text-slate-400'
              }`}>{ph.status}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Core Onboarding Journey Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Core Quick Buttons Panel */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 text-left">
          <h3 className="text-xs font-bold text-slate-400 tracking-wider uppercase">Quick Links</h3>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'preboarding', label: 'Personal Info', icon: Smile },
              { id: 'documents', label: 'Tax & ID Docs', icon: FileCheck },
              { id: 'schedule', label: 'View Agenda', icon: Calendar },
              { id: 'itsetup', label: 'IT Allocations', icon: Cpu },
              { id: 'training', label: 'Start Courses', icon: GraduationCap },
              { id: 'feedback', label: 'Help Desk', icon: Heart },
            ].map((qa, idx) => {
              const Icon = qa.icon;
              return (
                <button
                  key={idx}
                  onClick={() => onNavigate(qa.id)}
                  className="flex items-center space-x-2 p-2.5 rounded-lg border border-slate-100 hover:border-slate-300 hover:bg-slate-50 transition-all text-left cursor-pointer"
                >
                  <Icon className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="text-xs font-medium text-slate-700 truncate">{qa.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Announcements & Welcome Package */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 lg:col-span-2 text-left">
          <h3 className="text-xs font-bold text-slate-400 tracking-wider uppercase">Welcome Announcements</h3>
          
          <div className="space-y-4 divide-y divide-slate-100">
            {/* CEO message */}
            <div className="flex items-start gap-3 pt-1">
              <div className="p-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-500 shrink-0">
                <Tv className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-mono uppercase font-semibold">Message from the CEO</span>
                <h4 className="text-xs font-bold text-slate-800">Video Orientation: Focus & Empathy</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  "Our mission is to foster a workspace built on trust, continuous growth, and professional enablement. Welcome to our journey." — CEO
                </p>
              </div>
            </div>

            {/* Welcome Kit delivery tracker */}
            <div className="flex items-start gap-3 pt-3">
              <div className="p-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-500 shrink-0">
                <Gift className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-mono uppercase font-semibold">Swag Pack Dispatch</span>
                <h4 className="text-xs font-bold text-slate-800">Your Welcome Gear has Shipped!</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Sent via FedEx to your primary address (includes corporate hoodie, reusable flask, tech accessories, and stickers).
                </p>
                <span className="text-[9px] bg-slate-100 border border-slate-200/60 text-slate-600 font-semibold px-1.5 py-0.5 rounded font-mono mt-1.5 inline-block">
                  Shipment Tracking: ENT-SWG-9281
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline view of onboarding stages */}
      <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl text-left">
        <h3 className="text-xs font-bold text-slate-400 tracking-wider uppercase mb-5">Your Milestones</h3>
        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-4 md:px-6">
          <div className="absolute left-4 md:left-0 md:right-0 top-0 bottom-0 md:top-6 md:bottom-auto h-full md:h-1 bg-slate-200 -z-10" />
          
          {[
            { phaseName: 'Pre-boarding', text: 'Document clearances & payroll configuration', date: 'Done', done: emp.completionPercentage >= 40 },
            { phaseName: 'First Day', text: 'Credentials active & buddy sync', date: 'Immediate', done: emp.completionPercentage >= 60 },
            { phaseName: 'First Month', text: 'Assessment deliverables & compliance passing', date: 'Month 1', done: emp.completionPercentage >= 95 },
            { phaseName: 'Support', text: 'Certificate of completion & feedback survey', date: 'Ongoing', done: emp.completionPercentage === 100 }
          ].map((milestone, i) => (
            <div key={i} className="flex md:flex-col items-start text-left md:items-center md:text-center space-x-3.5 md:space-x-0 md:space-y-3 md:w-44">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ring-4 ring-white ${
                milestone.done ? 'bg-emerald-500 text-white' : 'bg-slate-300 text-slate-600'
              }`}>
                {i + 1}
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800">{milestone.phaseName}</h4>
                <p className="hidden md:block text-[11px] text-slate-500 mt-0.5 line-clamp-2">{milestone.text}</p>
                <span className="text-[10px] font-mono font-bold text-cyan-600 mt-1 block">{milestone.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
